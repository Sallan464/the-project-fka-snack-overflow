const Post = require('../models/Post');
const RestfulInterface = require('./RestfulInterface');

async function formSubmitHandler(e) {
    // For Debug
    e.preventDefault();

    // update post data
    const newPostData = Post.newPost(
        e.target.userCaption.value,
        e.target.userName.value)

    console.log('newpostData')
    console.log(newPostData.toJson());

    const existingPostData = await RestfulInterface.getPostData();
    console.log('existing')
    console.log(existingPostData);
    const updatedPostData = existingPostData.posts.push(newPostData.toJson());
    console.log('updated')
    console.log(updatedPostData);

    // NOTE: this is sent as an array of objects
    RestfulInterface.sendPostData(updatedPostData);
}

module.exports = formSubmitHandler;