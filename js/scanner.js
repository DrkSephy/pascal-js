/************************************
* scanner.js
* MIT License (c) 2014 David Leonard
* drksephy.github.io
*************************************/

'use strict';   

/**********************
* Scanner constructor *
**********************/

function Scanner(){
    this.tokens     = []
    this.curr_row   = 0
    this.curr_col   = 0 
    this.curr_token = ''

}

Scanner.prototype.generateToken = function(tokenName){

    var token = {
        'token': tokenName,
        'value': this.curr_token,
        'row'  : this.curr_row,
        'col'  : this.curr_col
    }

    return; 
}

// Default printer method
Scanner.prototype.printer = function(){
    console.log("Printer method");
}

// Retrieves value from table
Scanner.prototype.lookup = function(table, key){
    return table[key];
}

// Returns ascii value of character
Scanner.prototype.toAscii = function(char){
    return char.charCodeAt();
}

// Returns lowercase string
Scanner.prototype.toLower = function(char){
    return char.toLowerCase();
}

// Returns uppercase string
Scanner.prototype.toUpper = function(char){
    return char.toUpperCase();
}

// Main scanner function
function scan(){
    var program = document.getElementById("program").value;
    document.getElementById("demo").innerHTML = program;
    console.log(program); 
    var scanner = new Scanner();
    scanner.printer();
    for(var i = 0; i < program.length; i++){
        console.log(scanner.toAscii(program[i]));
    }

}

var keywords = {
    'BEGIN'     : 'TK_BEGIN',
    'BREAK'     : 'TK_BREAK',
    'CONST'     : 'TK_CONST',
    'DO'        : 'TK_DO',
    'DOWNTO'    : 'TK_DOWNTO',
    'ELSE'      : 'TK_ELSE',
    'END'       : 'TK_END',
    'END.'      : 'TK_END_CODE',
    'FOR'       : 'TK_FOR',
    'FUNCTION'  : 'TK_FUNCTION',
    'IDENTIFIER': 'TK_IDENTIFIER',
    'IF'        : 'TK_IF',
    'LABEL'     : 'TK_LABEL', 
    'PROGRAM'   : 'TK_PROGRAM',
    'REPEAT'    : 'TK_REPEAT',
    'STRING'    : 'TK_STRING', 
    'THEN'      : 'TK_THEN',
    'TO'        : 'TK_TO',
    'TYPE'      : 'TK_TYPE',
    'VAR'       : 'TK_VAR',
    'UNTIL'     : 'TK_UNTIL', 
    'WHILE'     : 'TK_WHILE',
    'INTEGER'   : 'TK_ID_INTEGER', 
    'REAL'      : 'TK_ID_REAL',
    'CHAR'      : 'TK_ID_CHAR',
    'BOOLEAN'   : 'TK_ID_BOOLEAN',
    'OF'        : 'TK_OF'
}

var operators = {
    '+'         : 'TK_PLUS',
    '-'         : 'TK_MINUS',
    '*'         : 'TK_MULT',
    '/'         : 'TK_DIV_FLOAT',
    'DIV'       : 'TK_DIV',
    'MOD'       : 'TK_MOD',
    ':'         : 'TK_COLON',
    '='         : 'TK_EQUALS',
    ':='        : 'TK_ASSIGNMENT',
    '>'         : 'TK_GREATER',
    '<'         : 'TK_LESS',
    '>='        : 'TK_GREATER_EQUALS',
    '<='        : 'TK_LESS_EQUALS',
    '!'         : 'TK_EXCLAMATION',
    '!='        : 'TK_NOT_EQUALS',
    'AND'       : 'TK_AND',
    'XOR'       : 'TK_XOR',
    'OR'        : 'TK_OR',
    'NOT'       : 'TK_NOT',
    ';'         : 'TK_SEMICOLON',
    '('         : 'TK_OPEN_PARENTHESIS',
    ')'         : 'TK_CLOSE_PARENTHESIS',
    '\''        : 'TK_QUOTE',
    '(*'        : 'TK_BEGIN_COMMENT',
    '*)'        : 'TK_END_COMMENT',
    ','         : 'TK_COMMA',
    '~'         : 'TK_RANGE',
    'ARRAY'     : 'TK_ARRAY',
    '['         : 'TK_OPEN_BRACKET',
    ']'         : 'TK_CLOSE_BRACKET'
}

var SYSTEM = {
    'WRITELN'   : 'TK_WRITELN',
    'ABS'       : 'TK_ABS'
}