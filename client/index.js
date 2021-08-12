const pageRefreshHandler = require('./controllers/pageRefreshHandler');

document.getElementById("refresh-btn").addEventListener("click", () => pageRefreshHandler());
// nothing yet