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

let trial_num = 0;

let has_guessed = false;

let backspace = false;

let express = 0;

let expressdouble = false;

let group = 1;

let members = 0;


$(function () {

    // $("section#main2.section").hide();

    $("body").on("click", "button#submit_seed", function (event) {
        seed();
        if (TogetherJS.running) {
            TogetherJS.send({type: "modalinactive"});
        };
        hasSeed=true;
        $("div#modal").removeClass("is-active");
    });

    // TogetherJS sends the message to the other web page 
    // The functions have to be repeated again so that the current webpage also updates

    $("div#topHalf.container").on("click", "button.is-light", function (event) {
        if (TogetherJS.running) {
            TogetherJS.send({type: "keyboard", event: event.currentTarget.id});
        }
        keyboard(event.currentTarget.id);
    });

    $("div#middleHalf.container").on("click", "button.is-light#check_guess", function (event) {
        if (TogetherJS.running) {
            TogetherJS.send({type: "checkguess"});
        }
        checkguess()
    })
    $("div#middleHalf.container").on("click", "button#final_Answer.button.is-light", function (event) {
        $("div#bottomHalf.container").show();
    });

    $("div#bottomHalf.container").on("click", "button.is-light#submit_answer", function (event) {
        if (TogetherJS.running) {
            TogetherJS.send({type: "modalactive"});
        }
        $("div#modal").addClass("is-active");
    });

    $("div#modal").on("click", "button#close_modal", function (event) {
        if (TogetherJS.running) {
            TogetherJS.send({type: "modalinactive"});
        };
        $("div#modal").removeClass("is-active");
    });

    $("div#modal").on("click", "button#confirm.button.is-light", function (event) {
        members++;
        if (members == group) {
            if (TogetherJS.running) {
                TogetherJS.send({type: "update" , member: members});
                TogetherJS.send({type: "submit" , member: members});   
                members = 0; 
            };
            $("#members").html(""+members);
            $("div#modal").removeClass("is-active");
            TogetherJS.send({type: "update" , member: members});
            submit(event);
        } else {
            if (TogetherJS.running) {
                TogetherJS.send({type: "update" , member: members});    
            };
            $("#members").html(""+members);
        }
       
    });
    $("div#modal").on("click", "button#cancel.button.is-light", function (event) {
        members = 0;
        if (TogetherJS.running) {
            TogetherJS.send({type: "modalinactive" , event:event});
        };
        $("#members").html(""+members);
        $("div#modal").removeClass("is-active");
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
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 1:
            if (combination[num] == "B"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 2:
            if (combination[num] == "C"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 3:
            if (combination[num] == "D"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 4:
            if (combination[num] == "E"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 5:
            if (combination[num] == "F"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 6:
            if (combination[num] == "G"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 7:
            if (combination[num] == "H"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 8:
            if (combination[num] == "I"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
                return;
            }
          case 9:
            if (combination[num] == "J"){
                continue;
            } else {
                alert("you're wrong");
                if(trial_num != 10){
                    $("div#bottomHalf.container").hide();
                }
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
    console.log(event);

    let id = event;
    let textbar_content =  $("p#textbar").text();

    //Makes sure user follows step 2 before doing step 1 again
    if ( !has_guessed && trial_num != 0){
        if (TogetherJS.running) {
            TogetherJS.send({type: "alert"});
        }
        return;
    }

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
        case "delete":
            let length = textbar_content.length-1;
            let short_string = textbar_content.substring(0, length);
            //If statement here because of clone clicking in together.js 
            //Without it, two characters would be deleted. 
            if (!backspace){
                backspace=true;
                return;
            }
            $( "p#textbar" ).text(short_string);
            backspace=false;
            break;
        case "Send":
            answer(textbar_content.trim());
            $( "p#textbar").html("&nbsp;");
            break;
        default:
      }
}

/*
* Does the work for the chat in step 1
*/
function answer(textbar_content){

    if(trial_num == 9) {
        $("div#question.container").remove();
        $("div#keyboard.container").remove();
        $("div#bottomHalf.container").show();
    }

    let position = 0;
    let answer  = "";
    let terms = new Array();
    let expressions = new Array();

    //Breaks up the textbar string into seperate string values 
    for (let i = 0 ; i < textbar_content.length ; i++){
        let char = textbar_content.charAt(i);

        if((i == 0 && (char == "+" || char == "-")) || express >= 2){
            alert("Please write a correct full expression");
            console.log("1");
            $( "p#textbar").html("&nbsp;");
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
        console.log("2");
        $( "p#textbar").html("&nbsp;");
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
    trial_num++;
    $( "p#text" ).append("<p>Trial <span id='num'>"+ trial_num + "</span></p>");
    $( "p#text" ).append("<p>You: " + textbar_content + "</p>");
    $( "p#text" ).append("<p>Computer: " + textbar_content + " = " + answer + "</p>");
    has_guessed = false;

    if (TogetherJS.running) {
        TogetherJS.send({type: "addguess"});
    }
}

//Adds guess button
function addguess(){
    $("div.container#guess"+trial_num).append(`
        <button class="button is-light" id="check_guess">Check Guess</button>
    `);
}

function checkguess(){
    let letter = $("textarea#letter" + trial_num + ".textarea").val().toUpperCase();
    let number = $("textarea#number" + trial_num + ".textarea").val();

    if(keys[letter] == number){
        $("div#guess" + trial_num).append("<p id='value'>TRUE</p>");
    } else {
        $("div#guess" + trial_num).append("<p id='value'>FALSE</p>")
    }  
    $("button#check_guess").remove();
    has_guessed = true;

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
  

TogetherJS.hub.on("keyboard", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    keyboard(msg.event)

  });
  
TogetherJS.hub.on("checkguess", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    checkguess();
  });

TogetherJS.hub.on("modalactive", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    $("div#modal").addClass("is-active");
  });


  TogetherJS.hub.on("modalinactive", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    members = 0;
    $("#members").html(""+ members);
    $("div#modal").removeClass("is-active");
  });

  TogetherJS.hub.on("submit", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    submit(msg.event);
  }); 

  TogetherJS.hub.on("alert", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    alert("Please guess first before asking the computer a question");
  }); 

  TogetherJS.hub.on("addguess", function (msg) {
    if (! msg.sameUrl) {
      return;
    }
    addguess();
  }); 

// Makes sure to synch other pages if players come in to load late
  TogetherJS.hub.on("togetherjs.hello", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    group++;
    TogetherJS.send({
        type: "randomseed",
        combo: combination,
        key: keys,
    });

    let chat_text = $("p#text").html();
    let groupnum = group;

    $("#group").html(groupnum + "");
    let text = $( "p#textbar" ).text();
    let values = $( "p#value" ).get();
    let textValues = new Array(values.length)
    for(let i = 0 ; i < values.length ; i++){
        textValues[i] = values[i].outerHTML;
    }

    TogetherJS.send({
        type: "standardize",
        trialnum: trial_num,
        chattext: chat_text,
        hasguessed: has_guessed,
        groupn: groupnum,
        textbar: text,
        values: textValues
    });

});

TogetherJS.hub.on("standardize", function (msg) {
    if (! msg.sameUrl) {
        return;
    }

  trial_num = msg.trialnum;
  has_guessed = msg.hasguessed;

  if(!has_guessed) {
    $("div.container#guess"+trial_num).append(`
    <button class="button is-light" id="check_guess">Check Guess</button>
    `);
   }

  group = msg.groupn;
  $("p#text").append(msg.chattext);
  $("#group").html(msg.groupn + "");
  $( "p#textbar" ).text(msg.textbar);

    let val = msg.values;
    for(let i = 0 ; i < val.length; i++){
        let v = i + 1;
        $("div.container#guess" + v).append(val[i]);
    }
});


TogetherJS.hub.on("update", function (msg) {
    if (! msg.sameUrl) {
        return;
    }
    $("#members").html(""+msg.member);
});

