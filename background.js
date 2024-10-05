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

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    initializeDefaultWords();
  }
});

// Function to initialize default words
const initializeDefaultWords = () => {
  const initialWordList = [
    "halloween",
    "pumpkin",
    "ghost",
    "witch",
    "vampire",
    "zombie",
    "skeleton",
    "bat",
    "spider",
    "candy",
    "death",
    "grave",
    "haunted",
    "horror",
    "spooky",
    "trick",
    "treat",
    "candy",
    "death",
    "spooky",
  ];

  chrome.storage.local.set(
    {
      halloweenWords: initialWordList,
      firstTimeRun: true,
    },
    function () {
      console.log("Default Halloween words initialized");
    }
  );
};
