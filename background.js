chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (tab.url.includes("printables.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["halloweenRemovers/printables.js"],
      });
    } else if (tab.url.includes("thingiverse.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["halloweenRemovers/thingyverse.js"],
      });
    } else if (tab.url.includes("makerworld.com")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["halloweenRemovers/makerworld.js"],
      });
    }
  }
});
