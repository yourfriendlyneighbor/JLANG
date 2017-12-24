'use strict';
const prompt = require('prompt-sync')();

module.exports = function(str, varname, symbols) {
    const p = prompt(str.substring(5, str.length-1) + " ");
    symbols[varname.substring(4)] = "STR:\"" + p + "\"";
    return symbols
}
