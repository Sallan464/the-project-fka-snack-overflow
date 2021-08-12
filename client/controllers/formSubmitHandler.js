const Post = Require('../models/Post');
const RestfulInterface = Require('./RestfulInterface');

async function formSubmitHandler(e) {
    // For Debug
    e.preventDefault();

    // update post data
    const newPostData = Post.newPost(
        e.target.userCaption.value,
        e.target.userName.value)

    const existingPostData = getPostData();
    const updatedPostData = existingPostData.posts.push(newPostData.toJson());

    // NOTE: this is sent as an array of objects
    RestfulInterface.sendPostData(updatedPostData);
}

module.exports = formSubmitHandler;