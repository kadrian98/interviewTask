const content = document.querySelector("#app");
const btnDisc = document.getElementById("disc");
const btnAsc = document.getElementById("asc");
const filterBtn = document.getElementById("filterBtn");

let arrData = [];

fetch("data.json")
  .then(response => response.json())
  .then(data => {
    arrData = data;
    displayData();
  })
  .catch(error => {
    console.error(error);
  });

function displayData() {
  content.innerHTML = "";

  const reversedData = arrData.reverse();

  reversedData.forEach(item => {
    let itemDiv = document.createElement("div");
    itemDiv.innerHTML = `<div class="card">
    <div class="card-header">
      <div class="card-title">${item.title}</div>
      
      <div class="card-date">${item.date}</div>
    </div>
    <div class="card-content">
    ${item.category}
      <p class="card-text">
        ${item.content}
      </p>
    </div>
  </div>`;
    content.appendChild(itemDiv);
  });
}

btnDisc.addEventListener("click", sortPostsDisc);

function sortPostsDisc() {
  const sortedPostsDisc = arrData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  displayData(sortedPostsDisc);
}

btnAsc.addEventListener("click", sortPostsAsc);

function sortPostsAsc() {
  const sortedPostsAsc = arrData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  displayData(sortedPostsAsc);
}

filterBtn.addEventListener("click", filterByDateRange);

function filterByDateRange() {
  const startDate = new Date(document.querySelector("#start-date").value);
  const endDate = new Date(document.querySelector("#end-date").value);

  const filteredPosts = arrData.filter(post => {
    const postDate = new Date(post.date);
    return postDate >= startDate && postDate <= endDate;
  });

  displayData(filteredPosts);
  console.log(filteredPosts);
}
