'use strict'; 

(function() {
    var scanner = new Scanner();
    var program = "program assignment; var a, b, c: integer; BEGIN a := 8 * 2 ; b := a * 2 ; c := b / 7 ; END. "
    scanner.scan(program)
    console.log(scanner.tokens);
})();