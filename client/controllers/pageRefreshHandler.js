const RestfulInterface = require('./RestfulInterface');
const renderAllPosts = require('../views/postView');

async function pageRefreshHandler() {
    const updatedPostData = await RestfulInterface.getPostData();
    console.log(updatedPostData);
    renderAllPosts(updatedPostData.posts)
}

module.exports = pageRefreshHandler;