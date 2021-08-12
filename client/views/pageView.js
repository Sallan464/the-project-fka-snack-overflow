function renderLastModified() {
    document.getElementById('last-modified').textContent = `last modified: ${document.lastModified}`;
}

module.exports = renderLastModified;
