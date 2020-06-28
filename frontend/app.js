var htmlFileButton = document.getElementById("html");
htmlFileButton.addEventListener('change', function(e) {
    var html = e.target.files[0]; 
    var storageRef = firebase.storage().ref(html.name);
    var task = storageRef.put(html);

});
  

var cssFileButton = document.getElementById("css");
cssFileButton.addEventListener('change', function(e) {
    var css = e.target.files[0]; 
    var storageRef = firebase.storage().ref(css.name);
    var task = storageRef.put(css);
});
  
var jsFileButton = document.getElementById("js");
jsFileButton.addEventListener('change', function(e) {
    var js = e.target.files[0]; 
    var storageRef = firebase.storage().ref(js.name);
    var task = storageRef.put(js);
});