chrome.runtime.onInstalled.addListener(() => {
    console.log("Gender-Based Discussion Extension Installed");
  });
  
  // Example: Notify user about LGBTQ+ awareness days
  const awarenessDays = [
    { date: "2023-06-01", event: "Pride Month" },
    { date: "2023-03-31", event: "Transgender Day of Visibility" }
  ];
  
  const today = new Date().toISOString().split("T")[0];
  const event = awarenessDays.find((day) => day.date === today);
  
  if (event) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "LGBTQ+ Awareness Day",
      message: `Today is ${event.event}!`
    });
  }