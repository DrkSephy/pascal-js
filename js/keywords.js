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