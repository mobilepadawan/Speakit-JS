class Speakit extends SpeechSynthesis {
    static utteranceRate = 1.03
    static utterancePitch = 1.0
    static totalAvailableVoices = 0
    static totalVoices = []

    static #getAvailableVoices() {
        return new Promise(function (resolve, reject) {
            if ('speechSynthesis' in window) {
                let voices = speechSynthesis.getVoices()
                if (voices.length > 0) {
                    voices.sort((a, b) => a.lang.localeCompare(b.lang))
                    Speakit.totalAvailableVoices = voices.length
                    resolve(voices)
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        voices = speechSynthesis.getVoices()
                        voices.sort((a, b) => a.lang.localeCompare(b.lang))
                        Speakit.totalAvailableVoices = voices.length
                        resolve(voices)
                    }
                }
            } else {
                reject('SpeechSynthesis API is not available in this web browser.')
            }
        })
    }

    static async getVoices() {
        if (Speakit.totalVoices.length === 0) {
            Speakit.totalVoices = await this.#getAvailableVoices()
        }
        return Speakit.totalVoices
    }

    static readText(text, lang, nameOfVoice) {
        return new Promise(function (resolve, reject) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang || "en-GB"
            utterance.rate = Speakit.utteranceRate || 1.03
            utterance.pitch = Speakit.utterancePitch || 1.0
            if (nameOfVoice) {
                let voice = speechSynthesis.getVoices().find(v => v.name === nameOfVoice)
                voice ? utterance.voice = voice : console.error(`The selected voice '${nameOfVoice}' is not avialable.`)
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
            return "🟢 Your web browser has supporting for Text-To-Speech."
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