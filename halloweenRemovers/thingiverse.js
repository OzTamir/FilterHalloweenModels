// Function to load Halloween words from chrome.storage
function loadHalloweenWords() {
  chrome.storage.local.get(["halloweenWords"], function (result) {
    if (chrome.runtime.lastError) {
      console.error("Error loading Halloween words:", chrome.runtime.lastError);
      return;
    }

    halloweenWords = result.halloweenWords || [];
    console.log("Loaded Halloween words:", halloweenWords);

    if (halloweenWords.length === 0) {
      console.warn(
        "No Halloween words loaded. Check if words are being saved correctly."
      );
    }

    removeArticles();
  });
}

function removeArticles() {
  // Updated selector to match all classes starting with "ItemCardContainer"
  const articles = document.querySelectorAll("[class^='ItemCardContainer']");
  console.log(`Found ${articles.length} articles`);

  articles.forEach((article, index) => {
    const header = article.querySelector("[class^='ItemCardHeader']");
    if (header) {
      const title = header.getAttribute("title").toLowerCase();

      if (halloweenWords.some((word) => title.includes(word))) {
        console.warn("Removed article:", {
          title: header.getAttribute("title") || "No title",
          link: header.getAttribute("href"),
        });
        article.remove();
      }
    }
  });
}

console.log("Loading Halloween words and running removeArticles on page load");
loadHalloweenWords();

const observer = new MutationObserver(() => {
  console.log("MutationObserver triggered, running removeArticles");
  removeArticles();
});
observer.observe(document.body, { childList: true, subtree: true });

// Listen for messages from the popup to update the word list
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateWordlist") {
    halloweenWords = message.wordlist;
    console.log("Updated Halloween words:", halloweenWords);
    removeArticles();
  }
});
