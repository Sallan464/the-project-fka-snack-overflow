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
                mode: "no-cors",
                body: JSON.stringify(updatedPostData)
            })
            .then(res => { console.log(res) })
            .catch(err => console.log(err));
    }

}

RestfulInterface.getPostData();

module.exports = RestfulInterface;

},{"node-fetch":6}],2:[function(require,module,exports){
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
},{"../models/Post":5,"./RestfulInterface":1}],3:[function(require,module,exports){
const RestfulInterface = require('./RestfulInterface');
const renderAllPosts = require('../views/postView');

async function pageRefreshHandler() {
    console.log('called pageRefreshHandler')
    const updatedPostData = await RestfulInterface.getPostData();
    renderAllPosts(updatedPostData)
}

module.exports = pageRefreshHandler;
},{"../views/postView":7,"./RestfulInterface":1}],4:[function(require,module,exports){
// const Post = require('./models/Post');
// const RestfulInterface = require('./controllers/RestfulInterface');
// function dropdownFunction() {
//     document.getElementById("myDropdown").classList.toggle("container");
// }
const formSubmitHandler = require('./controllers/formSubmitHandler');

// let myDropdown = document.getElementById("myDropdown");
document.getElementById('drop-down-toggle').addEventListener('click', () => {
    document.getElementById('myDropdown').classList.toggle("hidden");
})

// document.getElementById("myDropdown").addEventListener('', () => {classList.toggle("container")});

window.onclick = function (event) {
    if (!event.target.matches('.btn')) {

        let dropdown = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdown.length; i++) {
            let openDropdown = dropdown[i];
            if (openDropdown.classList.contains('container')) {
                openDropdown.classList.remove('container');
            }
        }
    }
}

// Comment JS
let likeIcon = document.getElementById("like"),
    likeCounter = likeIcon.nextElementSibling,
    loveIcon = document.getElementById("love"),
    loveCounter = loveIcon.nextElementSibling,
    comment = document.getElementById("comment"),
    addComment = comment.nextElementSibling,
    commentsContainer = document.getElementById("comments-container"),
    commentCounter = document.getElementById("comment-counter");

likeIcon.addEventListener("click", function () {
    this.classList.toggle("like");
    let numberOfLikes = Number(likeCounter.textContent);
    if (this.classList.contains("like")) {
        numberOfLikes++;
        likeCounter.textContent = numberOfLikes;
    } else {
        numberOfLikes--;
        likeCounter.textContent = numberOfLikes;
    }
});

loveIcon.addEventListener("click", function () {
    this.classList.toggle("love");
    let numberOfLoves = Number(loveCounter.textContent);
    if (this.classList.contains("love")) {
        numberOfLoves++;
        loveCounter.textContent = numberOfLoves;
    } else {
        numberOfLoves--;
        loveCounter.textContent = numberOfLoves;
    }
});

addComment.addEventListener("click", function () {
    let numberOfComments = Number(commentCounter.textContent),
        date = new Date();
    numberOfComments++;
    commentCounter.textContent = numberOfComments;
    commentsContainer.style.display = "block";
    commentsContainer.innerHTML +=
        `<div>${comment.value}
            <span>${date.toLocaleTimeString()} - ${date.toLocaleDateString()}</span>
            <i class="fa fa-trash"></i>
         </div>`;
    comment.value = "";
    let deleteIcons = document.querySelectorAll(".container .comments div i");
    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].addEventListener("click", function () {
            this.parentElement.style.display = "none";
            numberOfComments--;
            commentCounter.textContent = numberOfComments;
        });
    }
});

document.getElementById('last-modified').textContent = `last modified: ${document.lastModified}`;


// module.exports = dropdownFunction;
// to do, add JS animation for burger menu

const pageRefreshHandler = require('./controllers/pageRefreshHandler');
// document.getElementById("refresh-page-button").addEventListener("click", () => pageRefreshHandler());


