const Post = require('../models/Post');
const RestfulInterface = require('./RestfulInterface');

// NOTE: This handler needs to be debugged (@OGWJ 12/08/21)
async function formSubmitHandler(e) {

    e.preventDefault();

    console.log("NOTE: This handler needs to be debugged (@OGWJ 12/08/21)");

    const newPostData = Post.newPost(
        e.target.userCaption.value,
        e.target.userName.value)

    const existingPostData = await RestfulInterface.getPostData();

    existingPostData.posts.push(newPostData.toJson());

    // Below function call temporarily commented to prevent invalid data overwrite
    // RestfulInterface.sendPostData(existingPostData);
}

module.exports = formSubmitHandler;