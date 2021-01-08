// Declare firebase settings for initialization
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
firebase.initializeApp(firebaseConfig);

// Reference the firestore database
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

// AWS configuration
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "";
AWS.config.secretAccessKey = "";
AWS.config.region = 'us-east-1';

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});
console.log(s3);


// Reads a file and returns a promise to return the file as text
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
// Window redirect function
  function redirect() {
      window.location = "/launch.html";
  }

// Declare global variables
var html;
var css;
var js;
var csv;
var togetherJS_String;
var submit = document.getElementById("add");
var gameName;

// Add event listener to the HTML file upload button
var htmlFileButton = document.getElementById("html");

htmlFileButton.addEventListener('change', async function(e) {
    html = e.target.files[0];
    let fileAsString = await readFileAsync(html);
    // console.log(file);

    // Call script to add TogetherJS functionality
    togetherJS_String = fileAsString.replace("</head>",
    // You will have to change hub base to be your own together JS server
            '<script>TogetherJSConfig_hubBase = "https://large-lightning-perigee.glitch.me/"; </script>\n' + 
            '<script> TogetherJSConfig_suppressJoinConfirmation = true </script> \n' +
            '<script> TogetherJSConfig_autoStart = true </script> \n' +
            '<script src="https://togetherjs.com/togetherjs-min.js"></script> \n' +
            '</head>\n');

});


// Add event listener to CSS file upload button
var cssFileButton = document.getElementById("css");
cssFileButton.addEventListener('change', function(e) {
    css = e.target.files[0];
});

// Add event listener to the JS file upload button
var jsFileButton = document.getElementById("js");
jsFileButton.addEventListener('change', function(e) {
    js = e.target.files[0];
});

// Add event listener for .json or .csv files
var csvFileButton = document.getElementById('data');
csvFileButton.addEventListener('change', function(e) {
    csv = e.target.files[0];
});

// Add event listener for when user submits files that handles AWS S3 uploads and database URL
submit.addEventListener("click", async function(e) {
    e.preventDefault();
    var gameName = document.getElementById("gameName").value;

    // Create the parameters for calling methods on the bucket
        var bucketParams = {
            Bucket : 'coefficient' + gameName,
            ACL : 'public-read'
        };
        var websiteParams = {
            Bucket: "coefficient" + gameName,
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
            Bucket: "coefficient" + gameName
        };
        var uploadParams = {
            Bucket: "coefficient" + gameName,
            Key: 'index.html',
            Body: togetherJS_String,
            ContentType: 'text/html'
        };
        var uploadParamsCSS = {
            Bucket: "coefficient" + gameName,
            Key: 'styles.css',
            Body: css,
            ContentType: 'text/css'
        };
        var uploadParamsJS = {
            Bucket: "coefficient" + gameName,
            Key: 'app.js',
            Body: js

        };
        var uploadParamsCSV = {
            Bucket: "coefficient" + gameName,
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
                        Resource: "arn:aws:s3:::coefficient" + gameName +"/*"
                    }
                ]

        };
        var policyParams = {
            Bucket: "coefficient" + gameName,
            Policy: JSON.stringify(policy)


        };

        // Call S3 to create the bucket
        await s3.createBucket(bucketParams, function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data.Location);
            }
        });

        // Wait for the bucket to exist before uploading files
        await s3.waitFor('bucketExists', params, async function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else
                console.log("success" + data); // successful response

                // Put the bucket policy in place
                await s3.putBucketPolicy(policyParams, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else    console.log("success" + data); // successful response
                });
                // Activate web hosting
                await s3.putBucketWebsite(websiteParams, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else    console.log("success" + data); // successful response
                });

                // If there is a file, upload it to the bucket
                if(css != undefined) {
                    await s3.upload (uploadParamsCSS, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });

                }
                if(js != undefined) {
                    await s3.upload (uploadParamsJS, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });

                }
                if(csv != undefined) {
                    await s3.upload (uploadParamsCSV, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        }
                    });


                }

                if(html != undefined) {
                    await s3.upload (uploadParams, function (err, data) {
                        if (err) {
                        console.log("Error", err);
                        } if (data) {
                        console.log("Upload Success", data.Location);
                        setTimeout(redirect(), 5000);
                        }

                    });

                }

        });

    // Reference the database and add the game name, user UID, and game URL
    var name = document.getElementById("gameName").value;
    const docRef = db.doc("games/" + name);
    var user = firebase.auth().currentUser;
    console.log(docRef);
    docRef.set({
        gameTitle: name,
        userID: user.uid,
        URL: "http://coefficient" + gameName + ".s3-website-us-east-1.amazonaws.com"
    }).then(function() {
        // console.log("Game saved!");

    });
    document.forms['input'].reset();

});
