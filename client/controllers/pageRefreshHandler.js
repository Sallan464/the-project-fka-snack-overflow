const RestfulInterface = require('./RestfulInterface');
const renderAllPosts = require('../views/postView');

async function pageRefreshHandler() {
    console.log('called pageRefreshHandler')
    const updatedPostData = await RestfulInterface.getPostData();
    renderAllPosts(updatedPostData)
}

module.exports = pageRefreshHandler;