# SpeechUtils
A JavaScript library to an easiest implement of [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

This library allows you to audibly reproduce any text from a web application, in different languages. Internally, uses the `SpeechSynthesis` API in combination with `SpeechSynthesisUtterance` API. It allows you to regulate the speed and pitch of the audio and select different voices (male or female) and different languages (*) and accents.

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

### Installing SpeechUtils

You can install `SpeechUtils library` by downloading the JS Library from the `/SRC/` folder of this repository and copying the file into your web frontend project. In this first iteration you can use it by referencing it in the `<head>` section of the HTML file(s). 

```HTML
<script src="js/Speakit-beta.v1.0.0.js"></script>
```

You don't need to use the JS `defer` attribute and you don't need to reference the library at the end of the HTML file. Use the `-min` version. It has only `2KB` of weight ⚖️. The NOT `minified` version is usually recommended for testing and improvement purposes. Also it has only `3 KB` of weight 🙂.

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

We recommend you use with a specific precission: (eg: `1.05` || `1.15`). This property is very sensitive. You must do a couple of tests according to the language selected.

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

The `getVoices()` method is a static method of the `SpeechUtils` class that is used to get a list of voices available for speech synthesis in the browser.

```javascript
    Speakit.getVoices()
```

This method returns an array of `SpeechSynthesisVoice` objects, which represent the voices available to be used with the speech synthesizer.

You can use it to list the voices in a `combo select` and have the user choose what type of voice and tone they want to use. Or if you build a closed application, you can set some voice automatically according to the locale declared in the web browser.

```
🔔 It is important to note that voice availability may vary depending on the user's browser and the operating system where the web app is running.
```

<br>
<hr>

### Some samples

```
🔔 We are building a ver simple sample. Come in a few weeks and test it.
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
|Opera mobile-Mini|12+|⛔️|
|Browser for Android|6+|⛔️|
|KaiOS browser|2.5+|⛔️|
|Android WebView|?|⛔️|
|iOS WKWebView|?|⛔️|

🔔 Please visit [Can I Use](https://caniuse.com/?search=SpeechS) website for the most recently updates.

