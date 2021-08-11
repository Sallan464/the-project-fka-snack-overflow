const request = require('supertest');
const app = require('../server.js');
const fs = require('fs');
const path = require('path');

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

            it('/get-posts responds with status 200, returns json that matches', (done) => {
                request(api).get('/get-posts')
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then(response => {
                        // assert response is same as contents of posts.json
                        done();
                    })
                    .catch(err => done(err))
            })

            it('/get-img/:key responds with status 200', (done) => {
                request(api).get('/get-img/server-error.png')
                    .expect(200, done);
            })
        })

        describe("Bad Paths", () => {

            it('responds to invalid endpoint with status 404', (done) => {
                request(api).get('/asdfhjkl').expect(404, done);
            })

        })
    })

    describe("/POST Requests", () => {

        describe("Good Paths", () => {

            it('responds to /new-post-img with status 200', (done) => {
                const file = fs.readFile(path.join(__dirname, 'test-image.png'), (err, data) => {
                    if (err != null) console.log(err);
                })
                const uploadPath = path.join(__dirname, '../tmp/img/test-image.png');
                request(api).post('/new-post-img')
                    .send(file)
                    .expect(200)
                    .expect(fs.existsSync(uploadPath), done)
                // remove uploaded test image
                fs.unlink(uploadPath);
            })

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
                    .expect(200, done);
            })
        })
    })
})