//Used for creating the combinations of letters/numbers
let combination = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let keys = {};

//Used so as not generate a new seed everytime a new user loads
let hasSeed = false;

let trial_num = 1;

let has_guessed = false;

let express = 0;


$(function () {
    document.getElementById("l2n_guess_send").disabled = true;
    $("div#l2nmodal").on("click", "button#submit_seed", function (event) {
        seed();

        //Changes modal to instructions
        $("div#l2nmodal_seed_content").replaceWith(`<div class="modal-content" style="background-color:white;" id="l2nmodal_instructions_content">
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

        $("#submit_seed").remove();
        hasSeed = true;
    });

    $("div#l2nmodal").on("click", "#submit_start", function (event) {
        $("div#l2nmodal").removeClass("is-active");
    });

    $("div#l2n_left_half").on("click", "#l2n_equation_send", function (event) {
        equation();
    })

    $("div#l2n_left_half").on("click", "#l2n_guess_send", function (event) {
        checkguess();
    });

    $("#l2n_bottom").on("click", "#l2n_submit_final", function (event) {
        submit();
    });

    $("div#l2nmodal").on("click", "#l2n_return", function (event) {
        $("div#l2nmodal").removeClass("is-active");
    });

});


// Takes in submitted seed or blank and generates a unique combination
function seed() {
    //Input
    let submit_seed = $("textarea#seed").val();

    //If no seed is input, then a random combination is made
    if (submit_seed == "") {
        randomize(Math.floor(Math.random() * 10000));
        let z = combination;
        if (TogetherJS.running) {
            TogetherJS.send({ type: "randomseed", combo: z, key: keys });
        }
        return;
    }

    //Error checking
    try {
        parseInt(submit_seed)
    } catch (err) {
        alert("Please input a number");
        $("textarea#seed").val("");
        return;
    }
    if (submit_seed < 0) {
        alert("Please input an integer > 0 ");
        $("textarea#seed").val("");
        return;
    }

    //Function that generates combination
    randomize(submit_seed);
}

// Creates the Encryption/Decryption system for the excercise
function randomize(seed) {

    // Shuffles letters in the array using a seed to create the encryption formula
    Math.seedrandom(seed + "");
    for (let i = 0; i < 10; i++) {
        let place = Math.floor(Math.random() * 9);
        let temp = combination[place];
        combination[place] = combination[i]
        combination[i] = temp
    }

    // Makes a dictionaray that holds the decryption formula
    for (let i = 0; i < 10; i++) {
        let char = combination[i];
        keys[char] = i;
    }
}


//Handles submitted equation
function equation() {

    let textbar_content = $("#l2n_step1_text").val();

    //Makes sure user follows step 2 before doing step 1 again
    if (!has_guessed && trial_num != 1) {
        if (TogetherJS.running) {
            TogetherJS.send({ type: "alert" });
        }
        $("#l2n_step1_text").val("");
        return;
    }

    //Sends equation so that the combination can be interperted and given an answer
    answer(textbar_content.split(" ").join(""));
    $("#l2n_step1_text").val("");
    document.getElementById("l2n_equation_send").disabled = true;
    document.getElementById("l2n_guess_send").disabled = false;
    return;

}

//Decrypts equation to solve and then encrypts the answer and puts in the chart
function answer(textbar_content) {

    let position = 0;
    let answer = "";
    let terms = new Array();
    let expressions = new Array();

    //Breaks up the textarea string into individual characters and expressions
    // Example input : A+BB+C
    // Example output: ["A", "BB", "c"] , ["+", "+"]
    for (let i = 0; i < textbar_content.length; i++) {
        let char = textbar_content.charAt(i).toUpperCase();

        //Checking for valid input
        if ((i == 0 && (char == "+" || char == "-")) || express >= 2) {
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
                if (terms[position] === null || terms[position] == undefined) {
                    terms[position] = char;
                    express = 0;
                } else {
                    terms[position] += char;
                    express = 0;
                }
        }

    }

    //Error checking for correct amount of expressions
    if (expressions.length == 0 || expressions.length != terms.length - 1 || terms.length == 0) {
        alert("Please write a correct full expression");
        $("#l2n_step1_text").val("");
        return;
    }

    //Takes the 2 strings, translates them and then does the appropiate operation
    //Retranslates and the cycle repeats till the array is finished
    for (let i = 0; i < terms.length - 1; i++) {
        let result = "";
        let first_num = translate(terms[i]);
        let second_num = translate(terms[i + 1])
        let operation = expressions[i];

        switch (operation) {
            case "+":
                result += first_num + second_num
                break;
            case "-":
                result += first_num - second_num
                break;
            default:
                break;
        }

        terms[i + 1] = retranslate(result);

    }

    let index = terms.length - 1;
    answer = terms[index];
    $("td#equation_" + trial_num).append(textbar_content + " = " + answer);
    has_guessed = false;

}

// Encrypts the number into a string
function retranslate(result) {
    let answer = ""
    for (let i = 0; i < result.length; i++) {
        let char = result.charAt(i);
        if (char == "-" || char === ".") {
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

    for (let i = 0; i < term.length; i++) {
        let char = term.charAt(i);
        num += keys[char];
    }

    return parseInt(num);
}


//Function to check guesses
function checkguess() {

    //Takes entered value and clears textbar
    let hypothesis = $("#l2n_step2_text").val().split(" ").join("");
    $("#l2n_step2_text").val("");

    $("td#hypothesis_" + trial_num).append(hypothesis);

    //Assumes format is Letter = Number , with one Letter and one Number
    let letter = hypothesis[0].toUpperCase();
    let number = hypothesis[2];

    if (keys[letter] == number) {
        $("td#feedback_" + trial_num).append("TRUE");
    } else {
        $("td#feedback_" + trial_num).append("FALSE")
    }

    has_guessed = true;

    
    if (trial_num >= 10) {
        document.getElementById("l2n_equation_send").disabled = true;
        document.getElementById("l2n_guess_send").disabled = true;
        return;
    }


trial_num++;
document.getElementById("l2n_equation_send").disabled = false;
document.getElementById("l2n_guess_send").disabled = true;
}



//Function that handles checking if the final answer is correct or not
function submit() {

    let answers = new Array();
    for (let i = 0; i < 9; i++) {
        answers[i] = $("input" + "#l2n_bottom_text_" + i).val();

        //Checks for answers that are not single digits
        if (answers[i].length != 1) {
            alert("Hey, put in a serious answer you joker!");
            return;
        }

        //Checks for answers that are not numbers
        try {
            parseInt(answers[i])
        }
        catch (err) {
            alert("Hey, put in a number you joker!");
            return;
        }

        //Checks for if the answer is correct or not
        let num = parseInt(answers[i]);
        switch (i) {
            case 0:
                if (combination[num] == "A") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 1:
                if (combination[num] == "B") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 2:
                if (combination[num] == "C") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 3:
                if (combination[num] == "D") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 4:
                if (combination[num] == "E") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 5:
                if (combination[num] == "F") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 6:
                if (combination[num] == "G") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 7:
                if (combination[num] == "H") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 8:
                if (combination[num] == "I") {
                    continue;
                } else {
                    incorrect();
                    return;
                }
            case 9:
                if (combination[num] == "J") {
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

//Shows end screen
function correct() {
    $("div#l2nmodal").addClass("is-active");
    $("#submit_start").remove();

    let turn_string = "";

    if (trial_num == 1) {
        turn_string = "turn!";
    } else {
        turn_string = "turns!";
    }

    //Do not remove either one of the replace statements
    //In the unlikely event a person guesses right on their first turn
    //The first replace statement will be needed.

    $("#l2nmodal_instructions_content").replaceWith(
        `<div class="modal-content" style="background-color:white;" id="l2n_final_modal">
            <p id="title">
                CONGRATS!
            </p>
            <p id ="subtitle">
                Nice job, team! 
            <br>
                You solved the puzzle in `+ trial_num + `  ` + turn_string + `
            </p>
            </div>
        </div>` );


    $("#l2n_try_again_modal").replaceWith(`
            <div class="modal-content" style="background-color:white;" id="l2n_final_modal">
            <p id="title">
                 CONGRATS!
            </p>
            <p id ="subtitle">
                Nice job, team! 
            <br>
                You solved the puzzle in `+ trial_num + `  ` + turn_string + `
            </p>
            </div>
            </div>`);

    $("#l2n_return").remove();
}

//Shows "Try Again" screen if incorrect
function incorrect() {
    $("div#l2nmodal").addClass("is-active");
    $("#submit_start").remove();
    $("#l2nmodal_instructions_content").replaceWith(`
        <div class="modal-content" style="background-color:white;" id="l2n_try_again_modal">
            <p id="title">
                NOT QUITE,
            <br>
                TRY AGAIN!
            </p>
        </div>
            <button class="button" id="l2n_return"><span id="button_text">Return</span></button>
        </div>` );
}


//If someone joins late, this synchronizes the combination/keys
TogetherJS.hub.on("randomseed", function (msg) {
    if (!msg.sameUrl) {
        return;
    }

    combination = msg.combo;
    keys = msg.key;
    console.log(combination);

});

TogetherJS.hub.on("alert", function (msg) {
    if (!msg.sameUrl) {
        return;
    }
    alert("Please guess first before asking the computer a question");
    return;
});


// Makes sure to synch pages that load late
TogetherJS.hub.on("togetherjs.hello", function (msg) {
    if (!msg.sameUrl) {
        return;
    }
    TogetherJS.send({
        type: "randomseed",
        combo: combination,
        key: keys,
    });

    let current_table = $("table#l2n_results").html();

    TogetherJS.send({
        type: "standardize",
        trialnum: trial_num,
        current_table2: current_table,
        hasguessed: has_guessed,
    });

});

//Synchs trial/guess state/table
TogetherJS.hub.on("standardize", function (msg) {
    $("#submit_seed").remove();
    if (!msg.sameUrl) {
        return;
    }

    trial_num = msg.trialnum;
    has_guessed = msg.hasguessed;
    $("table#l2n_results").html(msg.current_table2);

    //Skips through the seed submit page so as not to accidently create a new combination for everyone
    $("div#l2nmodal_seed_content").replaceWith(`<div class="modal-content" style="background-color:white;" id="l2nmodal_instructions_content">
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
    hasSeed = true;


});


