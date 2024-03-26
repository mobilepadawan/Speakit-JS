const languageSelect = document.getElementById('language-select')
const textInput = document.getElementById('text-input')
const textFilter = document.getElementById('input-filter')
const readButton = document.getElementById('read-button')
const pauseButton = document.getElementById('pause-button')
const cancelButton = document.getElementById('cancel-button')

function returnHTMLdefaultOption() {
    return `<option value="" disabled selected>Pick a language...</option>`
}

function returnHTMLVoiceOption(voice) {
    if (voice) {
        return `<option value="${voice.lang}" data-voice="${voice.name}">
                    (${voice.lang}) - ${voice.name}
                </option>`
    }
}

function loadVoicesInSelect(languageSelect) {
    Speakit.getVoices().then((voices)=> {
        if (voices.length > 0) {
            languageSelect.innerHTML = returnHTMLdefaultOption()
          voices.forEach((voice)=> languageSelect.innerHTML += returnHTMLVoiceOption(voice) )
        }
    })
    .catch((error)=> console.error('Error loading the available voices:', error) )
}


function mainFunction() {
    languageSelect.innerHTML = returnHTMLdefaultOption()
    loadVoicesInSelect(languageSelect)
}

mainFunction()

textFilter.addEventListener("search", async ()=> {
    if (textFilter.value.trim() !== "") {
        document.body.style.cursor = "progress"
        const paramToFilter = textFilter.value.trim()
        const voices = await Speakit.getVoices()
        
        if (voices.length > 0) {
            const result = voices.filter((voice)=> voice.lang.toLowerCase().includes(paramToFilter.toLowerCase()) )
            if (result.length > 0) {
                languageSelect.innerHTML = returnHTMLdefaultOption()
                result.forEach((voice)=> languageSelect.innerHTML += returnHTMLVoiceOption(voice) )
            } 
        }
    } else {
        loadVoicesInSelect(languageSelect)
    }
    document.body.style.cursor = "auto"
})

function readTextWithSelectedLanguage(textInput, languageSelect, voiceName, disableEl) {
    if (languageSelect && textInput) {
        disableEl.setAttribute("disabled", "true")
        Speakit.readText(textInput, languageSelect, voiceName)
        .then(()=> {
            console.log('Text succesfuly readed.')
            disableEl.removeAttribute("disabled")
        })
        .catch((error)=> console.error('Error reading the text:', error) )
    } else {
        console.error('Please, select a language, an accent, and write a text.')
    }
}
 
readButton.addEventListener("click", ()=> {
    readTextWithSelectedLanguage(textInput.value.trim(), 
                                 languageSelect.value, 
                                 languageSelect[languageSelect.selectedIndex].dataset.voice,
                                 readButton)
})

pauseButton.addEventListener("click", ()=> {
    if (pauseButton.textContent === "Pause" && Speakit.isSpeaking()) {
        Speakit.pauseSpeaking()
        pauseButton.textContent = "Resume"
    } else if (pauseButton.textContent === "Resume" && Speakit.isSpeaking()) {
        Speakit.resumeSpeaking()
        pauseButton.textContent = "Pause"
    }
})

cancelButton.addEventListener("click", ()=> Speakit.isSpeaking() && Speakit.stopSpeaking())
