import { Dialog2 } from './dialogJS2.0.min.js';
import { Speakit } from './Speakit.1.1.0.min.js';

const isoFilterInput = document.getElementById("iso-filter");
const voiceSelect = document.getElementById("voice-select");
const textInput = document.getElementById("text-input");
const btnSpeak = document.getElementById("btn-speak");
const buttonCopyCodeHead = document.querySelector('button.copy-btn#code-head');
const buttonCopyCode2Param = document.querySelector('button.copy-btn#code-2param');
const buttonCopyCode3Param = document.querySelector('button.copy-btn#code-3param');

// Manejo global para copiar los bloques de código al portapapeles
async function copyCode(elementId) {
    const textToCopy = document.querySelector(`code#${elementId}`).innerText;
    navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
        Dialog2.Toast("Code copied to clipboard successfully!",
            "SUCCESS",
            3000,
            "top-center"
        );
    })
    .catch(err => {
        console.error("Error al intentar copiar el código:", err);
        Dialog2.Toast("Error trying to copy the code to clipboard!",
            "ERROR",
            3000,
            "top-center"
        );
    });
}

function analyzeBrowser() {
    let browser = ''
    if (!navigator.userAgentData) {
        if (navigator.userAgent.includes('Firefox/')) {
            browser = 'Mozilla Firefox';
        } else if (navigator.userAgent.includes('Safari/') && navigator.userAgent.includes('AppleWebKit/')) {
            browser = 'Apple Safari';
        } else {
            browser = 'Unidentified browser';
        }
        return browser;
    }

    if (navigator.userAgentData.brands[0].brand === 'Microsoft Edge') {
        browser = 'Microsoft Edge';
    } else if (navigator.userAgentData.brands[2].brand === 'Google Chrome') {
        browser = 'Google Chrome';
    } else {
        browser = 'Unidentified browser';
    }
    return browser || 'N/A';
}
// console.log(analyzeBrowser())

// Función interna para poblar el selector de voces del sistema
async function loadVoicesDropdown() {
    Speakit.languageFilter = isoFilterInput.value.trim();
    const matchingVoices = await Speakit.getVoices();
    voiceSelect.innerHTML = '<option value="">-- Select a voice engine --</option>';
    if (Speakit.totalVoices.length === 0) {
        const opt = document.createElement("option");
        opt.text = "We can't find voices for the typed language filter.";
        opt.disabled = true;
        voiceSelect.add(opt);
        return;
    }

    Speakit.totalVoices.forEach((voice)=> {
        const option = document.createElement("option");
        option.value = voice.name;
        option.text = `${voice.name}`;
        voiceSelect.add(option);
    });
}

// EVENTS
btnSpeak.addEventListener("click", () => {
    const text = textInput.value.trim();
    const selectedVoiceName = voiceSelect.value;
    const targetLanguage = isoFilterInput.value.trim() || "es-AR";

    if (!text) {
        Dialog2.Toast(
            "Por favor, escribe algún texto en la caja antes de reproducir.",
            "WARNING",
            3000,
            "top-center"
        );
        return;
    }

    // Bloqueamos el botón temporalmente durante la reproducción
    btnSpeak.disabled = true;
    btnSpeak.innerText = "⏳ Playing audio...";

    Speakit.utteranceVolume = 0.9;
    Speakit.utteranceRate = 0.9;
    Speakit.readText(text,
        targetLanguage,
        selectedVoiceName
    )
        .then(() => {
            Dialog2.Toast(
                "The text was successfully reproduced.",
                "INFO",
                3000,
                "top-center"
            );
        })
        .catch(err => {
            Dialog2.Toast(
                "Error reproducing speech synthesis.",
                "ERROR",
                3000,
                "top-center"
            );
        })
        .finally(() => {
            // Restauramos el estado del botón al terminar
            btnSpeak.disabled = false;
            btnSpeak.innerText = "🔊 Synthesize Speech";
        });
});

buttonCopyCodeHead.addEventListener('click', () => copyCode('code-head'));
buttonCopyCode2Param.addEventListener('click', () => copyCode('code-2param'));
buttonCopyCode3Param.addEventListener('click', () => copyCode('code-3param'));

isoFilterInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') { //  && textInput.value.trim() !== ''
        const regexISO = /^[a-z]{2}-[A-Z]{2}$/;
        const textToEvaluate = isoFilterInput.value.trim()
        const borderColorValue = isoFilterInput.style.borderColor;

        if (regexISO.test(textToEvaluate)) {
            isoFilterInput.style.borderColor = 'green';
            voiceSelect.focus();
            loadVoicesDropdown();
        } else {
            isoFilterInput.style.borderColor = 'red';
        }

        setTimeout(() => {
            isoFilterInput.style.borderColor = borderColorValue;
        }, 4000);
    }
})