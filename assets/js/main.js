import { api_key } from "../../config.js";

const tag = new Date().toLocaleDateString("default", { weekday: "long" });
const tagZahl = new Date().getDate();
const monat = new Date().toLocaleDateString("default", { month: "long" });
const jahr = new Date().getFullYear();
const date = `${tag}, ${tagZahl} ${monat}, ${jahr}`.toUpperCase();

const btn = document.querySelector("#show");
const datum = (document.querySelector("#date").innerHTML = date);

const fetchData = (url, imgDesc, images, urls) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const articleInject = document.querySelector(".multiple-articles");
      articleInject.innerHTML = "";
      data.articles.forEach((elt) => {
        let author = elt.author;
        let title = elt.title;
        let content = elt.description;

        let article = document.createElement("article");
        article.classList.add("beitrag");

        let heading = document.createElement("h3");
        heading.innerHTML = title;

        let text = document.createElement("p");
        text.innerHTML = content;

        let creator = document.createElement("p");
        creator.innerHTML = `~${author}`;

        article.appendChild(heading);
        article.appendChild(text);
        article.appendChild(creator);
        articleInject.appendChild(article);
      });
      let articles = document.querySelectorAll(".beitrag");
      urls = data.articles.map((elt) => elt.url);

      for (let i = 0; i < articles.length; i++) {
        articles[i].addEventListener("click", () => {
          window.open(urls[i], "_target");
        });
      }

      images = data.articles.map((elt) => elt.urlToImage);
      imgDesc = data.articles.map((elt) => elt.title);

      const imgDiv = document.querySelector(".img-div");
      const imgP = document.querySelector("#imgDesc");

      let index = 0;
      const change = () => {
        imgDiv.style.backgroundImage = `url(${images[index]})`;
        imgDiv.addEventListener("click", () => {
          window.open(urls[index - 1], "_target");
        });
        imgP.innerHTML = imgDesc[index];

        index == 99 ? (index = 0) : index++;
      };

      inter = setInterval(change, 5000);
    })
    .catch((err) => console.error("YAN gleich hackts...", err));
};
btn.addEventListener("click", () => {
  const inputText = document.querySelector("#textInput").value;
  const langSelect = document.querySelector("#lang").value;
  const sortSelect = document.querySelector("#sortBy").value;
  let images = [],
    imgDesc = [],
    urls = [];
  for (let i = 0; i < 100; i++) {
    window.clearInterval(i);
  }

  let url = `https://newsapi.org/v2/everything?q=${inputText}&sortBy=${sortSelect}&language=${langSelect}&apiKey=${api_key}`;
  console.log(sortSelect);
  console.log(langSelect);
  fetchData(url, images, imgDesc, urls);
});
