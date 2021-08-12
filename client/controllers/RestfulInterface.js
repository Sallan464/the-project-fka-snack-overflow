const axios = require('axios')

class RestfulInterface {

    static getPostData() {
        axios.get('http://localhost:8080/get-posts')
            .then(res => { return res.body })
            .catch(err => { console.log(err) });
    }

    static sendPostData(updatedPostData) {
        axios.post('http://localhost:8080/new-post-data', updatedPostData)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) });
    }

}

module.exports = RestfulInterface;
