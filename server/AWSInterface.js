const aws = require('aws-sdk');
const fs = require('fs');
const configBuffer = fs.readFileSync('credentials.json');
const config = JSON.parse(configBuffer);

async function authenticateAWS() {
    try {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: config.aws.accessKey,
            secretAccessKey: config.aws.secretKey,
            region: config.aws.region
        });
    } catch (err) {
        console.log(err)
        throw err;
    }
}

async function fetchPostsFromS3() {
    try {
        await authenticateAWS();
        // console.log('authenticaed s3')
        const s3 = new aws.S3();
        const file = await s3.getObject({
            Bucket: config.aws.bucketname,
            Key: config.aws.filekey
        }).promise();

        const postData = JSON.parse(file.Body.toString());
        return postData;

    } catch (e) {
        console.log('no post data found in s3')
    }
}

async function fetchImageFromS3Bucket(key) {
    try {
        await authenticateAWS();
        const s3 = new aws.S3();
        const file = await s3.getObject({
            Bucket: config.aws.bucketname,
            Key: key
        }).promise();

        const postData = JSON.parse(file.Body.toString());
        return postData.posts;

    } catch (e) {
        console.log(e);
    }

}

async function replaceDataInS3(newData) {
    try {
        await authenticateAWS();
        const s3 = new aws.S3();
        const file = await s3.putObject({
            Bucket: config.aws.bucketname,
            Key: config.aws.filekey,
            Body: JSON.stringify(newData),
            ACL: 'public-read'
        }).promise();

        // console.log('done');

    } catch (e) {
        console.log(e);
    }
}

// function isValidFileType(file) {
//     // TODO
//     return true;
// }

// function isFileUnderSizeThreshold(file, thresholdBytes = 3000) {
//     // TODO
//     return true;
// }

async function uploadImageFileToS3(file, key) {

    // NOTE: Checks can be handled by express middleware
    // if (!isFileUnderSizeThreshold(file)) throw Error('file too big w/e');
    // if (!isValidFileType(file)) throw Error('valid file types are ' + []);

    try {
        await authenticateAWS();
        const s3 = new aws.S3();
        await s3.putObject({
            Bucket: config.aws.bucketname,
            Key: key,
            Body: file,
            ACL: 'public-read'
        }).promise();

        // console.log('done');

    } catch (e) {
        console.log(e);
    }
}

// NOTE: In Node use fs.createReadStream to convert local files to file objects
//const fs = require('fs');
//let testFile = fs.createReadStream('testimage.jpg');
//uploadImageFileToS3(testFile, 'test');
//

async function uploadNewPost() {
    // should wrap calls to uploadImageFileToS3(using data.date as key)
    // then call replaceDataInS3 with updated Json
}

//

// TODO: Debug below
// async function objectExistsInS3Bucket(key) {
//     const params = { Bucket: aws.config.bucketname, Key: key };
//     await authenticateAWS();
//     const s3 = new aws.S3();

//     s3.listObjectsV2(params, function (err, found) {
//         if (err) {
//             console.log(err);
//             // errJson = {
//             //     'status': -1,
//             //     'message': 'Error while trying to list files'
//             // };
//             // callback(errJson);
//             return false;
//         }
//         else {
//             if (found.Contents.length === 0) {
//                 errJson = {
//                     'status': 0,
//                     'message': 'Either the files are not present at s3 or the folder is incorrect '
//                 }
//                 return false;
//             }
//             else {
//                 // found item with key
//                 return true;
//             }
//         };
//     });
// };

// Some dummy data below ~~~~ //
const data = {
    'posts': [
        {
            'id': '0',
            'imageURL': '0.png',
            'caption': 'caption here',
            'userName': 'anon',
            'datetime': '2021-08-09T17:22:11.323Z',
            'comments': ['hey great stuff', 'another comment', 'last comment']
        },
        {
            'id': '1',
            'imageURL': '1.png',
            'caption': 'caption here',
            'userName': 'bob',
            'datetime': '2021-08-09T17:22:11.323Z',
            'comments': ['hey great stuff', 'another comment', 'last comment']
        }
    ]
}

// replaceDataInS3(data).then(resp => console.log('done'));

module.exports = {
    // objectExistsInS3Bucket, 
    fetchPostsFromS3,
    fetchImageFromS3Bucket,
    uploadImageFileToS3,
    replaceDataInS3
};
