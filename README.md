# Halloween Content Remover Chrome Extension

## Overview

This Chrome extension is designed to remove Halloween-related content from various 3D printing and maker community websites. It filters out articles, posts, and designs that contain Halloween-themed keywords, providing a cleaner browsing experience for users who prefer to avoid such content.

## Features

- Automatically removes Halloween-themed content from supported websites
- Works on multiple platforms including Makerworld, Thingiverse, and Printables
- Uses a customizable list of Halloween-related keywords for filtering
- Dynamically updates the page as new content is loaded
- Provides a settings page to manage the list of filtered words

## Supported Websites

- Makerworld
- Thingiverse
- Printables

## How It Works

The extension uses content scripts that run on the supported websites. These scripts:

1. Load a list of Halloween-related keywords from Chrome storage
2. Target specific elements on the page that contain article or design information
3. Check the titles or URLs of these elements against the keyword list
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
- `settings.html`: HTML file for the extension's settings page
- `settings.js`: JavaScript file for managing the settings page functionality
- `halloweenRemovers/`: Directory containing site-specific content removal scripts
  - `makerworld.js`
  - `thingyverse.js`
  - `printables.js`

## Usage

After installation, the extension will automatically start filtering content on supported websites. To customize the list of filtered words:

1. Click on the extension icon in the Chrome toolbar
2. The settings page will open, showing the current list of filtered words
3. Add new words by typing them into the input field and clicking the "+" button or pressing Enter
4. Remove words by clicking the "X" button next to each word
5. Use the "Restore default words" button to reset the list to the initial set of Halloween-related words

## Contributing

Contributions to improve the extension or add support for more websites are welcome. Please submit a pull request or open an issue to discuss proposed changes.

## Disclaimer

This extension is provided as-is and may affect your browsing experience on supported websites. Use at your own discretion.