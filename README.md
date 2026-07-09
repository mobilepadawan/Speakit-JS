# SpeakitJS v1.1.0

SpeakitJS is an ultra-lightweight `(2kb)`, promise-based wrapper class built on top of the native Web Speech API (`SpeechSynthesis`). It simplifies adding Text-to-Speech (TTS) capabilities to web applications by offering clean asynchronous handling, language filtering, configuration properties, and playback controls.

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

![MIT License](https://img.shields.io/npm/l/toastify-js)

[If you like this Project, BUY ME A COFFE ☕️ ](https://www.buymeacoffee.com/invite/mobilepadawan)

## Table of Contents

1. [Core Configuration Properties](#core-configuration-properties)
2. [Methods Overview](#methods-overview)
3. [Usage Examples](#usage-examples)
   - [Reading Text with 2 Parameters](#reading-text-with-2-parameters)
   - [Reading Text with 3 Parameters](#reading-text-with-3-parameters)
4. [Remote Natural Voices vs. Local Synthesized Voices](#remote-natural-voices-vs-local-synthesized-voices)
5. [Browser Compatibility Matrix](#browser-compatibility-matrix)
6. [About & License](#about--license)

---

## Core Configuration Properties

You can customize the speech playback attributes and filter languages before initiating text-to-speech tasks using the following static class fields:

| Property | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `Speakit.utteranceRate` | `Number` | `1.1` | The speed/tempo of the spoken audio. |
| `Speakit.utterancePitch` | `Number` | `1.1` | The pitch level of the voice. |
| `Speakit.utteranceVolume` | `Number` | `0.5` | The volume level (ranges from `0` to `1`). |
| `Speakit.languageFilter` | `String` | `""` | An ISO language string (e.g., `"es-AR"`, `"en-US"`, `"it-IT"`) to filter out available voices. |
| `Speakit.numberOfAvailableVoices` | `Number` | `0` | Holds the count of available voices after `getVoices()` runs. |
| `Speakit.totalAvailableVoices` | `Number` | `0` | *Deprecated (will be removed in v2.0)*. Use `numberOfAvailableVoices` instead. |
| `Speakit.totalVoices` | `Array` | `[]` | Internal cache array containing loaded voice records. |

---

## Methods Overview

SpeakitJS exposes several static methods for controlling voice setups and execution flow:

* **`async getVoices()`**: Fetches and returns an array of speech voices available on the client device. Applies the `languageFilter` constraint if declared.
* **`readText(text, lang, nameOfVoice)`**: Synthesizes a text string into spoken word audio. It returns a Promise that resolves when the audio completes and rejects if an error surfaces.
* **`isSpeaking()`**: Returns `true` if an utterance is currently in the progress of being spoken.
* **`isPaused()`**: Returns `true` if speech output is currently paused.
* **`pauseSpeaking()`**: Pauses the current ongoing audio output stream.
* **`resumeSpeaking()`**: Resumes audio execution from a previously paused state.
* **`stopSpeaking()`**: Cancels all queued and active playback streams.
* **`TTStest()`**: Runs a sample test in English to visually and audibly confirm browser feature availability.
* **`about()`**: Displays credit metadata, copyright notices, and author contact information.

---

## Usage Examples

### Reading Text with 2 Parameters
When invoking `readText()` with two parameters, you specify the **text content** and the target **ISO language code**. This allows the browser to select the default system voice corresponding to that language.

```javascript
// Example: Reading Italian text with Language Code fallback
Speakit.readText("Buongiorno! Benvenuti nella nostra applicazione per imparare l'italiano.", "it-IT")
    .then(() => {
        console.log("Finished speaking Italian text successfully.");
    })
    .catch((error) => {
        console.error("An error occurred during speech synthesis:", error);
    });
```

---

### Reading Text with 3 Parameters

When using three parameters, you explicitly pass the text content, the ISO language code, and the exact unique name of the voice. This ensures maximum precision across operating systems when a specific voice engine is required.

```javascript
async function speakWithSpecificVoice() {
    Speakit.languageFilter = "en-GB";    // 1. You can setup a language filter
    
    const voices = await Speakit.getVoices(); // 2. Load and extract the specific voice signature
    console.log(`Available voices found: ${Speakit.numberOfAvailableVoices}`);
    
    // Find a specific premium/natural voice signature
    const targetedVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Natural"));
    const voiceName = targetedVoice ? targetedVoice.name : "Microsoft Sonia Online (Natural) - English (United Kingdom)";

    // 3. Invoke readText method with all three parameters
    Speakit.readText(
        "Welcome! This instruction uses a precise voice engine signature.",
        "en-US",
        voiceName
    )
    .then(() => {
        console.log("Finished playing speech using voice: " + voiceName);
    })
    .catch(err => {
        console.error("Playback failed: ", err);
    });
}

speakWithSpecificVoice();
```

---

## Remote Natural Voices vs. Local Synthesized Voices

The quality of text-to-speech translation heavily depends on the backend voice engine used by the host web browser:

Local Synthesized Voices: These components reside directly on the device operating system (such as standard macOS, Windows, iOS, or Android built-in speech synthesizers). They process audio locally without demanding internet access, but their performance tends to sound robotic, mechanical, and less fluid.

Remote Natural Voices (Cloud-Driven): High-tier modern browsers like Google Chrome and Microsoft Edge embed direct integrations to cloud-based neural speech synthesis engines (e.g., Chrome's `Google` voice assets and Edge's `Online (Natural)` collection). These profiles leverage deep neural networks to introduce human-like inflections, pauses, and natural cadences.

**Note:** These remote profiles require an active internet connection. If the client goes offline, the browser gracefully defaults back to standard local mechanical synthesized voices.

---

## Browser Compatibility Matrix

SpeakitJS operates on top of standard Web Speech API implementations `(window.speechSynthesis)`. Compatibility maps directly to underlying rendering engine distributions:


|Browser Engine / Environment|Desktop Support|Mobile Support|Notes|
|-|-|-|-|
|Blink / Chromium (Chrome, Edge, Opera, Brave)|✅|✅|Full support. Features cloud-delivered high-quality natural voices.|
|WebKit (Safari)|✅|✅|Full support. Leverages Apple system-level text-to-speech voices.|
|Gecko (Firefox)|✅|✅|Supported. Depends extensively on host OS engine features.|

---

## About & License

Copyright 2024 - 2026: **Fernando Omar Luna** - mobilepadawan.

Feel free to use, distribute, or modify this class library across personal or commercial projects. If you enjoy this tool, consider dropping an email to ferproonline [at] gmail [dot] com or sending a direct message via Twitter/X (@mobile padawan) to share your implementation stories or simply say hello!

Please do not remove the structural `about()` method from the source distribution.