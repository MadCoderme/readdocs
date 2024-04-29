import { GoogleGenerativeAI } from "./scripts/google-generative-ai.js"
 
let isInitialized = false

chrome.storage.sync.get(['apiKey']).then(val => {
    if (val.apiKey && val.apiKey.length > 2) {
        startProcess(val.apiKey)
        document.getElementById('setup-window').style.display = 'none'
        document.getElementById('prompt-window').style.display = 'block'
        document.getElementById('prompt').value = ''
        document.getElementById('response').innerHTML = ''
    } 
})

document.getElementById('connect-btn').addEventListener('click', (ev) => {
    let key = document.getElementById('apiKey').value
    if (key && key.length > 2) {
        chrome.storage.sync.set({ apiKey: key })
        .then(() => {
            startProcess(key)
            document.getElementById('setup-window').style.display = 'none'
            document.getElementById('prompt-window').style.display = 'block'
            document.getElementById('prompt').value = ''
            document.getElementById('response').innerHTML = ''
        })
    }
    
})

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

function getDOM (selector) {
    return document.body.innerText
}


document.querySelector('#prompt').addEventListener('keypress', async(e) => {
    if (e.key === 'Enter') {

        let input = document.getElementById('prompt').value

        if (input.length < 5) return

        document.getElementById('prompt').value = ''
        document.getElementById('response').innerHTML = `<b><u>${input}</u></b><br /><br />Generating...`

        if (!isInitialized) {
            chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                var activeTab = tabs[0]
                var activeTabId = activeTab.id
        
                return chrome.scripting.executeScript({
                    target: { tabId: activeTabId },
                    injectImmediately: true, 
                    func: getDOM,
                    args: ['body']
                })
            }).then(async (results) => {
                try {
                    const result = await window.chat.sendMessageStream(`Here you go: ${results[0].result}
                    And my first question is: ${input}` )

                    let text = document.getElementById('response').innerHTML.replace('Generating...', '')
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text()
                        text += chunkText
                        document.getElementById('response').innerHTML = marked.parse(text)
                        hljs.highlightAll()
                    }
                } catch(e) {
                    if (e.message.includes('API_KEY_INVALID')) {
                        document.getElementById('setup-window').style.display = 'block'
                        document.getElementById('prompt-window').style.display = 'none'
                        alert('Your API Key is invalid. Try again with a valid key')
                    }
                }


            })
        }
        else
        {
            const result = await window.chat.sendMessageStream(`My next question is: ${input}` )
            
            let text = document.getElementById('response').innerHTML.replace('Generating...', '')
            for await (const chunk of result.stream) {
                const chunkText = chunk.text()
                text += chunkText
                document.getElementById('response').innerHTML = marked.parse(text)
                hljs.highlightAll()
            }
        }
    }
})