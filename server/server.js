const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080
const cors = require('cors');
app.use(cors());


app.get('/', (req, res) => {
    res.send("oioi")
})

app.post('/make-new-snack', (req, res) => {
    
    //parse request req.body
    let newSnack = JSON.parse(req)
    //check to make to sure its correct 

    //send it to snacks array
    snacks.push(newSnack)
})

app.get('/get-all-snacks', (req, res) =>{

})

app.listen(port, () => {
    console.log("app is running");
})



 let snacks = {};
// const fs = require('fs');

// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser');
// app.use(bodyParser());

// const cors = require('cors');
// app.use(cors());

// const fileUpload = require('express-fileupload');
// app.use(fileUpload());
// app.use(express.static(__dirname));

// const {
//     //objectExistsInS3Bucket,
//     fetchImageFromS3Bucket,
//     fetchPostsFromS3,
//     uploadImageFileToS3,
//     replaceDataInS3 } = require('./AWSInterface');

// // port set by Heroku or 8080
// const port = process.env.PORT || 8080

// // tmp data
// let posts = [
//     { imageURL: "https://realfood.tesco.com/media/images/RFO-1400x919-ChickenClubSandwich-0ee77c05-5a77-49ac-a3bd-4d45e3b4dca7-0-1400x919.jpg", caption: "chicken triangle with dip" },
//     { imageURL: "https://img.taste.com.au/c33UcYVI/taste/2016/11/giant-club-sandwich-110755-1.jpeg", caption: "big boi chicken bacon lettuce thing" },
//     { imageURL: "https://assets.bonappetit.com/photos/57aca69153e63daf11a4d915/5:4/w_3515,h_2812,c_limit/california-veggie-sandwich.jpg", caption: "california veggie" },
//     { imageURL: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-200511-seo-club-sandwich-h-14383-eb-1590780714.jpg", caption: "ham triangle with crisps" },
// ];

// //routes
// app.get("/get-posts", async (req, res) => {

//     // First update local fs here by fetching from S3 bucket ~
//     // TODO: Debug this (@OGWJ accidentally broke it lunchtime weds)
//     let postData = await fetchPostsFromS3();
//     fs.writeFile(__dirname + '/tmp/json/posts.json', JSON.stringify(postData), (err) => {
//         console.log(err);
//     });

//     // Then parse string to json
//     let rawData = fs.readFileSync(__dirname + '/tmp/json/posts.json');
//     let postDataJson = JSON.stringify(JSON.parse(rawData));

//     // res.send(postDataJson);
//     res.send(postDataJson);
// });

// app.get("/get-image/:key", async (req, res) => {
//     // check if server has file already downloaded
//     // fs.exists
//     fs.stat(__dirname + '/tmp/img/' + req.params.key, async function (err, stat) {
//         if (err != null) {

//             // TODO: Debug below
//             // if not in local fs, check s3 bucket
//             // if (objectExistsInS3Bucket(req.params.key)) {
//             //     const imageFile = await fetchImageFromS3Bucket(req.params.key);
//             //     // TODO: Error handle here!
//             //     return res.sendFile(imageFile)
//             //}

//             //if not in fs or bucket send server error image
//             console.log(`failed to find ${req.params.key}!`);
//             return res.sendFile(__dirname + '/server-error.png')

//         } else {
//             // image found in local fs
//             console.log(`found ${req.params.key} in local fs`);
//             res.sendFile(__dirname + '/tmp/img/' + req.params.key);
//         }
//     });
// });


// app.post('/new-post-img', async (req, res) => {

//     let uploadedFile;
//     let uploadPath;

//     try {
//         if (!req.files) {
//             return res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         }

//         // Make a copy of uploaded file and send to /tmp/img/ storage
//         uploadedFile = req.files.image;
//         console.log(uploadedFile);
//         uploadPath = __dirname + '/tmp/img/' + uploadedFile.name;

//         uploadedFile.mv(uploadPath, (err) => {
//             res.status(500).send(err);
//         });

//         // TODO: Send copy to AWS bucket here ~
//         let img = fs.readFileSync(uploadPath);
//         await uploadImageFileToS3(img, `/img/${uploadedFile.name}`);

//         res.send({
//             status: true,
//             message: 'File is uploaded',
//             body: req.body
//         });

//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send(err);
//     }
// });

// app.post('/new-post-data', async (req, res) => {

//     console.log(req.body);

//     let jsonToParse = {
//         "posts": req.body
//     };

//     console.log(JSON.stringify(jsonToParse));
//     let parsedJson = JSON.stringify(jsonToParse);

//     // Create local copy of post data
//     fs.writeFile(__dirname + '/tmp/json/posts.json', parsedJson, (err) => {
//         if (err != null) console.log(err);
//     })

//     // Or just append (more formatting needed)
//     // fs.appendFile(__dirname + '/tmp/json/posts.json', JSON.stringify(req.body), (err) => {
//     //     console.log(err.message);
//     // })

//     // Then send copy to S3 bucket here ~
//     // req.body below current just receives one single post data, but could send all here
//     // which would serve as the only endpoint for serving aws bucket data. Instead we could
//     // use the local fs json: i.e. 
//     let localData = fs.readFileSync(__dirname + '/tmp/json/posts.json')
//     console.log(localData);
//     // console.log(JSON.stringify(JSON.parse(localData)))
//     // await replaceDataInS3(JSON.stringify(JSON.parse(localData)));

//     res.send({
//         status: true,
//         message: 'data upload successful',
//         body: req.body
//     });
// });

// // Listen
// app.listen(port, () => {
//     console.log("app is running");
// })
