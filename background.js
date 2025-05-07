// background.js - Enhanced Version
const AWARENESS_DAYS = [
  { date: "06-01", event: "Pride Month" },
  { date: "03-31", event: "Transgender Day of Visibility" },
  { date: "10-11", event: "National Coming Out Day" }
];

// Installation
chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    showWelcomeNotification();
    initDefaultSettings();
  }
  checkAwarenessDays();
});

// Daily check for awareness days
function checkAwarenessDays() {
  const today = new Date();
  const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const event = AWARENESS_DAYS.find(day => day.date === dateStr);
  if (event) {
    showAwarenessNotification(event);
  }
}

function showAwarenessNotification(event) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'LGBTQ+ Awareness',
    message: `Today is ${event.event}! Click to learn more.`,
    buttons: [{ title: 'Learn More' }]
  });
}

// Notification interaction
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (buttonIndex === 0) {
    chrome.tabs.create({ url: 'https://www.glaad.org/calendar' });
  }
});

// Default settings
function initDefaultSettings() {
  chrome.storage.sync.set({
    pronouns: 'They/Them',
    safeSpace: true,
    lastUpdated: Date.now()
  });
}