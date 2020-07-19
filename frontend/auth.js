// Instantiate the Firebase Auth UI widget
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Set configuration object
var uiConfig = {
  // signInSuccessURL: 'home.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
  };

// Set up user
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var uid = user.uid;
    window.user = user;
    console.log(window.user);
    window.location = 'home.html';


  } else {
    // No user is signed in.
  }
});

// Set persistent login status across session 
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
  return ui.start('#firebaseui-auth-container', uiConfig);
})