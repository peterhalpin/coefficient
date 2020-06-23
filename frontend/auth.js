// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    signInSuccessUrl: 'main.html',
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  };

  ui.start('#firebaseui-auth-container', uiConfig)

  