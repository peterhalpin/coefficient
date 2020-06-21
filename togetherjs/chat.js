// MAJOR TO DO:
    // WRITE ERROR CHECKING FOR "TEXT"
        /*
        * Possible Errors
        *  - Multiple expression markers put one right after each other
        *  - No expression markers 
        *  - Worrying about irrational numbers 
        * Either try/catch for the conversion parts instead of error checking?
        * 
        */
    // ASK ABOUT SPECIFIC FUNCTIONALITY OF EXAMPLE EXPRESSIONS
        /*
        * Does peter want to have multi-variable expressions?
        * Ask him if I should include division properties because of the possible issue of irrational numbers
        * I hardly doubt students would do that but I'll ask anyway 
        * If he does want multi-variable expressions I'll have to store the numbers in arrays and the expressions in arrays
        * /
    // SUBMIT FUNCTIONALITY  
        /* 
        * Function for collecting answers and checking them against the combination
        * Submit button pops up a screen asking if both players are ok 
        *   - If so , then it will submit and show if they're correct or not
        *   - It will stay on the small window until a user clicks out/cancels
        */
    // RENAME THIS FILE TO MAKE SENSE

let combination = ['A', 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' ];

//TO DO: Rename keys to be more clear
    /*
    * Made to hold the "number" value of the letters 
    */
let keys = {} ;


$(function () {

    randomize();
    $("#submit").on("click", function (event) { redirect(); });
    $("div#topHalf.container").on("click", "button.is-light", function (event) {keyboard(event)});
});

/* 
*
*TO DO: CSS For adding in a scroll bar later
.dropdown-content {
  max-height: 13em;
  overflow: auto;
}
*/

//Handles all actions on the top half of the Excercise webpage

function keyboard(event) {
    let id = event.currentTarget.id;
    let textbar_content =  $("p#textbar").text();

    //Determines which button is pressed and changes the text bar accordingly
    switch(id) {
        case "A":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "B":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "C":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "D":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "E":
            $( "p#textbar" ).text( textbar_content +  id);
            break;
        case "F":
            $( "p#textbar" ).text( textbar_content +  id);
            break;
        case "G":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "H":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "I":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "J":
            $( "p#textbar" ).text( textbar_content +  id);
          break;
        case "addition":
            $( "p#textbar" ).text( textbar_content +  "+");
          break;
        case "subtraction":
            $( "p#textbar" ).text( textbar_content +  "-");
            break;
        case "multiplication":
            $( "p#textbar" ).text( textbar_content +  "x");
            break;
        case "division":
            $( "p#textbar" ).text( textbar_content +  "/");
            break;
        case "delete":
            let length = textbar_content.length-1;
            let short_string = textbar_content.substring(0, length);
            $( "p#textbar" ).text(short_string);
            break;
        case "Send":
            answer(textbar_content.trim());
            break;
        default:
      }
}

//TO DO: ERROR CHECK
/*
* Takes in a string and returns nothing
* Gives the user the computer answer 
*/
function answer(textbar_content){
    // Assuming that only 2 variables are given 
    // If that isn't the case, will change the code 

    let position = 0;
    let answer  = "";
    let first_term = "";
    let expression = "";
    let second_term = "";

    //Breaks up the textbar string into seperate string values 
    for (let i = 0 ; i < textbar_content.length ; i++){
        let char = textbar_content.charAt(i);
        switch (char) {
            case "+":
                expression = "+";
                position++;
                break;
            case "-":
                expression = "-";
                position++;
                break;
            case "x":
                expression = "x";
                position++;
                break;
            case "/":
                expression = "/";
                position++;
                break;
            default:
                if (position == 0) {
                    first_term += char
                } else {
                    second_term += char
                }
        }
        
    }

    let first_num = translate(first_term);
    let second_num = translate (second_term);
    let result = ""; 

    switch(expression) {
        case "+":
            result += first_num + second_num
            break;
        case "-":
            result += first_num - second_num
            break;
        case "x":
            result += first_num * second_num
            break;
        case "/":
            result += first_num / second_num
            break;
        default:
            break;
        }
    
    answer = retranslate(result);
    $( "p#text" ).text(textbar_content + " = " + answer);

    }


// Encrypts the number into a string
function retranslate(result) {
    let answer = ""
    for (let i = 0 ; i < result.length ; i++) {
        let char = result.charAt(i);
        if(char == "-" || char === "." ){
            answer += char;
            continue;
        } else {
        let num = parseInt(char);
        answer += combination[num];
        }
    }
    return answer;
}

// Decrypts the string into a number
function translate(term) {
    let num = "";

    for(let i = 0 ; i < term.length ; i++ ){
        let char = term.charAt(i);
        num += keys[char];
    }

    return parseInt(num);
}

// Creates the Encryption/Decryption system for the excercise
function randomize () {

    // Shuffles letters in the array, creating the encryption formula
    for (let i = 0; i < 10 ; i++){
        let index = Math.floor( Math.random() * 10 );
        let temp = combination[index];
        combination[index] = combination[i]
        combination[i] = temp 
    }

    // Makes a dictionaray that holds the decryption formula
    for(let i = 0; i < 10 ; i++){
      let char = combination[i];
      keys[char] = i;
    }

}
