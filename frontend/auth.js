var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  signInSuccessURL: 'upload.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
  };

ui.start('#firebaseui-auth-container', uiConfig);