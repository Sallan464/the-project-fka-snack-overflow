(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fetch = require('node-fetch');

class RestfulInterface {

    static async getPostData() {
        let retval;
        await fetch('http://localhost:8080/get-posts')
            .then(resp => resp.json())
            .then(json => retval = json);
        return retval;
    }

    static sendPostData(updatedPostData) {
        fetch("http://localhost:8080/new-post-data",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(updatedPostData)
            })
            .then(res => { console.log(res) })
            .catch(err => console.log(err));
    }

}

RestfulInterface.getPostData();

module.exports = RestfulInterface;

},{"node-fetch":4}],2:[function(require,module,exports){
const RestfulInterface = require('./RestfulInterface');
const renderAllPosts = require('../views/postView');

async function pageRefreshHandler() {
    console.log('called pageRefreshHandler')
    const updatedPostData = await RestfulInterface.getPostData();
    renderAllPosts(updatedPostData)
}

module.exports = pageRefreshHandler;
},{"../views/postView":5,"./RestfulInterface":1}],3:[function(require,module,exports){
// const dropdownFunction = require('./app.js')
const pageRefreshHandler = require('./controllers/pageRefreshHandler');
document.getElementById("refresh-page-button").addEventListener("click", () => pageRefreshHandler());
// document.getElementById("test-button").addEventListener("click", () => console.log('test'));
// console.log('test');
// const dropdownFunction = require('./app.js')
// const giphy = require('./controllers/giphy.js')

// function getPosts() {
//     // use axios to call api
// }


// function updatePosts() {
//     // use axios to call api
// }


// function renderPosts(posts) {
//     // get reference to document
//     // for post of posts document.appendElement
// }


// // handlers (might not be needed here)
// function newPostSubmitHandler() {

// }


// //closes form and calls create post
// function newSnaccFormHandler(e) {
//     createPost()
//     closeForm()
// }

// //sends data to teh server which would then display it 
// function createPost() {
//     //snaccrr has some of this code
// }

// //opens the form on click
// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }

// //closes it after submission
// function closeForm() {
//     document.getElementById("myForm").style.display = "none";
// }

},{"./controllers/pageRefreshHandler":2}],4:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
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
},{"../controllers/RestfulInterface":1}]},{},[3]);
