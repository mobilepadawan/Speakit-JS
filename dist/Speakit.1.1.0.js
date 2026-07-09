export class Speakit extends SpeechSynthesis {
    static utteranceRate = 1.1
    static utterancePitch = 1.1
    static utteranceVolume = 0.5
    static totalAvailableVoices = 0     // Will deprecate this property in the 2.0 version
    static numberOfAvailableVoices = 0  // Use it to count the number of voices available instead of 'totalAvailableVoices'
    static languageFilter = ""          // Specify an ISO language code for filtering voices
    static totalVoices = []

    static #getAvailableVoices() {
        return new Promise(function (resolve, reject) {
            if ('speechSynthesis' in window) {
                let voices = speechSynthesis.getVoices()
                if (voices.length > 0) {
                    voices.sort((a, b) => a.lang.localeCompare(b.lang))
                    resolve(voices)
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        voices = speechSynthesis.getVoices()
                        voices.sort((a, b) => a.lang.localeCompare(b.lang))
                        resolve(voices)
                    }
                }
            } else {
                reject('SpeechSynthesis API is not available in this web browser.')
            }
        })
    }

    /* @preserve */
    /**
     * Retrieves and filters the list of available speech synthesis voices on the device.
     * @async
     * @returns {Promise<SpeechSynthesisVoice[]>} A promise that resolves to an array of available SpeechSynthesisVoice objects.
     */
    /* @endpreserve */
    static async getVoices() {
        if (Speakit.totalVoices.length === 0) {
            Speakit.totalVoices = await this.#getAvailableVoices()
            if (Speakit.totalVoices.length > 0 && Speakit.languageFilter.trim() !== "") {
                let filteredLanguages = Speakit.totalVoices.filter((voice)=> voice.lang.includes(Speakit.languageFilter.trim()) )
              if (filteredLanguages.length > 0) {
                Speakit.totalVoices.length = 0
                Speakit.totalVoices = filteredLanguages
                Speakit.totalAvailableVoices = filteredLanguages.length
                Speakit.numberOfAvailableVoices = filteredLanguages.length 
              } else {
                console.warn("Error with the ISO language specified:", Speakit.languageFilter.trim())
              }
            }
            Speakit.totalAvailableVoices = Speakit.totalVoices.length
        }
        return Speakit.totalVoices
    }
    /* @preserve */
    /**
     * Synthesizes text into spoken audio using the Web Speech API.
     * 
     * @param {string} text - The text content to be spoken.
     * @param {string} [lang] - Optional. The BCP 47 language tag (e.g., 'en-US', 'it-IT'). Defaults to languageFilter or 'en-GB'.
     * @param {object} [voiceURI] - Optional. The exact unique name signature of the targeted voice engine.
     * @returns {Promise<void>} A promise that resolves when the speech finishes successfully or rejects if an error occurs.
     */
    /* @endpreserve */
    static readText(text, lang, voiceURI) {
        return new Promise(function (resolve, reject) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang || this.languageFilter || "en-GB"
            utterance.rate = Speakit.utteranceRate || 1.03
            utterance.pitch = Speakit.utterancePitch || 1.0
            utterance.volume = Speakit.utteranceVolume || 0.5

            if (voiceURI) {
                let voice = speechSynthesis.getVoices().find(v => v.name === voiceURI)
                voice ? utterance.voice = voice : console.error(`The selected voice '${voiceURI}' is not available.`)
            }
            utterance.onend = () => resolve()
            utterance.onerror = (error) => reject(error)
            speechSynthesis.speak(utterance)
        })
    }

    static isSpeaking() {
        return speechSynthesis.speaking
    }

    static isPaused() {
        return speechSynthesis.paused
    }

    static pauseSpeaking() {
        speechSynthesis.pause()
    }

    static resumeSpeaking() {
        speechSynthesis.resume()
    }

    static stopSpeaking() {
        try {
            Speakit.pauseSpeaking()
            speechSynthesis.cancel(e)
        } catch (error) {
            console.warn("Speaking cancelled by the App.")
            return
        }
    }

    static TTStest() {
        if (speechSynthesis) {
            this.readText("Your web browser has supported for using Text-To-Speech.", "en-GB")
            return "🟢 Your web browser has supported for using Text-To-Speech."
        } else {
            return "🔴 Your web browser does not supports Text-To-Speech. Consider to use a Webkit or Blink (Chromium) based web browser."
        }
    }

    static about() {
        return `Copyright 2024-02-08: Fernando Omar Luna - @ mobile padawan.
        Send me an email to (ferproonline at gmail dot com) or DMme by Twitter/X (@ mobile padawan) just to tell me what kind of use you are giving to this class and/or just to 'say Hi!'.
        This library is free of use and modify, but, please, don't remove this method.`
    }
}