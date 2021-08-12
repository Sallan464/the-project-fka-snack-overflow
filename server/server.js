const fs = require('fs');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser());

const cors = require('cors');
app.use(cors());

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.static(__dirname));

const {
    //objectExistsInS3Bucket,
    fetchImageFromS3Bucket,
    fetchPostsFromS3,
    uploadImageFileToS3,
    replaceDataInS3 } = require('./AWSInterface');

// port set by Heroku or 8080
const port = process.env.PORT || 8080

//routes
app.get("/get-posts", async (req, res) => {

    // First update local fs here by fetching from S3 bucket ~
    let postData = await fetchPostsFromS3();
    fs.writeFile(__dirname + '/tmp/json/posts.json', JSON.stringify(postData), (err) => {
        if (err != null) console.log(err);
    });

    res.status(200).send(postData);
});

app.get("/get-img/:key", async (req, res) => {
    // check if server has file already downloaded
    // fs.exists
    fs.stat(__dirname + '/tmp/img/' + req.params.key, async function (err, stat) {
        if (err != null) {

            // TODO: Debug below
            // if not in local fs, check s3 bucket
            // if (objectExistsInS3Bucket(req.params.key)) {
            //     const imageFile = await fetchImageFromS3Bucket(req.params.key);
            //     // TODO: Error handle here!
            //     return res.sendFile(imageFile)
            //}

            //if not in fs or bucket send server error image
            console.log(`failed to find ${req.params.key}!`);
            return res.sendFile(__dirname + '/server-error.png')

        } else {
            // image found in local fs
            // console.log(`found ${req.params.key} in local fs`);
            res.sendFile(__dirname + '/tmp/img/' + req.params.key);
        }
    });
});


app.post('/new-post-img', async (req, res) => {

    try {
        if (!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        }

        const file = req.files[Object.keys(req.files)[0]];
        const fileName = file.name;

        // Make a copy of uploaded file and send to /tmp/img/ storage
        let uploadPath = __dirname + '/tmp/img/' + fileName;

        file.mv(uploadPath, (err) => {
            if (err != null) res.status(500).send(err);
        });

        // TODO: Send copy to AWS bucket here ~
        let imageBuffer = fs.readFileSync(uploadPath);
        // await uploadImageFileToS3(img, `/img/${uploadedFile.name}`);
        await uploadImageFileToS3(imageBuffer, `img/${fileName}`);

        res.status(200).send();


    } catch (err) {
        console.log(err.message);
        res.status(500).send();
    }
});

app.post('/new-post-data', async (req, res) => {

    // Create local copy of post data
    fs.writeFile(__dirname + '/tmp/json/posts.json', JSON.stringify(req.body), (err) => {
        if (err != null) console.log(err);
    })

    // Or just append (more formatting needed)
    // fs.appendFile(__dirname + '/tmp/json/posts.json', JSON.stringify(req.body), (err) => {
    //     console.log(err.message);
    // })

    // send copy to bucket
    await replaceDataInS3(req.body);

    res.send({
        status: true,
        message: 'data upload successful',
        body: req.body
    });
});

// Listen
app.listen(port, () => {
    console.log("app is running");
})

module.exports = app;
