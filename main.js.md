## Internal Code Documentation

### Table of Contents

- [1. Introduction](#1-introduction)
- [2. Setup and Configuration](#2-setup-and-configuration)
    - [2.1. Retrieving API Key from Storage](#21-retrieving-api-key-from-storage)
    - [2.2. Connecting with API Key](#22-connecting-with-api-key)
- [3. Starting the Generative AI Process](#3-starting-the-generative-ai-process)
    - [3.1. Initializing the Chat](#31-initializing-the-chat)
- [4. User Input and Response Handling](#4-user-input-and-response-handling)
    - [4.1. Handling Enter Key Press](#41-handling-enter-key-press)
    - [4.2. Fetching Documentation from Active Tab](#42-fetching-documentation-from-active-tab)
    - [4.3. Sending Messages to the Chat](#43-sending-messages-to-the-chat)
    - [4.4. Displaying Responses](#44-displaying-responses)
- [5. Helper Functions](#5-helper-functions)
    - [5.1. getDOM()](#51-getdom)

### 1. Introduction 

This code implements a Chrome extension that interacts with Google's Generative AI API to provide a chat-based question-answering experience. It allows users to ask questions based on the content of the currently active web page.

### 2. Setup and Configuration 

#### 2.1. Retrieving API Key from Storage

The code first attempts to retrieve the user's Google Generative AI API key from Chrome's storage (`chrome.storage.sync.get`). If a valid API key is found (at least 3 characters long), the `startProcess` function is called.

```javascript
chrome.storage.sync.get(['apiKey']).then(val => {
    if (val.apiKey && val.apiKey.length > 2) {
        startProcess(val.apiKey)
        // ...
    } 
})
```

#### 2.2. Connecting with API Key

If no valid API key is found, the user is presented with a setup window to enter their API key. 

```javascript
document.getElementById('connect-btn').addEventListener('click', (ev) => {
    let key = document.getElementById('apiKey').value
    if (key && key.length > 2) {
        chrome.storage.sync.set({ apiKey: key })
        .then(() => {
            startProcess(key)
            // ...
        })
    }
    
})
```

### 3. Starting the Generative AI Process

#### 3.1. Initializing the Chat

The `startProcess` function initializes the Google Generative AI client and starts a new chat session with a predefined initial conversation history.

```javascript
function startProcess(API_KEY) {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    window.chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "You are a helper bot that reads documentations and answers questions or explains steps based on that. Be technical and provide to-the-point answers. I will be providing you the html page of the documentation as the knowledge source. Using this answer me further queries." }],
            },
            {
                role: "model",
                parts: [{ text: "Okay! Share me the documentation and I will help you" }],
            },
        ]
    })
}
```

### 4. User Input and Response Handling

#### 4.1. Handling Enter Key Press

The code listens for the Enter key press in the input prompt field. When detected, it validates the input length and displays a "Generating..." message. 

```javascript
document.querySelector('#prompt').addEventListener('keypress', async(e) => {
    if (e.key === 'Enter') {
        let input = document.getElementById('prompt').value
        if (input.length < 5) return
        document.getElementById('prompt').value = ''
        document.getElementById('response').innerHTML = `<b><u>${input}</u></b><br /><br />Generating...`
        // ...
    }
})
```

#### 4.2. Fetching Documentation from Active Tab

If this is the first question in the chat session, the code fetches the HTML content of the active web page using `chrome.scripting.executeScript`. The `getDOM` function retrieves the inner text of the page body.

```javascript
chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    // ...
    return chrome.scripting.executeScript({
        target: { tabId: activeTabId },
        injectImmediately: true, 
        func: getDOM,
        args: ['body']
    })
})
```

#### 4.3. Sending Messages to the Chat

The code sends the user's input to the chat using `window.chat.sendMessageStream`. If it is the first question, the message includes both the HTML content and the user's question.

```javascript
try {
    const result = await window.chat.sendMessageStream(`Here you go: ${results[0].result}
                    And my first question is: ${input}` )
    // ...
} catch(e) {
    // ...
}
```

#### 4.4. Displaying Responses

The code iterates through the stream of response chunks returned by the API. Each chunk's text is added to the response area, and the content is parsed using `marked` and highlighted using `hljs`.

```javascript
let text = document.getElementById('response').innerHTML.replace('Generating...', '')
for await (const chunk of result.stream) {
    const chunkText = chunk.text()
    text += chunkText
    document.getElementById('response').innerHTML = marked.parse(text)
    hljs.highlightAll()
}
```

### 5. Helper Functions

#### 5.1. getDOM()

This function retrieves the inner text of the page body.

```javascript
function getDOM (selector) {
    return document.body.innerText
}
```
