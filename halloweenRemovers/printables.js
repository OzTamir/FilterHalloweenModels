let halloweenWords = [];

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
  // Updated selector to match the correct class name
  const articles = document.querySelectorAll("article.card.svelte-j1lj8e");
  console.log(`Found ${articles.length} articles`);

  articles.forEach((article, index) => {
    const link = article.querySelector("a[href^='/model/']");
    if (link) {
      const href = link.getAttribute("href").toLowerCase();

      if (halloweenWords.some((word) => href.includes(word))) {
        console.warn("Removed article:", {
          title: article.querySelector("h2")?.textContent || "No title",
          link: href,
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
