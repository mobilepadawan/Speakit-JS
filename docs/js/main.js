const emojiSun = document.querySelector('div.emoji.sun')
const emojiMoon = document.querySelector('div.emoji.moon')

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