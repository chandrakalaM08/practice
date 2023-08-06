let mainContainer = document.getElementById("menu-container");
let minimumPrice = document.getElementById("lower");
let maximumPrice = document.getElementById("upper");
let filterButton = document.getElementById("filter-btn");
let sortOrder = document.getElementById("sort");
let alert = document.getElementById("alert");
let sortOption = "";
let url =
  "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee";

sortOrder.addEventListener("change", () => {
  if (sortOrder.value === "asc") {
    sortOption = "asc";
  } else if (sortOrder.value === "desc") {
    sortOption = "desc";
  } else {
    sortOption = "";
  }
  fetchCoffeeData();
});

let coffeeData = [];

async function fetchCoffeeData() {
  let updatedUrl;
  if (sortOption) {
    updatedUrl = url + `?sort=price&order=${sortOption}`;
  } else {
    updatedUrl = url;
  }
  try {
    let result = await fetch(updatedUrl);
    result = await result.json();
    resultData = result.data;
    coffeeData = resultData;
    displayDataInDOM(coffeeData);
  } catch (error) {
    console.log(error.message);
  }
}

fetchCoffeeData();

function displayDataInDOM(data) {
  mainContainer.innerHTML = "";
  data.forEach((element) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    let image = document.createElement("img");
    image.setAttribute("src", element.image);

    let name = document.createElement("h2");
    name.textContent = element.title;

    let description = document.createElement("p");
    description.textContent = element.description;

    let ingredientList = document.createElement("ul");
    ingredientList.classList.add("ingredient-list");
    element.ingredients.forEach((ele) => {
      let item = document.createElement("li");
      item.textContent = ele;
      item.style.listStyleType = "none";
      ingredientList.append(item);
    });

    let price = document.createElement("h3");
    price.textContent = `₹ ${element.price}`;

    let buttonToBuy = document.createElement("button");
    buttonToBuy.textContent = "Buy";
    buttonToBuy.classList.add("buy-button");

    buttonToBuy.addEventListener("click", () => {
      let cartItems = JSON.parse(localStorage.getItem("buy")) || [];

      let selectedItem = element;
      selectedItem.quantity = 1;
      let coffee = cartItems.find((element) => selectedItem.id === element.id);

      if (coffee) {
        alert.textContent = "Already Placed Order";
      } else {
        cartItems = [...cartItems, selectedItem];
        localStorage.setItem("buy", JSON.stringify(cartItems));
        alert.textContent = "Successfully Placed Order";
      }
    });
    cardElement.append(
      image,
      name,
      ingredientList,
      description,
      price,
      buttonToBuy
    );
    mainContainer.append(cardElement);
  });
}

// writing filter logic here

filterButton.addEventListener("click", handleFilter);

function handleFilter() {
  let min = +minimumPrice.value;
  let max = +maximumPrice.value;

  let filteredData = coffeeData.filter(
    (el) => el.price <= max && el.price >= min
  );

  displayDataInDOM(filteredData);
}
