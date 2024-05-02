# Speakit JS
Elevate your web applications with the power of JavaScript speech synthesis. Make your users listen to your content with just two lines of code!.

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

![MIT License](https://img.shields.io/npm/l/toastify-js)

This library enables you to audibly reproduce any text from a web application in various languages. It utilizes the `SpeechSynthesis` API along with the `SpeechSynthesisUtterance` API to regulate the audio speed, pitch, and voice selection (male or female) across different languages (*) and accents.

For a **not-so-technical hands-on**, please visit the [Official website](https://mobilepadawan.github.io/Speakit-JS/). You'll find a very quick guide and a Demo to test the Speakit-JS functionality.

## SUMMARY

1) [Installing Speakit JS](#installing-speakit-js)
2) [How to use it](#how-to-use-it)
    * [utteranceRate property](#utterancerate-property)
    * [utterancePitch property](#utterancepitch-property)
    * [getVoices() method](#getvoices-method)
    * [About the ISO languages](#about-the-iso-languages)
    * [Checking your web browser compatibility](#checking-your-web-browser-compatibility)
3) [Some samples](#some-samples)
    * [Get the list of available voices](#get-the-list-of-available-voices)
    * [Reproducing Audible Text](#reproducing-audible-text)
    * [Pause a speaking action](#pause-a-speaking-action)
    * [Resume a paused speaking](#resume-a-paused-speaking)
    * [Stop speaking](#stop-speaking)
4) [Compatibility](#compatibility)
    * [Dekstop web browsers](#desktop-web-browsers)
    * [Mobile web browsers](#mobile-web-browsers)
5) [Alpha version (News)](#alpha-version)
6) [How to contribute](#how-to-contribute)
7) [License](#license)
8) [Contacting me](#contacting-me)

<br>
<hr>

## Installing Speakit JS

You can install `Speakit JS library` by downloading the JS Library from the `/SRC/` folder of this repository and copying it into your web frontend project. To use it, simply reference the file in the `<head>` section of your HTML file(s).

```HTML
<script src="js/Speakit-beta.v1.0.0.js"></script>
```

You don't need to use the `defer` attribute for the script tag, and there's no need to reference the library at the bottom of an HTML file. The minified version has a weight of only `2KB` ⚖️, making it lightweight. The unminified version, recommended for testing and improvement purposes, has a weight of only `3KB` 🙂.

```
🔔 In the comming weeks you'll have
an ES6 Module * version of this library.
```

## Installing Speakit JS as an NPM package

 As well, any frontend project created by using NodeJS and NPM can let you add this marvelous library, just installing it through NPM command. 

```terminal
   npm install speakit-js
```
Please, visit [NPMJS](https://www.npmjs.com/package/speakit-js)) to know more.


<br>
<hr>

## How to use it

After referencing the Library into the HTML file of your project, you can configure some properties to a better audio performance.
* **utteranceRate**
* **utterancePitch**
* **getVoices()**

### utteranceRate property

The `utteranceRate` property defines the playback rate of spoken text using the speech synthesizer. This property determines the speed at which the words will be spoken. A value of `1.0` represents **normal speed**, while higher values will increase the speed and lower values will decrease it.

```javascript
  Speakit.utteranceRate = 1.03
```

We recommend using a specific precision, for example, `1.02` or `1.14`. This property is very sensitive, so you should conduct several tests based on the selected language.

Some languages work well with the value `1.0` while others may require a slightly higher value.

```
🔔 The default value is set in 1.03. It is not mandatory to configure
a value unless you find the voice speaking too quickly or sounding distorted.
```

<br>
<hr>

### utterancePitch property

The `utterancePitch` property defines the pitch of the voice used for speech synthesis. This property adjusts the fundamental frequency of the synthesized voice, which can affect the perceived pitch of the voice.

```javascript
  Speakit.utterancePitch = 1.0
```

A value of `1.0` represents normal pitch, while higher or lower values will alter the tone of the voice. Configure this property value with patience, as it is very sensitive.

<br>
<hr>

### getVoices() method

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
    For example, according to web browser, some voices
    has a name as "Samantha", "Diego", "Karen", etcetera.
  */
```

I recommend testing the code sample below in `DevTools > Console` to view the complete list of voices available in the web browser you are using to code and test your web app. Please note that this list of voices may vary across different web browser engines.

### About the ISO languages

You can use it to populate a list of voices in an HTML `Combo Select` element, an `HTML table` element, or another type of web component, allowing users to choose their preferred voice and tone. Alternatively, for closed applications, you can automatically set a voice based on the locale region configuration declared in the user's web browser.

|ISO Code|Description|
|-|-|
|pt-PT|Portugues - Portugal|
|pt-BR|Portugues - Brasil|
|es-MX|Español - Mexico|
|en-US|English - United States|
|en-BR|English - Great Britain|
|en-AU|English - Australia|
|en-HK|English - Hong Kong|

```
🔔 Please note that voice availability may vary depending on the user's
web browser and the operating system where the web app is running.
```
<br>

### Checking your web browser compatibility
If you want to check the web browser compatibility you can execute the `.TTStest()` method. It will **return** if the web browser it is compatible or not with **Speech Synthesis**.

```javascript
  Speakit.TTStest();
```

<hr>

## Some samples

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

### Reproducing Audible Text

The `.readText()` method requires the first two parameters. **The first parameter** is the text to be reproduced. It can be a static text as shown in the sample below or, alternatively, text provided by a `textInput`, `textArea`, or another HTML element. Ensure that the text is clean and does not contain HTML tags or similar, as different voices may exhibit unpredictable behavior.

**The second parameter** is the ISO language code for the selected voice: `es-MX`, `en-US`, `it-IT`.

**The third parameter** is optional and represents the voice object corresponding to the selected tone or accent from the available voice list. For example, if you are using `Microsoft Edge` to test your webapp and select `en-HK` as the language to reproduce audible text, you may choose  `Microsoft Sam Online (Natural) - English (Hongkong)`.

You can provide this information as the third parameter, and `Speakit JS` will attempt to retrieve the `SpeechSynthesisUtterance` to audibly reproduce the accent according to your selection. If you do not provide this third parameter, `Speakit JS` will use the default voice language to reproduce the text. 

```javascript
Speakit.readText("This is a text to an audibly reproduce through the JavaScript SpeechSynthesis.", 
                 "en-NZ", 
                 voiceName)
.then(()=> console.log('Text succesfuly readed.') ) //do something after the Speech synthesis finished.
.catch((error)=> console.error('Error reading the text:', error) )
```

The `.readText()` method operates using JavaScript Promises. You can chain a `.then()` method to execute a JavaScript code after the text has been audibly reproduce.

### Pause a speaking action

You can **pause** any current speaking process by using the `.pauseSpeaking` method.

```javascript
Speakit.pauseSpeaking();
```

This action will pause the current speaking process. It is not cancelled but paused waiting for to continue when the `.resumeSpeaking()` will be executed.

### Resume a paused speaking

You can **resume** (continue) reproducing a text in an audible format if you previously paused it by using the `.resumeSpeaking` method.

```javascript
Speakit.resumeSpeaking();
```

This action will continue reproducing the rest of the text since the position where it was paused.

### Stop speaking

If you need to cancel the any speaking process you can stop it by using the `.stopSpeaking` method.

```javascript
Speakit.stopSpeaking();
```

This action will cancel the speaking process and will send a warning to the DevTools JS console by the JS **console** Object. This is not an error or an issue, it is just a warning about the user _(or webapp)_ executed a cancellation action.

<br>
<hr>

## Compatibility

SpeechSynthesis API boasts good compatibility with most of web browsers, as it was introduced in 2014. Below, you can find a list of web browsers that support this JS API.

### Desktop Web browsers

|Brand|Version|SpeechSynthesis available|
|-|-|-|
|Google Chrome|33+|✅|
|Microsoft Edge|14+|✅|
|Safari|7+|✅|
|Mozilla Firefox|49+|✅|
|Opera|21+|✅|
|Samsung Internet|49+|✅|
|Internet Explorer|?|⛔️|

## Note about Safari and Firefox browsers

**🔔 We detected in Safari and Firefox browsers that the `utteranceRate` and `utterancePitch` properties of the SpeakitJS library must used with a lower value than the default value. Those web browsers play the voice in an accelerated way than the experience got with Chrome and Edge. Please, test it well and make a fine tuning of that properties.**

### Mobile Web browsers

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

🔔 Please visit [Can I Use](https://caniuse.com/mdn-api_speechsynthesis) website for the most recently updates.

## Alpha version

In this section you can find news about what we are working on the coming versions of Speakit-JS.

* [ ] Specify an ISO Code language to filter the `.getVoices()` method results.
* [ ] Adding the filter behaivour to the `.getVoices()` method.
* [ ] Adding the fallback behaivour to the `.getVoices()` method.


## How to contribute

We invite you to send your comments and suggestions opening an issue space in this Repository. We will evaluate them and plan how to implement if you comments are helpful for the maintaning process of this library.

## License

We have not a solid model of license. For the moment we invite you to use Speakit-JS library for free. 

## Contacting me

You can write me through Github space or send me an email to `ferproonline_gmail_com`. Also you can follow me on (X) or Twitter in my personal account: `@mobilepadawan`.

## Keywords
`speakit-js`, `speech-synthesis`, `voice`, `javascript`, `text-to-speech`, `tts`, `speech`, `synthesis`, `utterance`, `library`
