const firebaseConfig = {
    apiKey: "AIzaSyBqmO5EvF3KUrXn7XGEHjku9Z7a_C_P-AM",
    authDomain: "multiplayer-math-maker.firebaseapp.com",
    databaseURL: "https://multiplayer-math-maker.firebaseio.com",
    projectId: "multiplayer-math-maker",
    storageBucket: "multiplayer-math-maker.appspot.com",
    messagingSenderId: "489127211642",
    appId: "1:489127211642:web:f71688bd2932cb9c8281c3",
    measurementId: "G-TGFPT2WKPK"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.user = user;
        // console.log(window.user.uid);
        
        db.collection('games').where('userID', '==', window.user.uid.trim()).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                // function call to create visual list element for each game
                renderGame(doc);
            });
            // var submit = document.createElement('button');
            // submit.setAttribute('id', 'submit');
            // submit.setAttribute('form', 'game-list');
        });
        

    } else {
        // No user is signed in.
    }
    });



const gameList = document.querySelector("#game-list")



function renderGame(doc) {
    
    let name = document.createElement('input');
    let label = document.createElement('label');
    name.setAttribute('id', doc.data().gameTitle);
    name.setAttribute('type', 'radio');
    name.setAttribute('name', "game");
    name.setAttribute('url', doc.data().URL);
    label.setAttribute('for', name.getAttribute('id'));
    label.innerHTML = doc.data().gameTitle;
    
    
    // console.log(window.game);
    
    gameList.appendChild(name);
    gameList.appendChild(label);
    gameList.appendChild(document.createElement('br'));

    
    // console.log(doc.data().userID);

}

let submit = document.getElementById('submit');
// submit.addEventListener("submit", function(e) {
//     var inputs = gameList.getElementsByTagName("input");
//     var selected;
//     for(var i = 0; i < inputs.length; i++) {
//         if (inputs[i].checked) {
//             selected = inputs[i];
//             break;
//          } 
//     }

//     window.game = selected.getAttribute('url');
//     console.log(selected.getAttribute('url'));

// });

function myFunction() {
    var inputs = gameList.getElementsByTagName("input");
    var selected;
    for(var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            selected = inputs[i];
            break;
         } 
    }

    window.game = selected.getAttribute('url');
    console.log(selected.getAttribute('url'));



}
submit.addEventListener("submit", myFunction());

