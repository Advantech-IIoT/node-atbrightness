var binding_path = (win32or64() === 64) ? './binding/x64/node-atbrightness.node' : './binding/ia32/node-atbrightness.node';
var binding = require(binding_path);

var brightness_inited = false;
var brightness_auto = false;
var brightness_value = 0;
var brightness_max = 0;
var brightness_min = 0;

/**
 * detect whether windows OS is a 64 bits or 32 bits
 * http://ss64.com/nt/syntax-64bit.html
 * http://blogs.msdn.com/b/david.wang/archive/2006/03/26/howto-detect-process-bitness.aspx
 * @return {number}
 */
function win32or64() {
    //xx  console.log(" process.env.PROCESSOR_ARCHITEW6432  =", process.env.PROCESSOR_ARCHITEW6432);
    if (process.env.PROCESSOR_ARCHITECTURE === "x86" && process.env.PROCESSOR_ARCHITEW6432) {
        return 64;
    }

    if (process.env.PROCESSOR_ARCHITECTURE === "AMD64") {
        return 64;
    }

    // check if we are running nodejs x32 on a x64 arch
    if (process.env.CURRENT_CPU === "x64") {
        return 64;
    }
    return 32;
}

function atbrightness() {
    if (!brightness_inited) {
        atbrightness.prototype.init();
    }
}

function cleanup() {
    binding.close();
    brightness_inited = false;
    brightness_auto = false;
    brightness_value = 0;
    brightness_min = 0;
    brightness_max = 0;
}

atbrightness.prototype.init = function () {
    /*
     * Open the Brightness driver.
     */
    binding.open();
    brightness_inited = true;
    brightness_value = binding.getBrightnessValue(0);
    brightness_min = binding.getBrightnessValue(1);
    brightness_max = binding.getBrightnessValue(2);
    brightness_auto = binding.checkAutoBrightness();
};

atbrightness.prototype.checkautobrightness = function () {
    // if (!brightness_inited) {
    //     atbrightness.prototype.init();
    // }
    return binding.checkAutoBrightness();
};

atbrightness.prototype.setautobrightness = function (setAuto) {
    return binding.setAutoBrightness(setAuto);
};

atbrightness.prototype.getbrightnessvalue = function () {
    // if (!brightness_inited) {
    //     atbrightness.prototype.init();
    // }
    return binding.getBrightnessValue(0);
};

atbrightness.prototype.setbrightnessvalue = function (setValue) {
    if ((setValue <= brightness_max) && (setValue >= brightness_min)) {
        binding.setBrightnessValue(setValue);
        brightness_value = binding.getBrightnessValue(0);
        return brightness_value;
    } else {
        return 50;
    }
};

atbrightness.prototype.getbrightnessmin = function () {
    // if (!brightness_inited) {
    //     atbrightness.prototype.init();
    // }
    return brightness_min;
};

atbrightness.prototype.getbrightnessmax = function () {
    // if (!brightness_inited) {
    //     atbrightness.prototype.init();
    // }
    return brightness_max;
};

process.on('exit', function (code) {
    cleanup();
});

process.on('uncaughtException', function (err) {
    console.error('UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

module.exports = new atbrightness;