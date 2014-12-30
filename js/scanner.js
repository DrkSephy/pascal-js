/************************************
* scanner.js
* MIT License (c) 2014 David Leonard
* drksephy.github.io
*************************************/

//'use strict';   

/**********************
* Scanner constructor *
**********************/

function Scanner(){
    this.tokens     = []
    this.curr_row   = 1
    this.curr_col   = 1 
    this.curr_token = ''
    this.curr_val   = ''; 

}

// Adds token to list
Scanner.prototype.addToken = function(){
    // console.log(this);
    if(this.curr_token){
        var token = {
            'token': this.curr_token,
            'value': this.curr_val,
            'row'  : this.curr_row,
            'col'  : this.curr_col
        }
        this.tokens.push(token);

        var table = document.getElementById('list');
        var node = document.createElement('tr');
        for(var prop in token){
            table.appendChild(node);
            var entry = node.appendChild(document.createElement('td'));
            entry.appendChild(document.createTextNode(token[prop]));
        }
    }



    return; 
}

// Resets values of token
Scanner.prototype.reset = function(){
    this.curr_val = '';
    this.curr_token = ''; 
    return; 
}

// Default printer method
Scanner.prototype.printer = function(){
    return; 
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


// Handles comments 
Scanner.prototype.setComment = function(char){
    // TODO
    return;
}

// Handles numerical characters
Scanner.prototype.setDigit = function(char){
    // TODO
    return;
}

// Handles newline characters
Scanner.prototype.setLine = function(ascii_value){
    this.addToken();
    this.reset();
    if(ascii_value == '10' || ascii_value == '13'){
        self.curr_row += 1;
        self.curr_col = 0;
    }
    return; 
}

// Handles whitespace character
Scanner.prototype.setSpace = function(ascii_value){
    this.addToken();
    this.reset();
    return; 
}


// Adds the last token into the list, sets new token
Scanner.prototype.setToken = function(token_type, character){
    this.addToken();
    this.reset();
    this.curr_token = token_type;
    this.curr_val += character; 
    return; 
}

// Handles characters
Scanner.prototype.setCharacter = function(character){
    if(this.curr_token != 'TK_IDENTIFIER'){
        this.setToken('TK_IDENTIFIER', character);
    }
    else{
        this.curr_val += character;
        if(this.curr_val in keywords){
            this.curr_token = keywords[this.curr_val];
        }
        else if(this.curr_val in operators){
            this.curr_token = operators[this.curr_val];
        }
    }
    return; 
}

// Handles operators
Scanner.prototype.setOperator = function(character){
    if(this.curr_val + character in operators){
        this.curr_val += character;
        // Handle all two-symbol operators
        if(this.curr_val in operators){
            this.curr_token = operators[this.curr_val];
        }
    }
    else{
        this.setToken(operators[character], character);
    }
    return;
}

// Main scanner function
function scan(){

    // Get input text from textarea
    var program = document.getElementById("program").value;
    document.getElementById("demo").innerHTML = program; 

    // Initalize scanner
    var scanner = new Scanner();

    // Begin scanning input text
    for(var i = 0; i < program.length; i++){
        var character = scanner.toUpper(program[i]);
        var ascii = scanner.toAscii(character);

        // Handle case for newline character
        if(ascii == '10'){
            scanner.setLine(ascii);
        }

        // Handle case for space
        else if(ascii == '32'){
            scanner.setSpace(ascii);
        }

        // Handle case for valid letters
        else if( (ascii >= 97 && ascii <= 122) || (ascii >= 65 && ascii <= 90) ){
            scanner.setCharacter(character);
        }

        // Handle case for operators
        else if(character in operators){
            scanner.setOperator(character);
        }

        scanner.curr_col += 1;

    }
    console.log(scanner.tokens);

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