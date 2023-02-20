//https://63f0db035703e063fa4db207.mockapi.io/galerie

const content = document.querySelector(".content");
const categoryList = document.querySelectorAll(".tags__list");
const searchInput = document.querySelector(".search__input");
const photosArray = document.querySelectorAll(".collection");
const card = document.querySelector(".card");
const btnAll = document.querySelector('[data-filter="all"]');

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

async function renderPagination(page) {
  const resp = await fetch(
    `https://63f0db035703e063fa4db207.mockapi.io/galerie?page=${
      page ? page : 1
    }&limit=4`
  );

  const respData = await resp.json();
  console.log(respData);
  showPhotos(respData);
}

window.addEventListener("click", (event) => {
  const parentEl = event.target.closest(".pagination__ul");
  const pagination = document.querySelectorAll(".pagination__li");
  if (parentEl) {
    pagination.forEach((el) => {
      if (el.innerText == event.target.innerText) {
        el.classList.add("active");
        renderPagination(Number(event.target.innerText));
      } else {
        el.classList.remove("active");
      }
    });
  }
});

btnAll.addEventListener("click", () => {
  renderPagination();
});

window.addEventListener("click", (event) => {
  const parentEl = event.target.closest(".photo__imgs");
  if (parentEl) {
    const collectionBig = document.querySelectorAll(".collection__big");
    const collectionMini = document.querySelectorAll(".collection__mini");

    collectionMini.forEach((el) => {
      if (el.getAttribute("src").includes(event.target.getAttribute("src"))) {
        collectionBig.forEach((el, index) => {
          if (parentEl.classList.contains(index)) {
            el.setAttribute("src", event.target.getAttribute("src"));
          }
        });
      }
    });
  }
});

window.addEventListener("click", (event) => {
  const parentEl = event.target.closest(".tags");
  if (parentEl) {
    categoryList.forEach((el, id) => {
      if (el.innerText == event.target.innerText) {
        el.classList.add("active");

        filter(id);
      } else {
        el.classList.remove("active");
      }
    });
  }
});

function searchPhotos(event) {
  event.preventDefault();
  const value = event.target.value;
  const photosArray = document.querySelectorAll(".collection");

  photosArray.forEach((el) => {
    if (el.innerText.toLowerCase().includes(value.toLowerCase())) {
      el.classList.add("search");
    } else {
      el.classList.add("none");
    }
  });
}

function filter(category) {
  const secondchildren = document.querySelectorAll(".photo__card");

  secondchildren.forEach((item) => {
    const isItemFiltered = item.classList.contains(category);

    if (!isItemFiltered) {
      item.parentNode.classList.add("none");
    } else {
      item.parentNode.classList.remove("none");
    }
  });
}

function showPhotos(data) {
  content.innerHTML = "";

  data.forEach((el, index) => {
    const photoEl = document.createElement("div");
    photoEl.classList.add("collection");

    photoEl.innerHTML = `
        
        <div class='photo__card ${el.category}' id='${el.category}'>
        <div class='photo__imgs ${index}' />
        <img
        class="collection__big"
        src=${el.photos[0]}
        alt="Item"
        />
        <div class="collection__bottom">
        <img
        class="collection__mini"
        src=${el.photos[1]}
              alt="Item"
              />
              <img
              class="collection__mini"
              src=${el.photos[2]}              
              alt="Item"
              />
              <img
              class="collection__mini"
              src=${el.photos[3]}              
              alt="Item"
              />
              </div>
              </div>
              <h4 >${el.name}</h4>
              </div>
              
              `;
    content.appendChild(photoEl);
  });
}
renderPagination();
