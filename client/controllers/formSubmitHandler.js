const Post = Require('../models/Post');
const getPostData = Require('./RestfulInterface');

async function formSubmitHandler(e) {
    // For Debug
    e.preventDefault();

    // update post data
    const newPostData = Post.newPost(
        this.state.selectedFile.name,
        e.target.userCaption.value,
        e.target.userName.value)

    const existingPostData = getPostData();

    let combinedPostData = [];
    if (this.props.posts.length > 0) {
        for (let p of this.props.posts) {
            combinedPostData.push(p.toJson());
        }
    }
    // combinedPostData.push(newPostData.toJson);
    console.log(combinedPostData);

    // NOTE: this is sent as an array of objects
    axios.post('http://localhost:8080/new-post-data', combinedPostData)
        .then(res => {
            console.log(res);
        })

    // Upload image
    const fileData = new FormData(); //FormData is a React defualt
    fileData.append('image', this.state.selectedFile, `${newPostData.id}.png`) // use date of creation as UUID
    axios.post('http://localhost:8080/new-post-img', fileData)//'url that accepts form data added and send to server url to store uploaded file in backend', formData)
        .then(res => {
            console.log(res);
        })
}

module.exports = formSubmitHandler;