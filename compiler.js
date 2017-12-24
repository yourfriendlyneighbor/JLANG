"use strict";

const
fs = require('fs'),
filename = process.argv[2],
lexer = require('./commands/lexer'),
parser = require('./commands/parser');

if(!filename || !filename.substr(filename.length - 6).match('.jlang') && !fs.existsSync(__dirname + '/' + filename)) {
    console.log('Please enter a valid filename');
    process.exit()
}

const filecontents = fs.readFileSync(__dirname +'/' + filename, 'utf8').split('').filter(a => a !== '\r');


const lexed = lexer.lexer(filecontents);
const symbols = lexer.symbols;
parser(lexed, symbols)

//nexe compiler.js
