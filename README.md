# ReadDocs

ReadDocs is a browser extension which reads the code documentations for you, so you can find necessary information faster and get code snippets instantly.

I am building this in public at https://twitter.com/abrarfairuj

## Features

ReadDocs is pretty straightforward. It's a simple interface which you can pull up from top and ask any question immediately about the currently opened documentation page.

![unnamed](https://github.com/MadCoderme/readdocs/assets/63955762/3a24185b-6cbe-42e8-a9ba-d0e987e46dc8)


## Installation

You can download the published version from Chrome web store: https://chromewebstore.google.com/detail/read-docs/bohbadhodpeobkhnfcldoiofdgmfilej

To try from the repository, go through the following steps:

1. **Clone the repository:** ``git clone https://github.com/madcoderme/readdocs.git``
﻿
2. **Navigate to Chrome Extensions:** Open Chrome and go to `chrome://extensions`.
3. **Enable Developer Mode:** Toggle the switch in the top right corner. 
4. **Load unpacked extension:** Click on "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. **Obtain an API Key:** You'll need a valid API key for Google Generative AI. You can obtain one by following the instructions [here](https://ai.google.dev/gemini-api/docs/api-key).
2. **Enter API Key:** Once installed, the extension will prompt you to enter your API key. 
3. **Provide Documentation:** Navigate to the documentation page you want to use.
4. **Start Chatting:**  Ask your questions in the prompt window and receive answers from the AI model. 


## Technical Details

* The extension uses the `google-generative-ai.js` script to interact with the Generative AI API.
* The `gemini-pro` model is used for its ability to understand and respond to technical documentation. 
* The `marked` and `highlight.js` libraries are used for formatting and syntax highlighting of the responses.

## Contributing 

Contributions are welcome! Please feel free to submit pull requests for bug fixes, improvements, or new features.

## Ditch Docs

ReadDocs is a free tool beside [SupaCodes](https://supacodes.com). Supacodes can automatically generate & update internal code documentations right in Github. If you are working in teams, ditch the docs hassle with Supacodes and ReadDocs. ReadDocs uses Supacodes to document its source files. 
