const RestfulInterface = require('../controllers/RestfulInterface');

function getPostHTML(post) {
    // TODO: put post design below
    return `<li>${post.id}</li>`
}

function renderAllPosts(posts) {

    const allPosts = RestfulInterface.getPostData();

    const postList = document
        .getElementById('postList')

    let buffer = '';
    // TODO: sanitise buffer here

    for (post of posts) {
        buffer += getPostHTML(post)
    }

    // NOTE: must sanitise prior
    postList.innerHTML = buffer;
}

module.exports = renderAllPosts;