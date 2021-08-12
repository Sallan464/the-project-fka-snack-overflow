const pageRefreshHandler = require('./controllers/pageRefreshHandler');
const dropdownFunction = require('./app.js')
const giphy = require('./controllers/giphy.js')

document.getElementById("refresh-btn").addEventListener("click", () => pageRefreshHandler());

function getPosts() {
    // use axios to call api
}


function updatePosts() {
    // use axios to call api
}


function renderPosts(posts) {
    // get reference to document
    // for post of posts document.appendElement
}


// handlers (might not be needed here)
function newPostSubmitHandler() {

}


