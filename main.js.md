## Internal Code Documentation for Google Generative AI Integration

### Table of Contents

- [Overview](#overview)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Initialization](#initialization)
- [Usage](#usage)
  - [Getting DOM](#getting-dom)
  - [Sending Prompts](#sending-prompts)
  - [Receiving Responses](#receiving-responses)

### Overview

This document provides a comprehensive guide to integrating the Google Generative AI with a Chrome extension. It includes instructions for setup, usage, and troubleshooting.

### Setup

#### Prerequisites

- A Google Cloud Platform (GCP) project with the Generative AI API enabled
- An API key for the Generative AI API

#### Initialization

1. Install the Chrome extension from the Chrome Web Store.
2. Open the extension popup and enter your API key in the "Setup Window".
3. Click the "Connect" button.

### Usage

#### Getting DOM

The extension uses the `getDOM` function to get the HTML content of the active tab. This function is called when the user presses the "Connect" button.

```javascript
function getDOM(selector) {
    return document.body.innerText
}
```

#### Sending Prompts

The extension uses the `chat` object to send prompts to the Generative AI model. The `chat` object is created during initialization.

```javascript
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
```

To send a prompt, call the `sendMessageStream` method of the `chat` object.

```javascript
const result = await window.chat.sendMessageStream(`Here you go: ${results[0].result}
                And my first question is: ${input}` )
```

#### Receiving Responses

The extension receives responses from the Generative AI model as a stream of chunks. Each chunk contains a part of the response text.

```javascript
for await (const chunk of result.stream) {
    const chunkText = chunk.text()
    text += chunkText
    document.getElementById('response').innerHTML = marked.parse(text)
    hljs.highlightAll()
}
```

The extension uses the `marked` library to parse the response text into HTML. The `hljs` library is used to highlight code blocks in the response text.