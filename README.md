# Immediate.js

## How to use?

### Class

```html
<script type="text/javascript" src="Immediate.class.min.js"></script>
```
```js
Immediate.setImmediate((test) => {
	console.log(test);
}, `test passed`);
```

### Function

```html
<script type="text/javascript" src="Immediate.function.min.js"></script>
```
```js
setImmediate((test) => {
	console.log(test);
}, `test passed`);
```
## Benefits
### Moving from setTimeout to setImmediate
Immediate.js is based off of `setTimeout` ([Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)), meaning that if you convert `setTimeout`/`setInterval` to `setImmediate`/`setImmediateInterval` (Minus the delay) it *should* work.
### Speed
Theres a problem with `setTimeout`, most browsers cap the minimum time to 4ms

> **[\-Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)**
> 
> *The first four times, the delay is approximately **0 milliseconds**, and after that it is approximately **4 milliseconds***

But with `setImmediate` the delay will almost always be **0 milliseconds** to **1 millisecond**
<sub>*(Depending on how much load is being put on the system)*</sub>

### Downsides
`setImmediate` uses [`Window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage), meaning that you should not have an window listeners listening for a `"message"`

You also *cannot* use the function file for IE or NodeJS, as they have "[`setImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)" and "[`clearImmediate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/clearImmediate)" already defined, while NodeJS doesn't have the Window class but they also have them defined

### Downloading

Navigate to "releases" and just download the latest one, there ***shouldn't*** be too many since the code is quite simple

<big>**OR**</big>

Download either "[Immediate.class.min.js](https://github.com/DesMS/Immediate.js/blob/main/Immediate.class.min.js)" for the class file or "Immediate.function.min.js" for the function file.
