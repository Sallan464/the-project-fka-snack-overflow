const initEventListeners = require('./initEventListeners');
const renderLastModified = require('./views/pageView');
const pageRefreshHandler = require('./controllers/pageRefreshHandler');
const renderAllPosts = require('./views/postView');

initEventListeners();
renderLastModified();
pageRefreshHandler();
renderAllPosts();