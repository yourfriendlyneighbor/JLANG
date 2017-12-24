"use strict";

module.exports = function(varname, varvalue, symbols) {
    // console.log(varname);
    // console.log(varvalue);
    // console.log(symbols);
    symbols[varname.substring(4)] = varvalue;
    return symbols
}
