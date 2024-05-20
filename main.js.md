## Table of Contents

- [Introduction](#introduction)
- [Functionality](#functionality)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Example Usage](#example-usage)
- [Internal Documentation](#internal-documentation)

## Introduction

This document provides internal documentation for the Google Generative AI Chrome extension code. The code implements the functionality of the extension, which allows users to interact with Google's Generative AI models through a chat-based interface.

## Functionality

The code performs the following functions:

- Initializes the extension by checking for an API key and displaying the appropriate界面.
- Establishes a connection to the Generative AI API using the provided API key.
- Starts a chat session with the selected model and provides an initial history.
- Handles user input and generates responses using the chat session.
- Displays the generated responses in the UI.
- Highlights code snippets using hljs.

## Architecture

The code is structured as follows:

- **HTML:** The HTML file defines the user interface, including the setup window, prompt window, and response area.
- **JavaScript:** The JavaScript code handles the logic of the extension, including initialization, API interaction, and UI updates.
- **GoogleGenerativeAI.js:** This file contains the implementation of the GoogleGenerativeAI class, which provides methods for interacting with the Generative AI API.

## Getting Started

Developers working on the extension can use this code as a starting point. Before running the code, ensure you have:

- Installed the necessary dependencies (marked.js and hljs)
- Provided a valid API key in the Chrome storage

## Example Usage

This code can be used to implement various features related to Generative AI interaction. For example, you could:

- Integrate it with other tools or applications
- Extend the functionality with additional models or commands
- Customize the UI and branding

## Internal Documentation

### `startProcess` Function

The `startProcess` function initializes the connection to the Generative AI API and starts a chat session. It takes an API key as an argument and performs the following steps:

1. Creates an instance of the `GoogleGenerativeAI` class.
2. Obtains the generative model using the provided model name.
3. Initializes the chat session with an initial history.

### `getDOM` Function

The `getDOM` function is used to retrieve the inner text of the HTML document body. It takes a selector as an argument and returns the text content.

### `sendMessageStream` Function

The `sendMessageStream` function sends a message to the chat session and returns a stream of chunks representing the generated response. It takes the message text as an argument and handles errors related to invalid API keys.

### `highlightAll` Function

The `highlightAll` function highlights all code snippets in the document using hljs. This helps呈現generated code and improves readability.