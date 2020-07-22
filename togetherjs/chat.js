// MAJOR TO DO:
    // MODAL FUNCTIONALITY  
        /* 
        * Connect Together.js functionality.
        * Add functionality for the confirm/cancel buttons in the modal to work with clicking and together.js
    // WRITE ERROR CHECKING 
        /*
        * Check for inputs that arent numbers in the middle section 
        * Make sure that the popup only shows up AFTER the number changes in the modal
        * Will update twice for wrong expression? Why?
        *   -Do not know what's causing this
        */
    // COSMETIC
        /*
        * Change middle portion from textboxes to plaintext after someone clicks the button <- Can not
        * MAKE CODE SHORTER
        * RENAME THIS FILE TO MAKE SENSE
        * RENAME KEY VARIABLE WITH BETTER NAME
        * ORGANIZE FUNCTIONS
        */ 




let combination = ['A', 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J'];

let hasSeed = false;

let keys = {} ;

let trial_num = 1;

let has_guessed = false;

//Prevented double backspacing
let backspace = false;

//Express counts expression symbols
let express = 0;

let expressdouble = false;

let group = 1;

let members = 0;

let shown_up = true;

// let modalnum = 0;


$(function () {

    // $("section#main2.section").hide();

    $("div#l2nmodal").on("click", "button#submit_seed", function (event) {
        console.log("Test 0");
        seed();

        $( "div#l2nmodal_seed_content" ).replaceWith( `<div class="modal-content" style="background-color:white;" id="l2nmodal_instructions_content">
        <p id="title">
          Letters to Numbers
        </p>
        <p id="l2nmodal_Subtitle">
          How To Play
        </p>
  
        <div id="l2nmodal_Instructions">
          <ul>
            <li>Try to guess the number value of each letter in 10 tries!</li>
            <li>Step 1: Enter a sentence equation into the calculator!</li>
            <li>Step 2: Try to guess a single letter value!</li>
            <li>Step 3: Repeat 1-2 or try to guess the final code!</li>
          </ul>
        </div>
      </div>
      <div class="container">
        <button class="button" id="submit_start"><span id="button_text">Start</span></button>
      </div>` );
      $( "#submit_seed" ).remove();
        hasSeed=true;
    });

    $("div#l2nmodal").on("click", "#submit_start", function (event) {
        $("div#l2nmodal").removeClass("is-active");
        shown_up = true;
    });
    
    $("div#l2nmodal2").on("click", "button#l2n_return", function (event) {
        $("div#l2nmodal2").removeClass("is-active");
        console.log("hello");
    });
    $("div#l2nmodal").on("click", "#l2n_return", function (event) {
        $("div#l2nmodal").removeClass("is-active");
    });
    
    // TogetherJS sends the message to the other web page 
    // The functions have to be repeated again so that the current webpage also updates
    $("div#l2n_left_half").on("click", "#l2n_equation_send", function (event) {
        equation();
    })

    $("div#l2n_left_half").on("click", "#l2n_guess_send", function (event) {
        checkguess();
    });

    $("#l2n_bottom").on("click", "#l2n_submit_final", function (event) {
       submit();  
    });

});
    

// Takes in submitted seed , hides seed portion and puts in the first 2 steps of the excercise
function seed(){
    let submit_seed = $("textarea#seed").val();
    if(submit_seed == "") {
        randomize(Math.floor(Math.random() * 10000));
        let z = combination;
        if (TogetherJS.running) {
            TogetherJS.send({type: "randomseed", combo: z, key: keys});
        }
        return;
    }
    try {
        parseInt(submit_seed)
    } catch(err) {
        alert("Please input a number in the range of 0-50");
        $("textarea#seed").val("");
        return;
      }

    if(submit_seed < 0){
        alert("Please input an integer > 0 ");
        $("textarea#seed").val("");
        return;
    }

    randomize(submit_seed);
    
}


// Final Portion
function submit() {
    let answers = new Array();
    for (let i = 0 ; i < 9 ; i++){
        answers[i] = $("input" + "#l2n_bottom_text_"+i).val();
        
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
                incorrect();
                return;
            }
          case 1:
            if (combination[num] == "B"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 2:
            if (combination[num] == "C"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 3:
            if (combination[num] == "D"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 4:
            if (combination[num] == "E"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 5:
            if (combination[num] == "F"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 6:
            if (combination[num] == "G"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 7:
            if (combination[num] == "H"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 8:
            if (combination[num] == "I"){
                continue;
            } else {
                incorrect();
                return;
            }
          case 9:
            if (combination[num] == "J"){
                continue;
            } else {
                incorrect();
                return;
            }
          default:
              break;
      }
    }
    correct();

}

function correct(){$("div#l2nmodal").addClass("is-active");
$( "#submit_start" ).remove();
let turn_string = "";
if(trial_num == 1) {
    turn_string = "turn!";
} else {
    turn_string = "turns!";
}
$( "#l2nmodal_instructions_content" ).replaceWith(
    `<div class="modal-content" style="background-color:white;" id="l2n_final_modal">
  <p id="title">
   CONGRATS!
  </p>
  <p id ="subtitle">
  Nice job, team! 
  <br>
  You solved the puzzle in `+ trial_num +`  `+ turn_string + `
  </p>
</div>
</div>` );
$( "#l2n_try_again_modal" ).replaceWith( `
<div class="modal-content" style="background-color:white;" id="l2n_final_modal">
  <p id="title">
   CONGRATS!
  </p>
  <p id ="subtitle">
  Nice job, team! 
  <br>
  You solved the puzzle in `+ trial_num +`  `+ turn_string + `
  </p>
</div>
</div>`);
$( "#l2n_return" ).remove();
;}

function incorrect(){ 
$("div#l2nmodal").addClass("is-active");
$( "#submit_start" ).remove();
$( "#l2nmodal_instructions_content" ).replaceWith( `
<div class="modal-content" style="background-color:white;" id="l2n_try_again_modal">
  <p id="title">
    NOT QUITE,
    <br>
    TRY AGAIN!
  </p>
</div>
<button class="button" id="l2n_return"><span id="button_text">Return</span></button>
</div>` );}

//Handles all actions on the top half of the Excercise webpage
function equation() {

    let textbar_content =  $("#l2n_step1_text").val();

    //Makes sure user follows step 2 before doing step 1 again
    if ( !has_guessed && trial_num != 1){
        if (TogetherJS.running) {
            TogetherJS.send({type: "alert"});
        }
        $( "#l2n_step1_text").val("");
        return;
    }
            answer(textbar_content.trim());
            $( "#l2n_step1_text").val("");
            return;
        
}

/*
* Does the work for the chat in step 1
*/
function answer(textbar_content){

    console.log(textbar_content);

    let position = 0;
    let answer  = "";
    let terms = new Array();
    let expressions = new Array();

    //Breaks up the textarea string into seperate string values 
    for (let i = 0 ; i < textbar_content.length ; i++){
        let char = textbar_content.charAt(i).toUpperCase();

        if((i == 0 && (char == "+" || char == "-")) || express >= 2){
            alert("Please write a correct full expression");
            $("#l2n_step1_text").val("");
            express = 0;
            return;
        }

        switch (char) {
            case "+":
                expressions.push("+");
                position++;
                express++;
                break;
            case "-":
                expressions.push("-");
                position++;
                express++;
                break;
            default:
                if(terms[position] === null || terms[position] == undefined){
                    terms[position] = char;
                    express = 0;
                }else{
                    terms[position] += char;
                    express = 0;
                }
        }
        
    }

    if(expressions.length == 0 || expressions.length != terms.length-1 || terms.length == 0 ){
        alert("Please write a correct full expression");
        $("#l2n_step1_text").val("");
        return;
    }

    
    for(let i = 0 ; i < terms.length-1 ; i++){
     let result = "";
     let first_num = translate(terms[i]);
     let second_num = translate(terms[i+1])
     let operation = expressions[i];

    switch(operation) {
        case "+":
            result += first_num + second_num
            break;
        case "-":
            result += first_num - second_num
            break;
        default:
            break;
        }
    
        terms[i+1] = retranslate(result);

    }
  
    let index = terms.length - 1;
    answer = terms[index];
    console.log(textbar_content);
    console.log(trial_num);
    $( "td#equation_"+ trial_num ).append(textbar_content + " = " + answer);
    has_guessed = false;

}


function checkguess(){
    let hypothesis =  $("#l2n_step2_text").val();
    $("#l2n_step2_text").val("");
    $("td#hypothesis_"+trial_num).append(hypothesis);
    let letter = hypothesis[0].toUpperCase();
    let number = hypothesis[2];
    console.log(letter);
    console.log(number);
    if(keys[letter] == number){
        $("td#feedback_" + trial_num).append("TRUE");
    } else {
        $("td#feedback_" + trial_num).append("FALSE")
    }  
    has_guessed = true;
    if(trial_num == 10) {
        $("#l2n_equation_send").remove();
        $("#l2n_guess_send").remove();
    }
    trial_num++;
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
    Math.seedrandom(seed+"");
    for (let i = 0; i < 10 ; i++){
        let place = Math.floor(Math.random() * 9);
        let temp = combination[place];
        combination[place] = combination[i]
        combination[i] = temp 
    }

    // Makes a dictionaray that holds the decryption formula
    for(let i = 0; i < 10 ; i++){
      let char = combination[i];
      keys[char] = i;
    }

    $("section#main2.section").show();
    $("section#main1.section").hide();
    $("div#bottomHalf.container").hide();

    //LEFT FOR TESTING PURPOSES
    console.log(combination);

}


// RECIEVES A MESSAGE FROM ANOTHER WEBAGE ON WHAT TO DO 

// Does not work for checking users in a channel
// TogetherJS.hub.on("togetherjs.init-connection", function (msg) {
//     if (! msg.sameUrl) {
//         return;
//     }
//     console.log("hello");
//     group = msg.peerCount;
// });
// if (TogetherJs.running) {
//     TogetherJS.hub.checkForUsersOnChannel;
// }


TogetherJS.hub.on("randomseed", function (msg) {
    if (! msg.sameUrl) {
      return;
    }

    combination = msg.combo;
    keys = msg.key;
    console.log(combination);
    $("section#main2.section").show();
    $("section#main1.section").hide();
    $("div#bottomHalf.container").hide();
    
  });
  

  TogetherJS.hub.on("submit", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    submit();
  }); 

  TogetherJS.hub.on("alert", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    alert("Please guess first before asking the computer a question");
    return;
  }); 


// Makes sure to synch other pages if players come in to load late
  TogetherJS.hub.on("togetherjs.hello", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    TogetherJS.send({
        type: "randomseed",
        combo: combination,
        key: keys,
    });
    // `<table class="table is-bordered is-striped is-narrow is-fullwidth" id="l2n_results">`
    // `</table>`
    // let current_table =  $("#l2n_results").html() ;

    TogetherJS.send({
        type: "standardize",
        trialnum: trial_num,
        current_table : current_table,
        hasguessed: has_guessed,
    });

});

TogetherJS.hub.on("standardize", function (msg) {
    if (! msg.sameUrl) {
        return;
    }

  trial_num = msg.trialnum;
  has_guessed = msg.hasguessed;
//   $("#l2n_results").replaceWith(msg.current_table);

});


