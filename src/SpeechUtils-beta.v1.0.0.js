class SpeechUtils extends SpeechSynthesis {
    static utteranceRate = 1.05
    static utterancePitch = 1.0
    static #totalAvailableVoices = 0
    static #getAvailableVoices() {
        return new Promise(function(resolve, reject) {
            if ('speechSynthesis' in window) {
                let voices = speechSynthesis.getVoices()
                if (speechSynthesis.seeAvailableVoices) console.log(`Result: ${voices.length}`)
                if (voices.length > 0) {
                    voices.sort((a, b) => {
                        if (a.lang > b.lang) return 1
                        if (a.lang < b.lang) return -1
                        return 0
                    })
                    SpeechUtils.totalAvailableVoices = voices.length
                    resolve(voices)
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        voices = speechSynthesis.getVoices()
                        voices.sort((a, b) => {
                            if (a.lang > b.lang) return 1
                            if (a.lang < b.lang) return -1
                            return 0
                        })
                    }
                    SpeechUtils.totalAvailableVoices = voices.length
                    resolve(voices)
                }
            } else {
                reject('SpeechSynthesis API is not available in this web browser.')
            }
        })
    }

    static getVoices() {
        return SpeechUtils.#getAvailableVoices()
    }

    static readText(text, lang, nameOfVoice) {
        return new Promise(function(resolve, reject) {
            const utterance = new SpeechSynthesisUtterance(text)
            utterance.lang = lang || "en-GB"
            utterance.pitch = SpeechUtils.utterancePitch || 1.0
            utterance.rate = SpeechUtils.utteranceRate || 1.05
            let voice = speechSynthesis.getVoices().find(v => v.name === nameOfVoice)
            voice ? utterance.voice = voice : console.error(`The selected voice '${nameOfVoice}' is not avialable.`)
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
        speechSynthesis.pause();
    }

    static resumeSpeaking() {
        speechSynthesis.resume();
    }

    static stopSpeaking() {
        try {
            SpeechUtils.pauseSpeaking()
            speechSynthesis.cancel(e)
        } catch (error) {
            console.warn("Speaking cancelled by the App.")
            return 
        }
    }

    static about() {
        return `Copyright 2024-02-08: Fernando Omar Luna - @ mobile padawan.

        Send me an email to (ferproonline at gmail dot com) or DMme by Twitter/X (@ mobile padawan) just to tell me what kind of use you are giving to this class and/or just to 'say Hi!'.

        This library is free of use and modify, but, please, don't remove this method.`
    }
}