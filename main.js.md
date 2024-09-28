## Internal Code Documentation - Google Generative AI Chrome Extension

This document provides an internal overview of the Google Generative AI Chrome extension's code.

### Table of Contents

| Section | Description |
|---|---|
| [Initialization](#initialization) | Sets up the extension and handles user API key input. |
| [Chat Functionality](#chat-functionality) | Describes the logic for starting a chat with the Gemini Pro model and sending user prompts. |
| [DOM Interaction](#dom-interaction) | Explains the handling of DOM elements and user input. |
| [Error Handling](#error-handling) | Covers the handling of potential errors, including invalid API keys. |

### Initialization 
The code starts by setting up the environment and handling API key initialization:

* **`isInitialized`:** This variable tracks whether the extension has been initialized with a valid API key.  
* **`chrome.storage.sync.get([\'apiKey\'])`:** This function retrieves the user's API key from Chrome's storage.
* **`if (val.apiKey && val.apiKey.length > 2)`:** Checks if a valid API key is stored.
* **`startProcess(val.apiKey)`:**  Initiates the chat process using the retrieved API key.
* **`document.getElementById(\'setup-window\').style.display = \'none\';`:** Hides the setup window if a valid API key is found.
* **`document.getElementById(\'prompt-window\').style.display = \'block\';`:** Shows the prompt window to allow the user to interact with the AI.

**Connect Button Event Listener**

* **`document.getElementById(\'connect-btn\').addEventListener(\'click\', (ev) => {...})`:**  This listener is triggered when the "Connect" button is clicked.
* **`let key = document.getElementById(\'apiKey\').value`:** Retrieves the user-entered API key from the input field.
* **`if (key && key.length > 2)`:** Checks if the entered key is valid.
* **`chrome.storage.sync.set({ apiKey: key })`:** Saves the user's API key to Chrome's storage.
* **`startProcess(key)`:** Starts the chat process with the newly saved key.
* **`document.getElementById(\'setup-window\').style.display = \'none\';`:**  Hides the setup window. 
* **`document.getElementById(\'prompt-window\').style.display = \'block\';`:**  Shows the prompt window.

### Chat Functionality 

The core chat functionality is encapsulated in the `startProcess` function:

* **`const genAI = new GoogleGenerativeAI(API_KEY)`:** Creates a new instance of the `GoogleGenerativeAI` class using the provided API key. 
* **`const model = genAI.getGenerativeModel({ model: "gemini-pro" })`:**  Gets an instance of the "gemini-pro" model.
* **`window.chat = model.startChat(...)`:** Initializes a chat session with the model, providing an initial history of messages.

### DOM Interaction 

The DOM is manipulated to handle user prompts, display responses, and manage the user interface:

* **`document.querySelector(\'#prompt\').addEventListener(\'keypress\', async(e) => {...})`:**  Listens for the "Enter" key press in the prompt input field.
* **`if (e.key === \'Enter\')`:**  Triggers actions when the "Enter" key is pressed.
* **`let input = document.getElementById(\'prompt\').value`:** Retrieves the user's input from the prompt field.
* **`if (input.length < 5) return`:**  Prevents submission of very short prompts.
* **`document.getElementById(\'prompt\').value = \'\'`:** Clears the prompt field.
* **`document.getElementById(\'response\').innerHTML = `<b><u>${input}</u></b><br /><br />Generating...`:**  Displays the user's input and a "Generating..." message in the response area.

**Retrieving DOM Content:**

* **`chrome.tabs.query({ active: true, currentWindow: true })`:** Retrieves the active tab in the current window.
* **`chrome.scripting.executeScript({ target: { tabId: activeTabId }, injectImmediately: true, func: getDOM, args: [\'body\'] })`:** Executes the `getDOM` function in the active tab to retrieve the content of the `<body>` element.
* **`function getDOM (selector) { return document.body.innerText }`:**  This function gets the inner text of the `<body>` element.

### Error Handling 

The code includes error handling for invalid API keys:

* **`try...catch`:**  A `try...catch` block is used to handle potential errors during the `sendMessageStream` call.
* **`if (e.message.includes(\'API_KEY_INVALID\'))`:**  Checks if the error message indicates an invalid API key.
* **`document.getElementById(\'setup-window\').style.display = \'block\';`:**  Shows the setup window.
* **`document.getElementById(\'prompt-window\').style.display = \'none\';`:**  Hides the prompt window.
* **`alert(\'Your API Key is invalid. Try again with a valid key\')`:**  Displays an alert message to the user.