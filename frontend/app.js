var htmlFileButton = document.getElementById("html");
htmlFileButton.addEventListener('change', function(e) {
    var html = e.target.files[0]; 

    /*Justin's Skeleton Code
    var reader = new FileReader();
    reader.onload = function(html) {
        var arrayBuffer = reader.result;
        var byteArray = new Uint16Array(arrayBuffer);
        var fileAsString = ab2str(byteArray)
        var togetherJS_String = fileAsString.replace("</head>", 
            '<script>TogetherJSConfig_hubBase = "https://sustaining-classic-beam.glitch.me/"; </script>\n' + 
            '<script> TogetherJSConfig_suppressJoinConfirmation = true </script> \n' +
            '<script> TogetherJSConfig_autoStart = true </script> \n' +
            '<script src="https://togetherjs.com/togetherjs-min.js"></script> \n' +
            '</head>\n');
        var togetherJS_Buffer = str2ab(togetherJS_String);
        var file = new File(togetherJS_Buffer, html.name)
        var storageRef = firebase.storage().ref(html.name);
        var task = storageRef.put(file);
    }

*/

    

    /* Helper functions:
    
    function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    function str2ab(str) {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
    return buf;
    }

    */

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