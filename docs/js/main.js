const emojiSun = document.querySelector('div.emoji.sun')
const emojiMoon = document.querySelector('div.emoji.moon')
const buttonRead = document.querySelector("#buttonRead")
const inputText = document.querySelector("#inputText")
const selectedLanguage = document.querySelector("#selectedLanguage")

const applyThemePicked = ()=> localStorage.getItem('themePicked') || 'auto'

// Main function
document.documentElement.style.setProperty('color-scheme', applyThemePicked())


emojiSun.addEventListener('click', ()=> {
    document.documentElement.style.setProperty('color-scheme', 'Light')
    localStorage.setItem('themePicked', 'Light')
})
emojiMoon.addEventListener('click', ()=> {
    document.documentElement.style.setProperty('color-scheme', 'Dark')
    localStorage.setItem('themePicked', 'Dark')
})

buttonRead.addEventListener("click", ()=> {
    let textToRead = inputText.value.trim()
    textToRead && Speakit.readText(textToRead, selectedLanguage.value)
})