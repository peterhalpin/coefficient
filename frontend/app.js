
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

// AWS configuration 
// var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAUYKTSY5UQLZFQCVV";
AWS.config.secretAccessKey = "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";
AWS.config.region = 'us-east-1';

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
console.log(s3);



function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      console.log(reader.readAsText(file));

    })
  }

  function redirect() {
      window.location = "/launch.html";
  }
var html;
var css;
var js;
var csv;
var file;
var togetherJS_String;
var submit = document.getElementById("add");
var gameName;
var uploaded = new Map();

// // "myAwesomeDropzone" is the camelized version of the HTML element's ID
// Dropzone.options.myAwesomeDropzone = {
//     paramName: "file", // The name that will be used to transfer the file
//     maxFilesize: 2, // MB
//     acceptedFiles: '*.csv, *.html, *.css, *.js'
//   };
// // Create the dropzone 
// var myDropzone = new Dropzone("#my-awesome-dropzone");

// // Dropzone for additional files


var htmlFileButton = document.getElementById("html");
htmlFileButton.addEventListener('change', async function(e) {
    html = e.target.files[0]; 
    let fileAsString = await readFileAsync(html);
    // console.log(file);
    

    togetherJS_String = fileAsString.replace("</head>", 
            '<script>TogetherJSConfig_hubBase = "https://sustaining-classic-beam.glitch.me/"; </script>\n' + 
            '<script> TogetherJSConfig_suppressJoinConfirmation = true </script> \n' +
            '<script> TogetherJSConfig_autoStart = true </script> \n' +
            '<script src="https://togetherjs.com/togetherjs-min.js"></script> \n' +
            '</head>\n');
    console.log(togetherJS_String);

    // var fileAsBuffer = str2ab(togetherJS_String);
    // file = new File([fileAsBuffer], "index.html", {type : 'text/html'});
    var storageRef = firebase.storage().ref(html.name);
    //stringObj = new S3Object("index.html", togetherJS_String);
    storageRef.putString(togetherJS_String).then((snapshot) => {
    storageRef.getDownloadURL().then(async function(downloadURL) {
            console.log("File available at ", downloadURL);
        })
    });

    uploaded.set('html', false);

});
 
  

var cssFileButton = document.getElementById("css");
cssFileButton.addEventListener('change', function(e) {
    css = e.target.files[0]; 
    var storageRef = firebase.storage().ref(css.name);
    var task = storageRef.put(css).then((snapshot) => {
        storageRef.getDownloadURL().then(async function(downloadURL) {
                console.log("File available at ", downloadURL);
            })
        });
    uploaded.set('css', false);
});
  
var jsFileButton = document.getElementById("js");
jsFileButton.addEventListener('change', function(e) {
    js = e.target.files[0]; 
    var storageRef = firebase.storage().ref(js.name);
    var task = storageRef.put(js).then((snapshot) => {
        storageRef.getDownloadURL().then(async function(downloadURL) {
                console.log("File available at ", downloadURL);
            })
        });
    uploaded.set('js', false);
});

// make event listener for .json or .csv files 
var csvFileButton = document.getElementById('data');
csvFileButton.addEventListener('change', function(e) {
    csv = e.target.files[0];
    var storageRef = firebase.storage().ref(csv.name);
    var task = storageRef.put(csv).then((snapshot) => {
        storageRef.getDownloadURL().then(async function(downloadURL) {
                console.log("File available at ", downloadURL);
            })
        });
    uploaded.set('csv', false);
});


submit.addEventListener("click", function(e) {
    e.preventDefault();
    var gameName = document.getElementById("gameName").value;
    
    // Create the parameters for calling createBucket
        var bucketParams = {
            Bucket : 'helpinghalpin' + gameName,
            ACL : 'public-read'
        };
        var websiteParams = {
            Bucket: "helpinghalpin" + gameName,
            ContentMD5: "",
            WebsiteConfiguration: {
             ErrorDocument: {
              Key: "error.html"
             },
             IndexDocument: {
              Suffix: "index.html"
             }
            }
           };
        var params = {
            Bucket: "helpinghalpin" + gameName
        };
        var uploadParams = {
            Bucket: "helpinghalpin" + gameName, 
            Key: 'index.html', 
            Body: togetherJS_String,
            ContentType: 'text/html'
        };
        var uploadParamsCSS = {
            Bucket: "helpinghalpin" + gameName, 
            Key: 'styles.css', 
            Body: css
            
        };
        var uploadParamsJS = {
            Bucket: "helpinghalpin" + gameName, 
            Key: 'app.js', 
            Body: js
          
        };
        var uploadParamsCSV = {
            Bucket: "helpinghalpin" + gameName, 
            Key: 'data.csv', 
            Body: csv
          
        };
        var policy = {
            
                Version: "2012-10-17",
                Statement: [
                    {
                        Sid: "PublicReadGetObject",
                        Effect: "Allow",
                        Principal: "*",
                        Action: "s3:GetObject",
                        Resource: "arn:aws:s3:::helpinghalpin" + gameName +"/*"
                    }
                ]
            
        };
        var policyParams = {
            Bucket: "helpinghalpin" + gameName,
            Policy: JSON.stringify(policy)


        };



        // call S3 to create the bucket
        s3.createBucket(bucketParams, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data.Location);
            }
        });

        s3.waitFor('bucketExists', params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     
                console.log("success" + data); // successful response
                setTimeout(redirect(), 5000);

                s3.putBucketPolicy(policyParams, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else    console.log("success" + data); // successful response
                });
                s3.putBucketWebsite(websiteParams, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else    console.log("success" + data); // successful response
                });
                if(html != undefined) {
                    s3.upload (uploadParams, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });
                //     s3.waitFor('objectExists', uploadParams, function(err, data) {
                //         if(err) {
                //             console.log(err, err.stack);
                //         } else {
                //             console.log(data);
                //             uploaded.set('html', true);
                //         }
                //    });
                }
                
                if(css != undefined) {
                    s3.upload (uploadParamsCSS, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });
                //     s3.waitFor('objectExists', uploadParamsCSS, function(err, data) {
                //         if(err) {
                //             console.log(err, err.stack);
                //         } else {
                //             console.log(data);
                //             uploaded.set('css', true);
                //         }
                //    });
                }
                if(js != undefined) {
                    s3.upload (uploadParamsJS, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });
                //     s3.waitFor('objectExists', uploadParamsJS, function(err, data) {
                //         if(err) {
                //             console.log(err, err.stack);
                //         } else {
                //             console.log(data);
                //             uploaded.set('js', true);
                //         }
                //    });
                }
                if(csv != undefined) {
                    s3.upload (uploadParamsCSV, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });
                //     s3.waitFor('objectExists', uploadParamsCSV, function(err, data) {
                //         if(err) {
                //             console.log(err, err.stack);
                //         } else {
                //             console.log(data);
                //             uploaded.set('csv', true);
                //         }
                //    });
                    
                }
                
        });
       
       // set timeout
       
   
    var name = document.getElementById("gameName").value;
    const docRef = db.doc("games/" + name);
    var user = firebase.auth().currentUser;
    console.log(docRef);
    docRef.set({
        gameTitle: name,
        userID: user.uid,
        URL: "http://helpinghalpin" + gameName + ".s3-website-us-east-1.amazonaws.com"
    }).then(function() {
        console.log("Game saved!");
        
    });
    document.forms['input'].reset();
    
});