// Function to replace pronouns
function replacePronouns(pronouns) {
    const bodyText = document.body.innerHTML;
  
    // Replace gendered pronouns with the selected pronouns
    const updatedText = bodyText
      .replace(/\bhe\/him\b/gi, pronouns)
      .replace(/\bshe\/her\b/gi, pronouns);
  
    // Update the page content
    document.body.innerHTML = updatedText;
  }
  
  // Listen for messages from the popup or background script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "replacePronouns") {
      replacePronouns(request.pronouns);
    }
  });
  
  // Load saved pronouns when the page loads
  chrome.storage.sync.get("pronouns", (data) => {
    if (data.pronouns) {
      replacePronouns(data.pronouns);
    }
  });