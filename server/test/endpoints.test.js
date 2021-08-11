const request = require('supertest');
const app = require('../server.js');
const fs = require('fs');
const path = require('path');
const { fetchPostsFromS3 } = require('../AWSInterface');
const { assert } = require('console');

// NOTE: There are currently tests which will overwrite local storage

describe("endpoints", () => {

    let api;

    beforeAll(() => {
        api = app.listen(8000, () => {
            console.log('test server running on port 8000');
        });
    })

    afterAll((done) => {
        console.log('stopping test server');
        api.close(done);
    })

    describe("/GET Requests", () => {

        describe("Good Paths", () => {

            it('/get-posts responds with status 200 and returns json from server/tmp/posts.json', (done) => {
                request(api).get('/get-posts')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then(resp => {
                        // check resp matches /tmp/json/posts.json
                        expect(resp.body).toEqual(JSON.parse(fs.readFileSync(__dirname + '/../tmp/json/posts.json')));
                        done();
                    })
                    .catch(err => done(err))
            })

            it('/get-img/:key responds with 200', (done) => {
                request(api).get('/get-img/server-error.png')
                    .expect(200, done);
            })
        })

        describe("Bad Paths", () => {

            it('responds to invalid endpoint with 404', (done) => {
                request(api).get('/asdfhjkl').expect(404, done);
            })

            it('/get-img/:invalidkey responds with 404', (done) => {
                request(api).get('/get-img/asdfhjkl').expect(404, done);
            })

        })
    })

    describe("/POST Requests", () => {

        describe("Good Paths", () => {

            // TODO: Fix this test ln.72 (endpoint succeeds in sending to /tmp/img and to bucket)
            // it('responds to /new-post-img with status 200', (done) => {
            //     const fileName = 'test-image.png';
            //     const filePath = path.join(__dirname + '/' + fileName);
            //     const uploadPath = path.join(__dirname, '/../tmp/img/', fileName);
            //     expect(fs.existsSync(filePath))
            //     request(api).post('/new-post-img')
            //         .attach(fileName, filePath)
            //         // .expect(200)
            //         .expect(fs.existsSync(uploadPath))
            //         .then(_ => {
            //             // remove test upload
            //             fs.unlink(uploadPath);
            //             done();
            //         })
            // })

            // NOTE: This test will overwrite local posts.json
            it('responds to /new-post-data with status 200', (done) => {
                request(api).post('/new-post-data')
                    .send({
                        posts: [
                            {
                                id: '0',
                                imageURL: '0.png',
                                caption: 'caption here',
                                userName: 'anon',
                                datetime: '2021-08-09T17:22:11.323Z',
                                comments: []
                            },
                            {
                                id: '1',
                                imageURL: '1.png',
                                caption: 'caption here',
                                userName: 'bob',
                                datetime: '2021-08-09T17:22:11.323Z',
                                comments: []
                            }
                        ]
                    })
                    .expect(200)
                    // check s3 data is updated
                    .then(_ => fetchPostsFromS3())
                    .then(resp => {
                        expect(resp).toEqual(JSON.parse(fs.readFileSync(__dirname + '/../tmp/json/posts.json')));
                        done();
                    })
            })
        })
    })
})