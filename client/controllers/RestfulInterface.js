const fetch = require('node-fetch');

class RestfulInterface {

    static async getPostData() {
        let retval;
        await fetch('http://localhost:8080/get-posts')
            .then(resp => resp.json())
            .then(json => retval = json);
        return retval;
    }

    static sendPostData(updatedPostData) {
        fetch("http://localhost:8080/new-post-data",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify(updatedPostData)
            })
            .then(res => { console.log(res) })
            .catch(err => console.log(err));
    }

}

RestfulInterface.getPostData();

module.exports = RestfulInterface;
