// popup.js - Final Working Version
let currentTabId = null;

// Initialize with better error handling
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadSettings();
    await verifyConnection();
  } catch (err) {
    console.error("Initialization failed:", err);
  }
});

async function loadSettings() {
  try {
    const data = await chrome.storage.sync.get(["pronouns", "safeSpace"]);
    if (data.pronouns) document.getElementById("pronouns").value = data.pronouns;
    if (data.safeSpace) document.getElementById("safe-space").checked = data.safeSpace;
  } catch (err) {
    console.error("Failed to load settings:", err);
  }
}

async function verifyConnection() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  currentTabId = tab.id;
  
  try {
    // First ensure content script is injected
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
    
    // Test the connection
    const response = await chrome.tabs.sendMessage(tab.id, { 
      action: "ping" 
    }, { timeout: 1000 });
    
    console.log("Connection verified:", response);
    return true;
  } catch (err) {
    console.warn("Standard connection failed, using fallback:", err);
    return false;
  }
}

async function executeWithFallback(action, data) {
  try {
    // Try standard message passing first
    const response = await chrome.tabs.sendMessage(currentTabId, {
      action,
      ...data
    }, { timeout: 2000 });
    
    return response;
  } catch (err) {
    console.warn("Message failed, using direct execution:", err);
    
    // Fallback to direct execution
    return await chrome.scripting.executeScript({
      target: { tabId: currentTabId },
      func: (a, d) => {
        if (a === "replacePronouns") {
          // Use the safer text node replacement
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
          );
          
          while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.nodeValue) {
              node.nodeValue = node.nodeValue
                .replace(/\bhe\/him\b/gi, d)
                .replace(/\bshe\/her\b/gi, d);
            }
          }
          return { success: true };
        }
        if (a === "toggleSafeSpace" && d.enabled) {
          const patterns = [/hate\s*speech/gi, /offensive\s*term/gi];
          document.querySelectorAll("p, span, div").forEach(el => {
            patterns.forEach(p => {
              if (p.test(el.textContent)) el.style.display = "none";
            });
          });
          return { success: true };
        }
        return { success: false };
      },
      args: [action, data]
    });
  }
}

// Event handlers with proper async/await
document.getElementById("pronouns").addEventListener("change", async (e) => {
  const pronouns = e.target.value;
  try {
    await chrome.storage.sync.set({ pronouns });
    const result = await executeWithFallback("replacePronouns", { pronouns });
    
    if (!result || !result.success) {
      alert("Couldn't update pronouns on this page. Try a standard website.");
    }
  } catch (err) {
    console.error("Pronoun change failed:", err);
  }
});

document.getElementById("safe-space").addEventListener("change", async (e) => {
  const safeSpace = e.target.checked;
  try {
    await chrome.storage.sync.set({ safeSpace });
    
    if (safeSpace) {
      const result = await executeWithFallback("toggleSafeSpace", { enabled: true });
      if (!result || !result.success) {
        alert("Couldn't enable safe space on this page.");
      }
    }
  } catch (err) {
    console.error("Safe space toggle failed:", err);
  }
});

document.getElementById("report").addEventListener("click", async () => {
  try {
    const result = await executeWithFallback("report", {});
    alert(result?.success ? "Content reported!" : "Reporting failed");
  } catch (err) {
    console.error("Reporting failed:", err);
    alert("Couldn't report content on this page.");
  }
}); 