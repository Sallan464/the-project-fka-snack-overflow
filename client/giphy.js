const API_KEY = "tuOLY6MjNDivfAeEQMCriqwtQON4q687";
let btnSearch = document.getElementById("btnSearch");

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=10&q=`;
  let str = document.getElementById("search").value.trim();
  console.log("str = " + str);
  url = url.concat(str);
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((content) => {
      console.log(content.data);
      console.log("META", content.meta);
      for (let i = 0; i < content.data.length; i++) {
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");

        img.src = content.data[i].images.downsized.url;
        img.alt = content.data[i].title;
        fc.textContent = content.data[i].title;

        // add a button to choose which gif you want 
        let button = document.createElement('button');
        button.textContent = "Post";
        button.onclick = selectGif(img);

        fig.appendChild(img);
        fig.appendChild(fc);
        fig.appendChild(button);
        
        let out = document.querySelector(".out"); // out is a carry over from the HTML I tested this on
        out.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#search").value = "";
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

function selectGif(img){
  //send img to server and post it somewhere
}