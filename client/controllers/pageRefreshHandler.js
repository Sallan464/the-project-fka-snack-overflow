const Post = Require('../models/Post');
const RestfulInterface = Require('./RestfulInterface');

async function pageRefreshHandler() {

    const updatedPostData = await RestfulInterface.getPostData();

    // Here append posts to document
}

module.exports = pageRefreshHandler;