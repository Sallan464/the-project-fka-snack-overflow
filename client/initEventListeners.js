function initEventListeners() {
    document.getElementById("refresh-page-button").addEventListener("click", () => pageRefreshHandler());
    document.getElementById("new-post-form").addEventListener('submit', (e) => formSubmitHandler(e));

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
}


module.exports = initEventListeners;