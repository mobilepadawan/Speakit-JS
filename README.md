# Speakit JS
A JavaScript library to an easiest implement of [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

![MIT License](https://img.shields.io/npm/l/toastify-js)

This library allows you to audibly reproduce any text from a web application, in different languages. Internally, uses the `SpeechSynthesis` API in combination with `SpeechSynthesisUtterance` API. It also allows you to regulate the speed and pitch of the audio and to select different voices (male or female) from different languages (*) and accents.

```
🔔 This product is in early beta phase. Please write me to report any bug you did found it.
```

## SUMMARY
⏳ WORK IN PROGRESS...

1) [Installing SpeechUtils](#installing-speechutils)
2) [How to use it](#how-to-use-it)
    * [utteranceRate property](#utterancerate-property)
    * [utterancePitch property](#utterancepitch-property)
    * [getVoices() method](#getvoices-method)
3) [Some samples](#some-samples)
4) [Compatibility](#compatibility)
    * [Dekstop web browsers](#desktop-web-browsers)
    * [Mobile web browsers](#mobile-web-browsers)
5) How to contribute with its evolution
6) License
7) Contacting me

<br>
<hr>

### Installing Speakit JS

You can install `Speakit JS library` by downloading the JS Library from the `/SRC/` folder of this repository and copying the file into your web frontend project. In this first iteration you can use it by referencing it in the `<head>` section of the HTML file(s). 

```HTML
<script src="js/Speakit-beta.v1.0.0.js"></script>
```

You don't need to use the JS `defer` attribute and you don't need to reference the library at the bottom of an HTML file. Use the `-min` version. It has only `2KB` of weight ⚖️. The NOT `minified` version is usually recommended for testing and improvement purposes. It also has only `3 KB` of weight 🙂.

```
🔔 In the comming weeks you'll have an * ES6 Module * version of this library.
```

<br>
<hr>

### How to use it

After referencing the Library into the HTML file of your project, you can configure some properties to a better audio performance.
* utteranceRate
* urretancePitch
* getVoices()

#### utteranceRate property

The `utteranceRate` property defines the playback rate of spoken text using the speech synthesizer. This property determines the speed at which the words will be spoken. A value of `1.0` represents normal speed, while higher values will increase the speed and lower values will decrease the speed.

```javascript
    Speakit.utteranceRate = 1.03
```

We recommend you use with a specific precission: (eg: `1.05` || `1.15`). This property is very sensitive. You should face a couple of tests according to the language selected.

Some languages going well with the value `1.0` and other languages needs a value little higher.

```
🔔 The default value is set in 1.05. It is not mandatory to configure a value unless you find the voice picked some fast or it sound distortionated.
```

<br>
<hr>

#### utterancePitch property

The `utterancePitch` property defines the pitch of voice used for speech synthesis. This property adjusts the fundamental frequency of the synthesized voice, which can influence the perceived pitch of the voice.

```javascript
    Speakit.utterancePitch = 1.0
```

A value of `1.0` represents normal pitch, and higher or lower values will alter the tone of the voice. Configure this property value with patience, it is very sensitive.

```
🔔 The default value is set in 1.05. It is not mandatory to configure a value unless you find the voice picked some fast or it sound distortionated.
```

<br>
<hr>

#### getVoices() method

The `getVoices()` method is a static method of the `Speakit` class that is used to get a list of voices available for speech synthesis in the web browser.

```javascript
    Speakit.getVoices().then(voices => console.table(voices))
```

This method returns an array of `SpeechSynthesisVoice` objects, which represent the voices available to be used with the speech synthesizer.

```javascript
    voice.lang // represents the property where you can watch the ISO code of any available language
    /*
        'es-MX' Español - México
        'en-AU' English - Australian
        'it-IT' Italian language
    */

   voice.name // represents the name given to the every voice.

   /*
    For example, according to web browser, some voices has a name as "Samantha", "Diego", "Karen", etcetera.
   */
```

We recommend you to test the code sample bellow in `DevTools > Console` to see the complete list available in the web browser that you are coding and testing you webapp. This voices list may vary throw the different web browsers main engines.

You can use it to list the voices in a `combo select`, `HTML table` or another kind of web component and gives to the user the choice to choose what type of voice and tone he/she want to use. Or, if you build a closed application, you can set some voice automatically according to the locale declared in the web browser.

```
🔔 It is important to note that voice availability may vary depending on the user's browser and the operating system where the web app is running.
```

<br>
<hr>

### Some samples

#### How to get the list of available voices

Add a Select HTML element and configure to receive a list of voices to show.
```html
<select id="language-select">
    <option value="">Pick a language</option>
</select>
```

Make a DOM link with the select HTML element.

Create a function to get all the available voices, iterate them and load the voice list in the Select HTML element.
```javascript
const languageSelect = document.getElementById('language-select')

function loadVoicesInSelect(languageSelect) {
    Speakit.getVoices().then((voices)=> {
        if (voices.length > 0) {
          voices.forEach((voice)=> {
            languageSelect.innerHTML += `<option value="${voice.lang}" data-voice="${voice.name}">
                                            (${voice.lang}) - ${voice.name}
                                        </option>`
          })
        }
    })
    .catch((error)=> console.error('Error loading the available voices:', error) )
}
```

The `getVoices()` method is a process built with JS Promises. Take care and apply an effective control to the `.then()` and `.catch()` methods.

#### Reproduce audibly a text

The `.readText()` method must receives the first two parameters. **The first parameter** is the text to reproduce. It can be a Static text as the sample below or, of course, a text provided by a textInput, textArea or another HTML element. Be sure to send a clean text. Do not send HTML tags or similar because of we do not know the unpredictable behaviour of the different voices.

**The second parameter** is the ISO code langugage for the selected voice: `es-MX`, `en-US`, `it-IT`.

**The third parameter** is optional and represents the voice object according the type of tone or accent selected by the available voice list. For example: you are using Microsoft Edge to test your webapp and select the `'en-HK'` as the language to reproduce audibly a text. In the voices available list, you select `'Microsoft Sam Online (Natural) - English (Hongkong)'`.

You can send this information as the third parameter and `Speakit JS` will try to acquire the `SpeechSynthesisUtterance` to reproduce audibly the accent according you selection. If you don't send this third parameter Speakit JS will select the default voice language to reproduce the text. 

```javascript
Speakit.readText("Hello to everyone. This is an audibly text to reproduce throw the JavaScript SpeechSynthesis.", 
                 "en-NZ", 
                 voiceName)
.then(()=> console.log('Text succesfuly readed.') ) //you can do anything when the Speech synthesis finished.
.catch((error)=> console.error('Error reading the text:', error) )
```

The `.readText()` method works with JS Promises. You can add a .then Method to execute a JS code according the text audibly end its reproduction.


```
🔔 We are building some more simple samples. Come in a few weeks and test it.
```

<br>
<hr>

### Compatibility

SpeechSynthesis API has a good compatibility with the most of web browsers because this JS API was born in 2014. See the web browsers list of compatibility below.


#### Desktop Web browsers

|Brand|Version|SpeechSynthesis available|
|-|-|-|
|Google Chrome|33+|✅|
|Microsoft Edge|14+|✅|
|Safari|7+|✅|
|Mozilla Firefox|49+|✅|
|Opera|21+|✅|
|Samsung Internet|49+|✅|
|Internet Explorer|?|⛔️|

#### Mobile Web browsers

|Brand|Version|SpeechSynthesis available|
|-|-|-|
|Chrome for Android|121+|✅|
|Firefox for Android|122+|✅|
|Samsung Internet|4-22|✅ `only in Samsung mobile devices`|
|Samsung Internet|23|✅ `smartphones of any brand with this web browser installed`|
|Microsoft Edge|14+|✅|
|Safari on iOS - iPadOS|7+|✅|
|Other web browsers on iOS - iPadOS|?|🚧 `Until Apple allows other web engines on iOS and iPadOS, any web browser you install on these mobile devices is required to use the Safari web browser engine.`|
|Opera mobile-Mini|12+|⛔️|
|Browser for Android|6+|⛔️|
|KaiOS browser|2.5+|⛔️|
|Android WebView|?|⛔️|
|iOS WKWebView|?|⛔️|

🔔 Please visit [Can I Use](https://caniuse.com/?search=SpeechS) website for the most recently updates.

