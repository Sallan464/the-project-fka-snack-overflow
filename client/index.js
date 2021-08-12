

import axios from 'axios';

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


//closes form and calls create post
function newSnaccFormHandler(e){
    createPost()
    closeForm()
}

//sends data to teh server which would then display it 
function createPost(){
    //snaccrr has some of this code
}

//opens the form on click
function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
//closes it after submission
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}