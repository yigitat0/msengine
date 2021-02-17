let key = "903c5b0"

const input = document.querySelector("#input");
const button = document.querySelector("#button");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let value = "";
let pagenr = 1;

input.addEventListener("input", (e) => {
    e.preventDefault();
    value = input.value;
});

button.addEventListener("click", () => {
    pagenr = 1;
    getmovie(value,pagenr)
});

async function getmovie(value,pagenr)
{
    if (value==="")return;
    const data=await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${value}&page=${pagenr}`
    );
	
document.querySelector(".display").innerHTML = ""; 
    const result=await data.json();
    result.Search.forEach((item) => {
        let moviediv = document.createElement("div");
        moviediv.classList.add("movie")
        let poster = document.createElement("div");
        poster.classList.add("poster");
        let img = document.createElement("img")
        img.src = `${item.Poster}`==="N/A" ?(img.src="./img/noimg.jpg"): `${item.Poster}`;
        poster.appendChild(img);
        moviediv.appendChild(poster);

        let description = document.createElement("div");
        description.classList.add("description");
        description.innerHTML = `Title : ${item.Title}<br><br>Year : ${item.Year}<br><br> <a target="_blank" href ="https://www.imdb.com/title/${item.imdbID}"> IMDB : https://www.imdb.com/title/${item.imdbID}</a> `;

        moviediv.appendChild(description);

        document.querySelector(".display").appendChild(moviediv);

        
    })
    next.classList.add("visible");
    prev.classList.add("visible");
}

next.addEventListener("click", () => {
    if (value==="")return;
    pagenr++;
    getmovie(value,pagenr);
});
prev.addEventListener("click", () => {
    if (value === "")return;
    if (pagenr === 1) return;
    pagenr--;
    getmovie(value,pagenr);
});