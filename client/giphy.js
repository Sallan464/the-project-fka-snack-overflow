const API_KEY = "tuOLY6MjNDivfAeEQMCriqwtQON4q687"
let btnSearch = document.getElementById('btnSearch');

btnSearch.addEventListener("click", (e) => {
  e.preventDefault(); 
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=10&q=`;
    let str = document.getElementById("search").value.trim();
    console.log("str = "+str)
    url = url.concat(str);
    console.log(url);
          fetch(url)
            .then(response => response.json())
            .then(content => {
              console.log(content.data);
              console.log("META", content.meta);

              let fig = document.createElement("figure");
              let img = document.createElement("img");
              let fc = document.createElement("figcaption");

              img.src = content.data[0].images.downsized.url;
              img.alt = content.data[0].title;
              fc.textContent = content.data[0].title;
              
              fig.appendChild(img);
              fig.appendChild(fc);
              let out = document.querySelector(".out"); // out is a carry over from the HTML I tested this on
              out.insertAdjacentElement("afterbegin", fig);
              document.querySelector("#search").value = "";
            })
            .catch(err => {
              console.error(err);
            });
        });
      