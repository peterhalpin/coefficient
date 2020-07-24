// Set up Firebase configuration object
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
// Initialize Firebase and reference Database
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.user = user;
        // Render every saved game in the database collection for the specific user
        db.collection('games').where('userID', '==', window.user.uid.trim()).get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                // Function call to create visual list element for each game
                // console.log(doc);
                renderGame(doc);
            });
       
        });
        

    } else {
        // No user is signed in.
    }
    });

// Fetches the response from submitting a url to scrape multiple urls 
async function getURLs(url, groups) {
    // console.log('inside getURLs');
    let response = await fetch('https://oxreg1dkaa.execute-api.us-east-1.amazonaws.com/prod/scraper?url=' + url + '&groups=' + groups);
    let data = await response.json();
    return data;
}


// Create a list to hold the games
const gameList = document.querySelector("#game-list")



function renderGame(doc) {
    // Create HTML elements and set attributes 
    let name = document.createElement('input');
    let label = document.createElement('label');
    name.setAttribute('id', doc.data().gameTitle);
    name.setAttribute('type', 'radio');
    name.setAttribute('name', "game");
    name.setAttribute('url', doc.data().URL);
    label.setAttribute('for', name.getAttribute('id'));
    label.innerHTML = doc.data().gameTitle;
    
    
    // Add games to the game list
    gameList.appendChild(name);
    gameList.appendChild(label);
    gameList.appendChild(document.createElement('br'));



}

function deleteGame(selected) {
    db.collection('games').doc(selected.id).delete();
    // console.log(selected.id + "deleted");
    var element = document.getElementById(selected.id);
    console.log(element.parentElement);
    var parent = element.parentElement;
    parent.removeChild(element.nextSibling);
    parent.removeChild(element);
    
    

}

// Add event listener to the submit button to generate URLs
let submit = document.getElementById('generate');
submit.addEventListener("click", async function(e) {
    e.preventDefault();
    document.getElementById('generate').disabled = 'true';
    var inputs = gameList.getElementsByTagName("input");
    var selected;
        // Find the checked radio button
        for(var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                selected = inputs[i];
                break;
             } 
        }
        if(selected != undefined) {
            window.game = selected.getAttribute('url');
            // console.log(selected.getAttribute('url'));
            
        }
        
        window.groups = document.getElementById('groups').value;
     
    // Call to the URL scraper 
    let urls = await getURLs(window.game, window.groups).then(data => renderURLs(data));
    // console.log(urls);
    
});

function renderURLs(urls) {
    // Create the list to add URLs to
    let list = document.createElement('ul');
    
    for(i = 0; i < urls.length; i++) {
       
        // Create list item for every element 
        // var listItem = document.createElement("li");
        
        // Create a text node to store value and an a tag to store link
        var text = document.createTextNode("Group " + (i+1));
        var a = document.createElement('a');
        a.appendChild(text);
        a.href = urls[i] + '\n'; 
        
        // Append the list item in the list
        // listItem.appendChild(a);
        // list.appendChild(listItem);
        list.appendChild(a);
        list.appendChild(document.createElement('br'));


    }


    var gameList = document.getElementById('game-list');
    gameList.parentNode.removeChild(gameList);
    var delButton = document.getElementById('delete');
    var addButton = document.getElementById('generate');
    var groups = document.getElementById('groups');
    var uploadButton = document.getElementById('upload');
    delButton.parentNode.removeChild(delButton);
    addButton.parentNode.removeChild(addButton);
    groups.parentNode.removeChild(groups);
    uploadButton.parentNode.removeChild(uploadButton);
    document.getElementById('launch').appendChild(list);

    // Change the text to Your URLs
    var heading = document.getElementById('heading');
    heading.parentNode.removeChild(heading);
    
    url.style.visibility = 'visible';
    

}

let del = document.getElementById('delete');
del.addEventListener("click", async function(e) {
    e.preventDefault();
    var inputs = gameList.getElementsByTagName("input");
    var selected;
        // Find the checked radio button
        for(var i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                selected = inputs[i];
                break;
             } 
        }
    deleteGame(selected);

});