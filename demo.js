var brightness = require('node-atbrightness');

// Get the Minimum Brightness Value
console.log(brightness.getbrightnessmin());

// Get the Maximum Brightness Value
console.log(brightness.getbrightnessmax());

// Get the Current Brightness Value
console.log(brightness.getbrightnessvalue());

// Set Current Brightness Value
console.log(brightness.setbrightnessvalue(5));

// Check Auto Brightness Status
console.log(brightness.checkautobrightness());

// Set Auto Brightness
console.log(brightness.setautobrightness(true));