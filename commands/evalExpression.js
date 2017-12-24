"use strict";

module.exports = function (expression) {
    try {
        return "NUM:" + require('mathjs').eval(expression.substring(5))

    } catch (e) {
        return false
    }
}
