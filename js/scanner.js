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
    this.strings    = false; 

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
        var table = document.getElementById('output');
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
    this.curr_token = 'TK_EOF';
    this.curr_val = 'EOF';
    this.addToken();
    return;
}

// Handles numerical characters
Scanner.prototype.setDigit = function(character){
    if(this.curr_token === 'TK_REAL' || this.curr_token === 'TK_INT'){
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
    if((this.curr_token === 'TK_SINGLE_QUOTE' && character === "'") ||
       (this.curr_token === 'TK_DOUBLE_QUOTE' && character === '"')){
        this.strings = false; 
        this.buildString();
    }
    return; 
}

// Builds final string token
Scanner.prototype.buildString = function(){
    this.curr_token = 'TK_STRING';
    this.addToken();
    this.reset();
    return; 
}

// Handles newline characters
Scanner.prototype.setLine = function(ascii_value){
    this.addToken();
    this.reset();
    if(ascii_value === 10){
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
        if(this.toLower(this.curr_val) in keywords){
            this.curr_token = keywords[this.toLower(this.curr_val)];
        }
        else if(this.curr_val in operators){
            this.curr_token = operators[this.curr_val];
        }
    }
    return; 
}

// Handles operators
Scanner.prototype.setOperator = function(character){
    if(character === '.' && this.curr_token === 'TK_INT'){
        this.curr_token = 'TK_REAL';
        this.curr_val += character;
    }
    else if(character === '.' && this.curr_token === 'TK_END'){
        this.curr_token = 'TK_END_CODE';
        this.curr_val += character;
        this.addToken();
        this.reset();
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

    // Initalize scanner
    var scanner = new Scanner();

    // Begin scanning input text
    for(var i = 0; i < program.length; i++){
        //console.log(scanner.curr_token);

        // If we are not generating a string, do this
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
        else if( (scanner.curr_token != 'TK_SINGLE_QUOTE')  && (scanner.curr_token != 'TK_DOUBLE_QUOTE') &&
                ((ascii >= 97 && ascii <= 122) || (ascii >= 65 && ascii <= 90))) {
            scanner.setCharacter(character);
        }

        // Handle case for numbers
        else if( (ascii >= 48 && ascii <= 57) && (scanner.curr_token != 'TK_SINGLE_QUOTE')  
                    && (scanner.curr_token != 'TK_DOUBLE_QUOTE') ){
            scanner.setDigit(character);
        }

        // Handle case when we close the string
        else if(scanner.curr_token === 'TK_SINGLE_QUOTE' || scanner.curr_token === 'TK_DOUBLE_QUOTE'){
            scanner.setString(program[i]);
        }

        // Handle case for strings composed with single quote
        else if(ascii === 39){
            scanner.setToken('TK_SINGLE_QUOTE', character);
            // scanner.strings = true;
        }

        // Handle case for strings composed with double quotes
        else if(ascii === 34){
            scanner.setToken('TK_DOUBLE_QUOTE', character);
            // scanner.strings = true; 
        }

        // Handle case for operators
        else if(character in operators){
            scanner.setOperator(character);
        }
        
        scanner.curr_col += 1;
    }

    scanner.setEOF();
    console.log(scanner.tokens);

}
