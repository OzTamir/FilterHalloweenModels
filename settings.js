document.addEventListener("DOMContentLoaded", () => {
  const wordList = document.getElementById("wordList");
  const newWordInput = document.getElementById("newWordInput");
  const addWordButton = document.getElementById("addWord");

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
  ];

  // Load words from chrome.storage
  const loadWords = () => {
    chrome.storage.local.get(["halloweenWords"], function (result) {
      const words = result.halloweenWords || [];
      wordList.innerHTML = "";
      words.forEach(addWordToList);
    });
  };

  // Save words to chrome.storage
  const saveWords = () => {
    const words = Array.from(wordList.children).map((li) =>
      li.querySelector("span").textContent.trim()
    );
    chrome.storage.local.set({ halloweenWords: words }, function () {
      console.log("Halloween words saved");
    });

    // Send message to content script to update wordlist
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "updateWordlist",
        wordlist: words,
      });
    });
  };

  // Add a word to the list
  const addWordToList = (word) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${word}</span>
      <button class="deleteWord">X</button>
    `;
    li.querySelector(".deleteWord").addEventListener("click", () => {
      wordList.removeChild(li);
      saveWords();
    });
    wordList.appendChild(li);
  };

  // Add new word
  const addNewWord = () => {
    const word = newWordInput.value.trim();
    if (word) {
      addWordToList(word);
      newWordInput.value = "";
      saveWords();
    }
  };

  // Function to restore default words
  const restoreDefaultWords = () => {
    chrome.storage.local.set({ halloweenWords: initialWordList }, function () {
      console.log("Default Halloween words restored");
      loadWords();
    });
  };

  loadWords();
  addWordButton.addEventListener("click", addNewWord);
  newWordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addNewWord();
    }
  });

  // Add event listener for the restore default words button
  document
    .getElementById("restoreDefault")
    .addEventListener("click", restoreDefaultWords);
});
