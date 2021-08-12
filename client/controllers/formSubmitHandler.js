const Post = require('../models/Post');
const RestfulInterface = require('./RestfulInterface');

async function formSubmitHandler(e) {

    e.preventDefault();

    console.log('formsubmithandler called!')

    const newPostData = Post.newPost(
        e.target.userCaption.value,
        e.target.userName.value)

    const existingPostData = await RestfulInterface.getPostData();

    existingPostData.posts.push(newPostData.toJson());
    // RestfulInterface.sendPostData(existingPostData);
}

module.exports = formSubmitHandler;