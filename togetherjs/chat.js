// MAJOR TO DO:
     
    // MODAL FUNCTIONALITY  
        /* 
        * Change Modal screen pop up to show after alerts
        * Connect Together.js functionality.
        * Add functionality for the confirm/cancel buttons in the modal
        */
    // ADD MIDDLE SECTION / PART 2 -> LOOK AT PAGE 3.3
    // ADD MULTIVARIABLE EXPRESSIONS
    // WRITE ERROR CHECKING FOR "TEXT"
        /*
        * Add on any possible errors as I go along
        */
    // ADDING SCROLLBAR FOR "CHAT"
    // MAKE CODE SHORTER
    // RENAME THIS FILE TO MAKE SENSE
    // RENAME KEY VARIABLE WITH BETTER NAME
    // ORGANIZE FUNCTIONS
/* 
*
*TO DO: CSS For adding in a scroll bar in the "TEXT"
.dropdown-content {
  max-height: 13em;
  overflow: auto;
}
*/

let combination = ['A', 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J', " "];


let keys = {} ;

let trial_num = 0;

let seed = document.cookie;


$(function () {

    randomize(seed);
    // Do not remove, for algorithm checking purposes
    console.log(combination);

    $("div#topHalf.container").on("click", "button.is-light", function (event) {keyboard(event)});
    $("div#bottomHalf.container").on("click", "button.is-light#submit_answer", function (event) {
        //Line 48 has to be put here to activate the mini-window
        $("div#modal").addClass("is-active");
        submit(event)});
    $("div#modal").on("click", "button#close_modal", function (event) {
        $("div#modal").removeClass("is-active")
    });
});



function submit(event) {

    let answers = new Array();
    for (let i = 0 ; i < 9 ; i++){
        answers[i] = $( "textarea#" + i + ".textarea").val();
        
        //Checks for answers that are not single digits
        if (answers[i].length != 1){
            alert("Hey, put in a serious answer you joker!");
            return;
        }

        //Checks for answers that are not numbers
        try {
            parseInt(answers[i])
          }
          catch(err) {
            alert("Hey, put in a number you joker!");
            return;
          }
    
        //Checks for if the answer is correct or not
      let num = parseInt(answers[i]);
      switch(i){
          case 0:
              if (combination[num] == "A"){
                  continue;
              } else {
                alert("you're wrong");
                return;
            }
          case 1:
            if (combination[num] == "B"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 2:
            if (combination[num] == "C"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 3:
            if (combination[num] == "D"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 4:
            if (combination[num] == "E"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 5:
            if (combination[num] == "F"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 6:
            if (combination[num] == "G"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 7:
            if (combination[num] == "H"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 8:
            if (combination[num] == "I"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          case 9:
            if (combination[num] == "J"){
                continue;
            } else {
                alert("you're wrong");
                return;
            }
          default:
              break;
      }
    }

    alert("You're correct!");


}

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
        // case "multiplication":
        //     $( "p#textbar" ).text( textbar_content +  "x");
        //     break;
        // case "division":
        //     $( "p#textbar" ).text( textbar_content +  "/");
        //     break;
        case "delete":
            let length = textbar_content.length-1;
            let short_string = textbar_content.substring(0, length);
            $( "p#textbar" ).text(short_string);
            break;
        case "Send":
            answer(textbar_content.trim());
            $( "p#textbar").html("&nbsp;");
            break;
        default:
      }
}

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
    let expression_num = 0;

    //Breaks up the textbar string into seperate string values 
    for (let i = 0 ; i < textbar_content.length ; i++){
        let char = textbar_content.charAt(i);
        switch (char) {
            case "+":
                expression = "+";
                position++;
                expression_num++;
                break;
            case "-":
                expression = "-";
                position++;
                expression_num++;
                break;
            // case "x":
            //     expression = "x";
            //     position++;
            //     break;
            // case "/":
            //     expression = "/";
            //     position++;
            //     break;
            default:
                if (position == 0) {
                    first_term += char
                } else {
                    second_term += char
                }
        }
        
    }

    if(expression == "" || second_term == "" || expression_num > 1){
        alert("Please write a correct full expression");
        $( "p#textbar").html("&nbsp;");
        return;
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
        // case "x":
        //     result += first_num * second_num
        //     break;
        // case "/":
        //     result += first_num / second_num
        //     break;
        default:
            break;
        }
    
    answer = retranslate(result);
    trial_num++;
    $( "p#text" ).append("<p>Trial <span id='num'>"+ trial_num + "</span></p>");
    $( "p#text" ).append("<p>You: " + textbar_content + "</p>");
    $( "p#text" ).append("<p>Computer: " + textbar_content + " = " + answer + "</p>");

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
function randomize (seed) {

    // Shuffles letters in the array using a seed to create the encryption formula
    for (let i = 0; i < 10 ; i++){
        seed = (seed + 7)  % 11 ;
        let temp = combination[seed];
        combination[seed] = combination[i]
        combination[i] = temp 
        document.cookie =　"";
    }

    // Makes a dictionaray that holds the decryption formula
    for(let i = 0; i < 10 ; i++){
      let char = combination[i];
      keys[char] = i;
    }

}
