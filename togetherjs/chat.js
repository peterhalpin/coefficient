let combination = ['a', 'b' , 'c' , 'd' , 'e' , 'f' , 'g' , 'h' , 'i' , 'j' ];

// TO DO:
    // Make HTML Skeleton of Webpage
    // Create "dummy" test where instead of chat, there's a submit button of things to ask 
        //Buttons to enter in things / Delete
        // Made so we don't have to keep checking for inputs that will crash 
    //Submit is still the same but now requires both people to be ok with that
$(function () {
    randomize();

    // just checking to see what's in the array
    checker();
    $("#submit").on("click", function (event) { 
        redirect();
     });
});

/* .dropdown-content {
  max-height: 13em;
  overflow: auto;
}

 css for adding a scroll bar 

*/

function randomize () {

    for (let i = 0; i < 10 ; i++){
        let index = Math.floor( Math.random() * 10 );
        let temp = combination[index];
        combination[index] = combination[i]
        combination[i] = temp 
    }

}

function checker() {
    for(let i = 0; i < 10 ; i++ ){
        console.log(combination[i]);
    }
}