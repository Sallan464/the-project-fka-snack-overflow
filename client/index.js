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