// async function formSubmitHandler(e) {
//     // For Debug
//     e.preventDefault();

//     // update post data
//     const newPostData = Post.newPost(
//         e.target.userCaption.value,
//         e.target.userName.value)

//     const existingPostData = await getPostData();
//     const updatedPostData = existingPostData.posts.push(newPostData.toJson());

//     // NOTE: this is sent as an array of objects
//     RestfulInterface.sendPostData(updatedPostData);
// }

// document.getElementById("new-post-form").addEventListener('submit', (e) => formSubmitHandler(e));

// document.getElementById("new-post-form").addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     let content = formData.get('content');

//     if (content.trim()) {
//         errorElement.style.display = 'none';
//         form.style.display = 'none';

//         content = {
//             'content': content
//         };

//         fetch(API_URL + "/snacks", {
//             method: 'POST',
//             mode: 'cors',
//             body: JSON.stringify(content),
//             headers: {
//                 'content-type': '`application/json'
//             }

//         }).then(response => {
//             if (!response.ok) {
//                 const contentType = response.headers.get('content-type');
//                 if (contentType.includes('json')) {
//                     return response.json().then(error => Promise.reject(error.message));
//                 } else {
//                     return response.text().then(message => Promise.reject(message));
//                 }
//             }
//         }).then(() => {
//             form.reset();
//             setTimeout(() => {
//                 form.style.display = '';
//             }, 30000);
//             listAllSnacks();
//         }).catch(errorMessage => {
//             form.style.display = '';
//             errorElement.textContent = errorMessage;
//             errorElement.style.display = '';
//         });
//     } else {
//         errorElement.textContent = 'Where is the #Content!?';
//         errorElement.style.display = '';
//     }
// });
// // document.getElementById("test-button").addEventListener("click", () => console.log('test'));
// // console.log('test');
// // const dropdownFunction = require('./app.js')
// // const giphy = require('./controllers/giphy.js')

// // function getPosts() {
// //     // use axios to call api
// // }


// // function updatePosts() {
// //     // use axios to call api
// // }


// // function renderPosts(posts) {
// //     // get reference to document
// //     // for post of posts document.appendElement
// // }


// // // handlers (might not be needed here)
// // function newPostSubmitHandler() {

// // }


// // //closes form and calls create post
// // function newSnaccFormHandler(e) {
// //     createPost()
// //     closeForm()
// // }

// // //sends data to teh server which would then display it 
// // function createPost() {
// //     //snaccrr has some of this code
// // }

// // //opens the form on click
// // function openForm() {
// //     document.getElementById("myForm").style.display = "block";
// // }

// // //closes it after submission
// // function closeForm() {
// //     document.getElementById("myForm").style.display = "none";
// // }

},{"./controllers/formSubmitHandler":2,"./controllers/pageRefreshHandler":3}],5:[function(require,module,exports){
class Post {

    static idCounter = 0;

    constructor(caption, userName = 'anon', score = 0, date = new Date()) {  // id = posts.length) {
        if (!userName) userName = 'anon';
        this._date = date;
        this._score = score;
        this.caption = caption;
        this.userName = userName;
        this.comments = [];
        this.id = ++Post.idCounter;
    }

    static newPost(caption, userName = 'anon', score = 0, date = new Date()) {
        return new Post(caption, userName, score, date);
    }

    static newPostFromJson(json) {
        return new Post(json.caption, json.userName, json.score, json.date)
    }

    toJson() {
        return {
            'id': `${this.id}`,
            'caption': `${this.caption}`,
            'userName': `${this.userName}`,
            'score': `${this._score}`,
            'date': `${this._date}`,
            'comments': `${this.comments}`
        }
    }

    get score() {
        return this._score;
    }

    incrementScore() {
        this._score++;
    }

    decrementScore() {
        this._score--;
    }
}

module.exports = Post;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{"../controllers/RestfulInterface":1}]},{},[4]);
