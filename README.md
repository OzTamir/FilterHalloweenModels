# Halloween Content Remover Chrome Extension

## Overview

This Chrome extension is designed to remove Halloween-related content from various 3D printing and maker community websites. It filters out articles, posts, and designs that contain Halloween-themed keywords, providing a cleaner browsing experience for users who prefer to avoid such content.

## Features

- Automatically removes Halloween-themed content from supported websites
- Works on multiple platforms including Makerworld, Thingiverse, and Printables
- Uses a comprehensive list of Halloween-related keywords for filtering
- Dynamically updates the page as new content is loaded

## Supported Websites

- Makerworld
- Thingiverse
- Printables

## How It Works

The extension uses content scripts that run on the supported websites. These scripts:

1. Define a list of Halloween-related keywords
2. Target specific elements on the page that contain article or design information
3. Check the titles of these elements against the keyword list
4. Remove matching elements from the page
5. Use a MutationObserver to continually check for new content as it's loaded

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the directory containing the extension files
5. The extension should now be active and working on supported websites

## Files

- `manifest.json`: Extension configuration file
- `background.js`: Background script for the extension
- `removeHalloween.js`: Main content script for removing Halloween content
- `wordlist.js`: List of Halloween-related keywords
- `halloweenRemovers/`: Directory containing site-specific content removal scripts
  - `makerworld.js`
  - `thingyverse.js`
  - `printables.js`

## Contributing

Contributions to improve the extension or add support for more websites are welcome. Please submit a pull request or open an issue to discuss proposed changes.

## License

[Add your chosen license here]

## Disclaimer

This extension is provided as-is and may affect your browsing experience on supported websites. Use at your own discretion.