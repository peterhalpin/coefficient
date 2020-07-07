// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

var params = {
    Bucket: "helpinghalpin",
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

   // Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

    s3.putBucketWebsite(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log("success" + data); // successful response
   });