"use strict";

const fs = require('fs');

let
tokens = [],
num_stack = [],
symbols = {};

function _lexer(filecontents) {
    console.log("\n Lexing... \n");
    let
    tok = "",
    state = 0,
    isexpr = 0,
    varStarted = 0,
    _var = "",
    string = "",
    expr = "";


    filecontents.push("<EOF>")

    for (var i = 0; i < filecontents.length; i++) {
        tok += filecontents[i];

        if(tok == " ") {
            if(_var.length > 4) {
                if(_var != "") {
                    tokens.push("VAR:" + _var);
                    _var = "";
                    varStarted = 0;
                }
            }
            if(state == 0) {
                tok = "";
            } else {
                tok = " ";
            }

        } else if(tok == "\n" || tok == "<EOF>") {
            if(expr != "" && isexpr == 1) {
                tokens.push("EXPR:"+expr)
                expr = ""
            }
            if(expr != "" && isexpr == 0) {
                tokens.push("NUM:"+expr)
                expr = ""
            }
            if(_var != "") {
                tokens.push("VAR:" + _var);
                _var = "";
                varStarted = 0;
            }
            tok = "";
        } else if(tok == ";" && state == 0) {
            if(_var != "") {
                tokens.push("VAR:" + _var);
                _var = "";
                varStarted = 0;
            }
            tokens.push("CONCAT");
            tok = ""
        } else if(tok == "=" && state == 0) {
            if(expr != "" && isexpr == 0) {
               tokens.push("NUM:"+expr)
               expr = ""
            }
            if(_var != "") {
                tokens.push("VAR:" + _var);
                _var = "";
                varStarted = 0;
            }
            if(tokens[tokens.length-1] == "EQUALS") {
                tokens[tokens.length-1] = "EQEQ"
            } else {
                tokens.push("EQUALS");
            }
            tok = "";

        } else if(tok.toUpperCase() == "VAR" && state == 0) {
            varStarted = 1;
            _var += tok;
            tok = ""
        } else if(varStarted == 1) {
            if(tok == "<" || tok == ">") {
                if(_var != "") {
                    tokens.push("VAR:" + _var);
                    _var = "";
                    varStarted = 0;
                }
            }
            _var += tok;
            tok = ""
        } else if(tok.toUpperCase() == "PRINT") {
            tokens.push("PRINT")
            tok = "";
        } else if(tok.toUpperCase() == "INPUT") {
            tokens.push("INPUT")
            tok = "";
        } else if(tok.toUpperCase() == "IF") {
            tokens.push("IF")
            tok = "";
        } else if(tok.toUpperCase() == "END") {
            tokens.push("END")
            tok = "";
        } else if(tok.toUpperCase() == "IMPORT") {
            tokens.push("IMPORT")
            tok = "";
        } else if(tok.toUpperCase() == "THEN") {
            if(expr != "" && isexpr == 1) {
                tokens.push("EXPR:"+expr)
                expr = ""
            }
            if(expr != "" && isexpr == 0) {
                tokens.push("NUM:"+expr)
                expr = ""
            }

            tokens.push("THEN")
            tok = "";
        } else if(tok.toUpperCase() == "ELSE") {
            tokens.push("ELSE")
            tok = "";
        } else if(tok.toUpperCase() == "ABS") {
            tokens.push("ABS")
            tok = "";
        } else if(tok.toUpperCase() == "RND") {
            tokens.push("RND")
            tok = "";
        } else if(tok.toUpperCase() == "REM") {
            tokens.push("REM")
            tok = "";
        } else if(tok.toUpperCase() == "PAUSE") {
            tokens.push("PAUSE");
            tok = "";
        } else if(tok.match('[0-9]')) {
            if(state == 0) {
                expr += tok;
                tok = "";
            } else if(state == 1) {
                string += tok;
                tok = ""
            }
        } else if(tok.match('[-()+\*/.]')){
            if(state == 0) {
                if(_var != "") {
                    tokens.push("VAR:" + _var);
                    _var = "";
                    varStarted = 0;
                }
                if(expr != "") {
                    isexpr = 1;
                    expr += tok;
                    tok = "";
                }
            } else if(state == 1) {
                string += tok;
                tok = ""
            }
        } else if(tok == "\t") {
            tok = ""
        } else if(tok == "\"" || tok == " \"") {
            if(state == 0) {
                state = 1;
            } else if(state == 1) {
                tokens.push("STR:"+string+"\"")
                string = "";
                state = 0;
                tok = "";
            }
         } else if(state == 1) {
            string += tok;
            tok = "";
        }
    }
    return tokens
}

function lexer(filecontents) {
    _lexer(filecontents);
    if(tokens.includes('IMPORT')) {
        const occurences = tokens.reduce((a, e, i) => (e === "IMPORT") ? a.concat(i) : a, []);
        let fc = filecontents;
        for (var occurence of occurences) {
            let importcontents = fs.readFileSync(tokens[occurence+1].substring(5, tokens[occurence+1].length - 1), 'utf8').split('').filter(a => a !== '\r');
            importcontents.push.apply(importcontents, fc);
            fc = importcontents;
         }

        const x = fc.toString().split('\n');


        loop1:
        while(true) {
            for (var i = 0; i < x.length; i++) {
                if(x[i].indexOf('I,M,P,O,R,T,') > -1) {
                    x.splice(i, 1);
                    continue loop1
                }
            }
            break
        }

        fc = x.join('\n').split(',');


        tokens = [];
        num_stack = [];
        symbols = {};

        _lexer(fc);

        console.log(tokens);

        return tokens
    } else {
        return tokens;
    }
}

module.exports.lexer = lexer;
module.exports.symbols = symbols
