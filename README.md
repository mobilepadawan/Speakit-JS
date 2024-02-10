# SpeechUtils
A JavaScript library to an easiest implement of Speech Synthesis API.

This library allows you to audibly reproduce any text from a web application, in different languages. Internally, uses the `SpeechSynthesis` API in combination with `SpeechSynthesisUtterance` API. It allows you to regulate the speed and pitch of the audio and select different voices (male or female) and different languages (*) and accents.

```
🔔 This product is in early beta phase. You can write me to report any bug you find it.
```

## SUMMARY

1) Installing SpeechUtils
2) How to use it
3) Some samples
4) Compatibility
5) How to contribute with its evolution
6) License
7) Contacting me

### Installing SpeechUtils

You can install `SpeechUtils library` by downloading the JS Library from the /SRC/ folder and copying the file into your web frontend project.
In this first iteration you can use it by referencing it in the `<head>` section of the HTML file(s). In the near future you'll use it as an `ES6 Module`.

```HTML
<script src="js/class.synthesis-beta.v1.0.0.js"></script>
```

You don't need to use the JS `defer` attribute and you don't need to reference the library at the end of the HTML file. Use the `-min` version with only `2KB` of weight. 
