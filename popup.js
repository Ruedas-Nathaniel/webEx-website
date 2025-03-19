document.getElementById("pronouns").addEventListener("change", (e) => {
    const pronouns = e.target.value;
    chrome.storage.sync.set({ pronouns }, () => {
      console.log("Pronouns saved:", pronouns);
    });
  });
  
  document.getElementById("safe-space").addEventListener("change", (e) => {
    const safeSpace = e.target.checked;
    chrome.storage.sync.set({ safeSpace }, () => {
      console.log("Safe Space Mode:", safeSpace ? "Enabled" : "Disabled");
    });
  });
  
  document.getElementById("report").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "report" });
    });
  });
  
  // Load saved settings
  chrome.storage.sync.get(["pronouns", "safeSpace"], (data) => {
    if (data.pronouns) {
      document.getElementById("pronouns").value = data.pronouns;
    }
    if (data.safeSpace) {
      document.getElementById("safe-space").checked = data.safeSpace;
    }
  });