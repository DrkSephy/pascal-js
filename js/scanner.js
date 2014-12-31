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
    this.tokens     = [];
    this.curr_row   = 1 ;
    this.curr_col   = 1 ;
    this.curr_token = '';
    this.curr_val   = ''; 
    this.comments   = false; 

}

// Adds token to list
Scanner.prototype.addToken = function(){

    if(this.curr_token){
        var token = {
            'token': this.curr_token,
            'value': this.curr_val,
            'row'  : this.curr_row,
            'col'  : this.curr_col
        }
        this.tokens.push(token);

        // TODO: Use bootstrap to render these tables
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


// Returns ascii value of character
Scanner.prototype.toAscii = function(character){
    return character.charCodeAt();
}

// Returns lowercase string
Scanner.prototype.toLower = function(character){
    return character.toLowerCase();
}

// Returns uppercase string
Scanner.prototype.toUpper = function(character){
    return character.toUpperCase();
}

// Handles comments 
Scanner.prototype.setComment = function(character){
    // TODO
    return;
}

// Handles EOF
Scanner.prototype.setEOF = function(character){
    // TODO
    return;
}

// Handles numerical characters
Scanner.prototype.setDigit = function(character){
    if(this.curr_token == 'TK_REAL' || this.curr_token == 'TK_INT'){
        this.curr_val += character;
    }
    else{
        this.setToken('TK_INT', character);
    }
    return;
}

// Handles strings, builds string up
Scanner.prototype.setString = function(character){
    this.curr_val += character;
    if((this.curr_token == 'TK_SINGLE_QUOTE' && character == "'") ||
       (this.curr_token == 'TK_DOUBLE_QUOTE' && character == '"')){
        this.buildString();
    }
    return; 
}

// Builds final string token
Scanner.prototype.buildString = function(){
    this.curr_token = 'TK_STRING';
    this.addToken();
    this.reset();
}

// Handles newline characters
Scanner.prototype.setLine = function(ascii_value){
    this.addToken();
    this.reset();
    if(ascii_value == '10'){
        this.curr_row += 1;
        this.curr_col = 0;
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
    if(character == '.' && this.curr_token == 'TK_INT'){
        console.log("Hello");
        this.curr_token = 'TK_REAL';
        this.curr_val += character;
    }

    else if(this.curr_val + character in operators){
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

        // Handle case when we close the string
        if(scanner.curr_token == 'TK_SINGLE_QUOTE' || scanner.curr_token == 'TK_DOUBLE_QUOTE'){
            scanner.setString(character);
        }

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

        // Handle case for numbers
        else if(ascii >= 48 && ascii <= 57){
            scanner.setDigit(character);
        }

        // Handle case for strings composed with single quote
        else if(ascii == 39){
            scanner.setToken('TK_SINGLE_QUOTE', character);
        }

        // Handle case for strings composed with double quotes
        else if(ascii == 34){
            scanner.setToken('TK_DOUBLE_QUOTE', character);
        }

        scanner.curr_col += 1;

    }
    console.log(scanner.tokens);

}

var keywords = {
    'begin'     : 'TK_BEGIN',
    'break'     : 'TK_BREAK',
    'const'     : 'TK_CONST',
    'do'        : 'TK_DO',
    'downto'    : 'TK_DOWNTO',
    'else'      : 'TK_ELSE',
    'end'       : 'TK_END',
    'end.'      : 'TK_END_CODE',
    'for'       : 'TK_FOR',
    'function'  : 'TK_FUNCTION',
    'identifier': 'TK_IDENTIFIER',
    'if'        : 'TK_IF',
    'label'     : 'TK_LABEL', 
    'program'   : 'TK_PROGRAM',
    'repeat'    : 'TK_REPEAT',
    'string'    : 'TK_STRING', 
    'then'      : 'TK_THEN',
    'to'        : 'TK_TO',
    'type'      : 'TK_TYPE',
    'var'       : 'TK_VAR',
    'until'     : 'TK_UNTIL', 
    'while'     : 'TK_WHILE',
    'integer'   : 'TK_ID_INTEGER', 
    'real'      : 'TK_ID_REAL',
    'char'      : 'TK_ID_CHAR',
    'boolean'   : 'TK_ID_BOOLEAN',
    'of'        : 'TK_OF'
}

var operators = {
    '+'         : 'TK_PLUS',
    '-'         : 'TK_MINUS',
    '*'         : 'TK_MULT',
    '/'         : 'TK_DIV_FLOAT',
    'div'       : 'TK_DIV',
    'mod'       : 'TK_MOD',
    ':'         : 'TK_COLON',
    '='         : 'TK_EQUALS',
    ':='        : 'TK_ASSIGNMENT',
    '>'         : 'TK_GREATER',
    '<'         : 'TK_LESS',
    '.'         : 'TK_DOT',
    '>='        : 'TK_GREATER_EQUALS',
    '<='        : 'TK_LESS_EQUALS',
    '!'         : 'TK_EXCLAMATION',
    '!='        : 'TK_NOT_EQUALS',
    'and'       : 'TK_AND',
    'xor'       : 'TK_XOR',
    'or'        : 'TK_OR',
    'not'       : 'TK_NOT',
    ';'         : 'TK_SEMICOLON',
    '('         : 'TK_OPEN_PARENTHESIS',
    ')'         : 'TK_CLOSE_PARENTHESIS',
    '\''        : 'TK_SINGLE_QUOTE',
    '"'         : 'TK_DOUBLE_QUOTE',
    '(*'        : 'TK_BEGIN_COMMENT',
    '*)'        : 'TK_END_COMMENT',
    ','         : 'TK_COMMA',
    '~'         : 'TK_RANGE',
    'array'     : 'TK_ARRAY',
    '['         : 'TK_OPEN_BRACKET',
    ']'         : 'TK_CLOSE_BRACKET'
}

var SYSTEM = {
    'writeln'   : 'TK_WRITELN',
    'abs'       : 'TK_ABS'
}