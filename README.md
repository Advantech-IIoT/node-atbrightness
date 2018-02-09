# node-atbrightness
Node.js Integration for Advantech IIoT brightness function.

Notice that an Advantech IIoT Platform SDK have to be installed to make this node works correctly.
Advantech IIoT Platform SDK download link is shown below:
Windows:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/windows/bin
Linux:
  https://github.com/Advantech-IIoT/Platform-SDK/tree/master/linux/bin

## Install
Use npm command to install this package locally in the Node-RED modules directory
```bash
npm install node-atbrightness
```
or install it globally with the command
```bash
npm install node-atbrightness -g
```
## Usage
Brightness provide four functions in this module.
  - Get Brightness Values (Maximum, Minimum, and Current Values)
  - Set Brightness Values (Maximum, Minimum, and Current Values)
  - Check Auto Brightness Status
  - Set Auto Brightness

---
## Example
Please refer [`demo.js`](./demo.js).

All these examples are started with:
```js
var brightness = require('node-atbrightness');
```

### Get Brightness Values
This sample prints the all of the brightness status.
``` js
// Get the Minimum Brightness Value
console.log(brightness.getbrightnessmin());

// Get the Maximum Brightness Value
console.log(brightness.getbrightnessmax());

// Get the Current Brightness Value
console.log(brightness.getbrightnessvalue());
```

### Set Brightness Values
If the value you input is not between <code>brightness.getbrightnessmin()</code> and <code>brightness.getbrightnessmax()</code>, it will output a number--<code>50</code>.
``` js
console.log(brightness.setbrightnessvalue(5));
```

### Check Auto Brightness Status
Output value:
 - 0: Set Brightness Manually
 - 1: Set Brightness Automatically
 - 50: Not Support
``` js
console.log(brightness.checkautobrightness());
```

### Set Auto Brightness
Return value:
 - 0: Set Brightness Manually
 - 1: Set Brightness Automatically
 - 50: Not Support
``` js
// Auto Brightness
console.log(brightness.setautobrightness(true));

// Manually Brightness
console.log(brightness.setautobrightness(false));
```
---
## Test Platform
- Windows 10 Enterprise LTSB with node.js 6.10.1

## History
- 0.1.7 - October 2017 : Initial Release

## License
Copyright 2017 ADVANTECH Corp. under [the Apache 2.0 license](LICENSE).