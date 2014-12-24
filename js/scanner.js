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

Scanner.prototype.scan = function(){
    console.log("Main scanner function")
}