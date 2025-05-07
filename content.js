// content.js - Final Working Version
console.log("Gender Forum content script initialized");

const config = {
  debugMode: true,  // Set to false for production
  throttleDelay: 200
};

class GenderInclusiveProcessor {
  constructor() {
    this.observer = null;
    this.currentPronouns = null;
    this.isProcessing = false;
  }

  async init() {
    try {
      await this.loadSettings();
      this.setupMutationObserver();
      this.log('Content script initialized');
      this.processPage(); // Initial processing
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  async loadSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['pronouns', 'safeSpace'], (data) => {
        this.currentPronouns = data.pronouns;
        if (data.safeSpace) this.filterContent();
        resolve();
      });
    });
  }

  processPage(root = document.body) {
    if (!this.currentPronouns || this.isProcessing) return;
    this.isProcessing = true;

    try {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      while (walker.nextNode()) {
        this.processTextNode(walker.currentNode);
      }
    } finally {
      this.isProcessing = false;
    }
  }

  processTextNode(node) {
    if (!node.nodeValue || !this.currentPronouns) return;
    
    try {
      node.nodeValue = node.nodeValue
        .replace(/\bhe\/him\b/gi, this.currentPronouns)
        .replace(/\bshe\/her\b/gi, this.currentPronouns);
    } catch (e) {
      this.log(`Error processing node: ${e.message}`);
    }
  }

  filterContent() {
    const harmfulPatterns = [
      /hate\s*speech/gi,
      /offensive\s*term/gi,
      /slur|bigot|phobic/gi
    ];

    document.querySelectorAll("p, span, div, article, section").forEach(el => {
      harmfulPatterns.forEach(pattern => {
        if (pattern.test(el.textContent)) {
          el.style.display = "none";
        }
      });
    });
  }

  setupMutationObserver() {
    if (this.observer) this.observer.disconnect();

    this.observer = new MutationObserver(mutations => {
      if (this.isProcessing) return;
      
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.processPage(node);
          }
        });
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  log(message) {
    if (config.debugMode) {
      console.log(`[GenderInclusive] ${message}`);
    }
  }
}

// Safe initialization
document.addEventListener('DOMContentLoaded', () => {
  const processor = new GenderInclusiveProcessor();
  processor.init();
});

// Message handling with fallback
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!window.genderProcessor) {
    window.genderProcessor = new GenderInclusiveProcessor();
    window.genderProcessor.init();
  }

  try {
    switch (request.action) {
      case 'replacePronouns':
        window.genderProcessor.currentPronouns = request.pronouns;
        window.genderProcessor.processPage();
        sendResponse({success: true});
        break;
      case 'toggleSafeSpace':
        if (request.enabled) window.genderProcessor.filterContent();
        sendResponse({success: true});
        break;
      default:
        sendResponse({success: false, error: 'Unknown action'});
    }
  } catch (e) {
    sendResponse({success: false, error: e.message});
  }
  
  return true; // Keep message channel open for async response
});