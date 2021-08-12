const { post } = require("../../server/server");

const Post = Require('../models/Post');
const RestfulInterface = Require('./RestfulInterface');

async function commentSubmitHandler(e) {
    // For Debug
    e.preventDefault();

    const comment = e.target.comment.value;
    const id = e.target.postId.value;
    const postData = await getPostData();
    for (post of existingPostData.posts) {
        if (post.id == id) {
            post.comments.push(comment);
        }
    }

    RestfulInterface.sendPostData(postData);
}

module.exports = commentSubmitHandler;