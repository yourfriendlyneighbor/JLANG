"use strict";

module.exports = function(content) {
    if(content.substring(0,3) == "STR" || content.substring(0,3) == "NUM") {
        console.log(content.substring(4));
    } else {
        console.log(content);
    }
}
