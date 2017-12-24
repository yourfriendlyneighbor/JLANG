"use strict";

const print = require('./print');
const evalExpression = require('./evalExpression');
const assignVariable = require('./assignVariable');
const getVariable = require('./getVariable');
const input = require('./input');
const getAbsoluteValue = require('./getAbsoluteValue');
const randomNumber = require('./randomNumber');

function parser(toks, symbols) {
    console.log("\n+++PROGRAM OUTPUT+++\n");
    let i = 0;
    while(i < toks.length) {
        try {
            if(!toks[i+1]) {
                process.exit()
            }
            if(!toks[i+2]) {
                toks[i+2] = ''
            }
            if(!toks[i+3]) {
                toks[i+3] = ''
            }
            if(!toks[i+4]) {
                toks[i+4] = ''
            }
            if(!toks[i+5]) {
                toks[i+5] = ''
            }
            if(!toks[i+6]) {
                toks[i+6] = ''
            }
            if(toks[i] == "PAUSE") {
                const prompt = require('prompt-sync')();
                prompt('Press any key to continue ');
                i++;
            } else
            if(toks[i] == "END") {
                i++;
            } else
            if(toks[i] == "ELSE"){
                for (var x = i; x < toks.length; x++) {
                    i++;
                    if(toks[x] == "END") {
                        break;
                    }
                }
            } else
            if(toks[i] + " " + toks[i+1].substring(0,3) == "PRINT STR" ||
               toks[i] + " " + toks[i+1].substring(0,3) == "PRINT NUM" ||
               toks[i] + " " + toks[i+1].substring(0,4) == "PRINT EXPR" ||
               toks[i] + " " + toks[i+1].substring(0,3) == "PRINT VAR" ||
               toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "PRINT ABS NUM" ||
               toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "PRINT ABS VAR" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "PRINT STR CONCAT VAR" ||
               toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "PRINT RND NUM" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) == "PRINT STR CONCAT RND NUM" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) == "PRINT STR CONCAT ABS NUM" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "PRINT STR CONCAT NUM" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] + toks[i+5].substring(0,3) == "PRINT STR CONCAT VAR CONCAT STR" ) {

                if(toks[i+1].substring(0,3) == "STR" && toks[i+2] != "CONCAT") {
                    print(toks[i+1]);
                }
                if(toks[i+1].substring(0,3) == "NUM") {
                    print(toks[i+1]);
                }
                if(toks[i+1].substring(0,4) == "EXPR") {
                    print(evalExpression(toks[i+1]));
                }
                if(toks[i+1].substring(0,3) == "VAR") {
                    print(getVariable(toks[i+1], symbols));
                }
                if(toks[i+1] == "ABS") {
                    if(toks[i+2].substring(0,3) == "NUM") {
                        print(getAbsoluteValue(toks[i+2]))
                    } else if(toks[i+2].substring(0,3) == "VAR") {
                        print(getAbsoluteValue(getVariable(toks[i+2], symbols)))
                    }
                    i++
                }
                if(toks[i+2] == "CONCAT") {

                    if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) == "PRINT STR CONCAT RND NUM") {
                        print(toks[i+1].substring(0,toks[i+1].length -1) + " " + randomNumber(toks[i+4]).substring(4) + "\"");
                        i++
                    } else if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) == "PRINT STR CONCAT ABS NUM") {
                        print(toks[i+1].substring(0,toks[i+1].length -1) + " " + getAbsoluteValue(toks[i+4]).substring(4) + "\"");
                        i++;
                    } else if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "PRINT STR CONCAT NUM") {
                        print(toks[i+1].substring(4,toks[i+1].length-1) + " " + toks[i+3].substring(4) + "\"");
                    } else if(toks[i+4] == "CONCAT") {
                        print(toks[i+1].substring(0,toks[i+1].length -1) + " " + getVariable(toks[i+3], symbols).substring(5, getVariable(toks[i+3], symbols).length -1) + " " + toks[i+5].substring(5));
                        i += 2
                    } else if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "PRINT STR CONCAT VAR"){
                        print(toks[i+1].substring(0,toks[i+1].length -1) + " " + getVariable(toks[i+3], symbols).substring(5));
                    }
                    i += 2;
                }
                if(toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "PRINT RND NUM") {
                    print(randomNumber(toks[i+2]));
                    i++;
                }
                i += 2
            } else
            if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS STR" ||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS NUM" ||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,4) == "VAR EQUALS EXPR"||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS VAR" ||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) + " " + toks[i+3] + toks[i+4].substring(0,3) == "VAR EQUALS VAR CONCAT STR" ||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) + " " + toks[i+3].substring(0,3) == "VAR EQUALS VAR NUM" ||

               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "VAR EQUALS ABS NUM" ||
               toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "VAR EQUALS RND NUM"){
                if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,4) == "VAR EQUALS EXPR") {
                    symbols = assignVariable(toks[i], evalExpression(toks[i+2]), symbols);
                } else if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) + " " + toks[i+3].substring(0,3) == "VAR EQUALS VAR NUM") {
                    symbols = assignVariable(toks[i], evalExpression("EXPR:"+getVariable(toks[i+2], symbols).substring(4) + " " + toks[i+3].substring(4)), symbols)
                    i++;
                }  else if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS STR" || toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS NUM"){
                    symbols = assignVariable(toks[i], toks[i+2], symbols);
                } else if(toks[i+3]== "CONCAT") {
                    symbols = assignVariable(toks[i], getVariable(toks[i+2], symbols).substring(0, getVariable(toks[i+2], symbols).length-1) + " " + toks[i+4].substring(5), symbols)
                    i += 2
                } else if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2].substring(0,3) == "VAR EQUALS VAR") {
                    symbols = assignVariable(toks[i], getVariable(toks[i+2], symbols), symbols);
                } else if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "VAR EQUALS ABS NUM") {
                    symbols = assignVariable(toks[i], getAbsoluteValue(toks[i+3]), symbols);
                    i++;
                } else if(toks[i].substring(0,3) + " " + toks[i+1] + " " + toks[i+2] + " " + toks[i+3].substring(0,3) == "VAR EQUALS RND NUM") {
                    symbols = assignVariable(toks[i], randomNumber(toks[i+3]), symbols);
                    i++;
                }
                i += 3
            } else
            if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2].substring(0,3) == "INPUT STR VAR") {
                symbols = input(toks[i+1], toks[i+2], symbols);
                i += 3
            } else
            if(toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF NUM EQEQ NUM THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF STR EQEQ STR THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF STR EQEQ NUM THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF NUM EQEQ STR THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF VAR EQEQ NUM THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) + " " + toks[i+5] == "IF VAR EQEQ ABS NUM THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3] + " " + toks[i+4].substring(0,3) + " " + toks[i+5] == "IF NUM EQEQ ABS NUM THEN" ||
               toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) + " " + toks[i+3] + " " + toks[i+4].substring(0,3) + " " + toks[i+5] == "IF ABS NUM EQEQ NUM THEN" ||
               toks[i] + " " + toks[i+1] + " " + toks[i+2].substring(0,3) + " " + toks[i+3] + " " + toks[i+4] + " " + toks[i+5].substring(0,3) + " " + toks[i+6] == "IF ABS NUM EQEQ ABS NUM THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,3) + " " + toks[i+4] == "IF VAR EQEQ STR THEN" ||
               toks[i] + " " + toks[i+1].substring(0,3) + " " + toks[i+2] + " " + toks[i+3].substring(0,4) + " " + toks[i+4] == "IF VAR EQEQ EXPR THEN"){
                if(toks[i+1].substring(4) == toks[i+3].substring(4) ||
                   getVariable(toks[i+1], symbols).substring(4) == toks[i+3].substring(4) ||
                   evalExpression(toks[i+1])       == toks[i+3].substring(4) ||
                   evalExpression(toks[i+3])       == toks[i+1].substring(4) ||
                   getVariable(toks[i+1], symbols) == evalExpression(toks[i+3]) ||
                   getVariable(toks[i+1], symbols) == getAbsoluteValue(toks[i+4]) ||
                   getAbsoluteValue(toks[i+2]).substring(4) == toks[i+4].substring(4) ||
                   getAbsoluteValue(toks[i+4]).substring(4) == toks[i+2].substring(4) ){
                       if(getVariable(toks[i+1], symbols) == getAbsoluteValue(toks[i+4]) || getAbsoluteValue(toks[i+2]).substring(4) == toks[i+4].substring(4) || getAbsoluteValue(toks[i+4]).substring(4) == toks[i+2].substring(4)) {
                           i++;
                       }
                    i += 5

                } else {
                    i += 5;
                    for (var x = i; x < toks.length; x++) {
                        i++;
                        if(toks[x] == "ELSE" || toks[x] == "END") {
                            break;
                        }
                    }
                }
            } else if(toks[i] + " " + toks[i+1].substring(0,3) == "REM STR") {
                i += 2;
            }
        } catch (e) {
            console.log(e);
            console.log("Type Error");
            process.exit()
        }

    }
}

module.exports = parser;
