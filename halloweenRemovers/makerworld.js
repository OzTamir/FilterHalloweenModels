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
  // Target the specific article containers
  const articles = document.querySelectorAll(".js-design-card");
  console.log(`Found ${articles.length} articles`);

  articles.forEach((article, index) => {
    const header = article.querySelector("h3.translated-text a");
    if (header) {
      const title = header.textContent.toLowerCase();

      if (halloweenWords.some((word) => title.includes(word))) {
        console.warn("Removed article:", {
          title: header.textContent || "No title",
          link: header.getAttribute("href"),
        });
        // Remove the parent of .js-design-card (which should be .portal-css-0)
        const parentContainer = article.closest(".portal-css-0");
        if (parentContainer) {
          parentContainer.remove();
        } else {
          article.remove(); // Fallback if parent is not found
        }
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
