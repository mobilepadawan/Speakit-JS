# Speakit JS
Speakit JS is a JavaScript library to an easiest implement of [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

![MIT License](https://img.shields.io/npm/l/toastify-js)

This library enables you to audibly reproduce any text from a web application in various languages. It utilizes the `SpeechSynthesis` API along with the `SpeechSynthesisUtterance` API to regulate the audio speed, pitch, and voice selection (male or female) across different languages (*) and accents.

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
    * [Some ISO languages](#some-iso-languages)
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

You can install `Speakit JS library` by downloading the JS Library from the `/SRC/` folder of this repository and copying it into your web frontend project. To use it, simply reference the file in the `<head>` section of your HTML file(s).

```HTML
<script src="js/Speakit-beta.v1.0.0.js"></script>
```

You don't need to use the `defer` attribute for the script tag, and there's no need to reference the library at the bottom of an HTML file. The minified version has a weight of only `2KB` ⚖️, making it lightweight. The unminified version, recommended for testing and improvement purposes, has a weight of only `3KB` 🙂.

```
🔔 In the comming weeks you'll have an * ES6 Module * version of this library.
```

<br>
<hr>

### How to use it

After referencing the Library into the HTML file of your project, you can configure some properties to a better audio performance.
* **utteranceRate**
* **utterancePitch**
* **getVoices()**

#### utteranceRate property

The `utteranceRate` property defines the playback rate of spoken text using the speech synthesizer. This property determines the speed at which the words will be spoken. A value of `1.0` represents **normal speed**, while higher values will increase the speed and lower values will decrease it.

```javascript
    Speakit.utteranceRate = 1.03
```

We recommend using a specific precision, for example, `1.05` or `1.15`. This property is very sensitive, so you should conduct several tests based on the selected language.

Some languages work well with the value `1.0` while others may require a slightly higher value.

```
🔔 The default value is set in 1.05. It is not mandatory to configure a value unless you find the voice speaking too quickly or sounding distorted.
```

<br>
<hr>

#### utterancePitch property

The `utterancePitch` property defines the pitch of the voice used for speech synthesis. This property adjusts the fundamental frequency of the synthesized voice, which can affect the perceived pitch of the voice.

```javascript
    Speakit.utterancePitch = 1.0
```

A value of `1.0` represents normal pitch, while higher or lower values will alter the tone of the voice. Configure this property value with patience, as it is very sensitive.

```
🔔 The default value is set in 1.05. It is not mandatory to configure a value unless you find the voice speaking too quickly or sounding distorted.
```

<br>
<hr>

#### getVoices() method

The `getVoices()` method is a static method of the `Speakit` class used to retrieve a list of available voices for speech synthesis in the web browser.

```javascript
    Speakit.getVoices().then(voices => console.table(voices))
```

This method returns an array of SpeechSynthesisVoice objects representing the voices available for use with the speech synthesizer.

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

I recommend testing the code sample below in `DevTools > Console` to view the complete list of voices available in the web browser you are using to code and test your web app. Please note that this list of voices may vary across different web browser engines.

#### Some ISO languages

|ISO Code|Description|
|-|-|
|pt-PT|Portugues - Portugal|
|pt-BR|Portugues - Brasil|
|es-MX|Español - Mexico|
|en-US|English - United States|
|en-BR|English - Great Britain|
|en-AU|English - Australia|
|en-HK|English - Hong Kong|

You can use it to populate a list of voices in an HTML `Combo Select` element, an `HTML table` element, or another type of web component, allowing users to choose their preferred voice and tone. Alternatively, for closed applications, you can automatically set a voice based on the locale region configuration declared in the user's web browser.

```
🔔 Please note that voice availability may vary depending on the user's browser and the operating system where the web app is running.
```

<br>
<hr>

### Some samples

#### How to get the list of available voices

Add a Select HTML element to configure it to display a list of voices:
```html
<select id="language-select">
    <option value="">Pick a language</option>
</select>
```

Next, create a DOM link with the `Select` HTML element.

Then, create a function to retrieve all available voices, iterate through them, and populate the voice list in the Select HTML element with the voice list:
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

The `getVoices()` method is asynchronous and utilizes JS Promises. Ensure effective error handling using the `.then()` and `.catch()` methods.

#### Reproducing Audible Text

The `.readText()` method requires the first two parameters. **The first parameter** is the text to be reproduced. It can be a static text as shown in the sample below or, alternatively, text provided by a `textInput`, `textArea`, or another HTML element. Ensure that the text is clean and does not contain HTML tags or similar, as different voices may exhibit unpredictable behavior.

**The second parameter** is the ISO language code for the selected voice: `es-MX`, `en-US`, `it-IT`.

**The third parameter** is optional and represents the voice object corresponding to the selected tone or accent from the available voice list. For example, if you are using `Microsoft Edge` to test your webapp and select `en-HK` as the language to reproduce audible text, you may choose  `Microsoft Sam Online (Natural) - English (Hongkong)`.

You can provide this information as the third parameter, and `Speakit JS` will attempt to retrieve the `SpeechSynthesisUtterance` to audibly reproduce the accent according to your selection. If you do not provide this third parameter, `Speakit JS` will use the default voice language to reproduce the text. 

```javascript
Speakit.readText("This is a text to an audibly reproduce through the JavaScript SpeechSynthesis.", 
                 "en-NZ", 
                 voiceName)
.then(()=> console.log('Text succesfuly readed.') ) //you can do anything when the Speech synthesis finished.
.catch((error)=> console.error('Error reading the text:', error) )
```

The `.readText()` method operates using JavaScript Promises. You can chain a `.then()` method to execute a JavaScript code after the text has been audibly reproduce.


```
🔔 We are building some more simple samples. 
Come in a few weeks and test it.
```

<br>
<hr>

### Compatibility

SpeechSynthesis API boasts good compatibility with most of web browsers, as it was introduced in 2014. Below, you can find a list of web browsers that support this JS API.

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

