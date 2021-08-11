const request = require('supertest');
const app = require('../server.js');

describe("", () => {
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

    it('responds to /get-posts with status 200', (done) => {
        request(api).get('/get-posts').expect(200, done);
    })

    it('responds to /test', (done) => {
        request(api).post('/test').expect(200, done);
    })

    it('responds to /new-post with status 200', (done) => {
        request(api).post('/new-post').expect(200, done);
    })

    it('responds to /update-posts with status 200', (done) => {
        request(api).post('/update-posts').expect(200, done);
    })

    it('responds to invalid endpoint with status 404', (done) => {
        request(api).get('/asdfhjkl').expect(404, done);
    })


})