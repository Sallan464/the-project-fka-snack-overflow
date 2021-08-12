const Post = Require('../models/Post');
const RestfulInterface = Require('./RestfulInterface');
const renderAllPosts = Require('../views/postView');

async function pageRefreshHandler() {
    const updatedPostData = await RestfulInterface.getPostData();
    renderAllPosts(updatedPostData.posts)
}

module.exports = pageRefreshHandler;