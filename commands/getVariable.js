'use strict';

module.exports = function(varname, symbols) {
    if(symbols[varname.substring(4)]) {
        return symbols[varname.substring(4)];
    } else {
        return "Undefined Variable";
        process.exit()
    }
}
