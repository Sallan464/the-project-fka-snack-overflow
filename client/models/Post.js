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