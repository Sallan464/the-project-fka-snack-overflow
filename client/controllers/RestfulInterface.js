const axios = require('axios')

class RestfulInterface {

    static async getPostData() {
        let retval;
        await fetch('http://localhost:8080/get-posts')
            .then(resp => resp.json())
            .then(json => retval = json);
            console.log(retval)
        return retval;
    }

    static sendPostData(updatedPostData) {
        axios.post('http://localhost:8080/new-post-data', updatedPostData)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) });
    }

}

module.exports = RestfulInterface;
