const RestfulInterface = require('../controllers/RestfulInterface');

function getPostHTML(post) {
    // TODO: put post design below
    return `<li>${post.id}, ${post.caption}, ${post.userName}</li>`
}

function renderAllPosts(posts) {

    const postList = document
        .getElementById('post-list')

    let buffer = '';

    for (post of posts.posts) {
        buffer += getPostHTML(post)
    }

    // NOTE: must sanitise prior
    postList.innerHTML = buffer;
}

module.exports = renderAllPosts;