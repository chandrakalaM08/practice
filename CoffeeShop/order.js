let mainContainer = document.getElementById("order-container");
let orderTotal = document.getElementById("order-total");
let totalAmount = 0;

let couponInput = document.querySelector("#coupon-text");
let couponButton = document.querySelector("#coupon-button");
let coffeeOrderData = JSON.parse(localStorage.getItem("buy")) || [];

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

    let buttonElement = document.createElement("div");
    buttonElement.style.display = "flex";
    buttonElement.style.justifyContent = "space-around";
    let incrementButton = document.createElement("button");
    incrementButton.textContent = "+";

    incrementButton.addEventListener("click", () => {
      let cartItems = JSON.parse(localStorage.getItem("buy")) || [];

      let selectedItem = element;
      let updatedCart = cartItems.map((element) => {
        if (selectedItem.id === element.id) {
          element.quantity += 1;
        }
        return element;
      });

      localStorage.setItem("buy", JSON.stringify(updatedCart));
      displayDataInDOM(updatedCart);
    });

    let quantity = document.createElement("p");
    quantity.textContent = element.quantity;
    let decrementButton = document.createElement("button");
    decrementButton.textContent = "-";

    decrementButton.addEventListener("click", () => {
      let cartItems = JSON.parse(localStorage.getItem("buy")) || [];

      let selectedItem = element;
      let updatedCart = cartItems.map((element) => {
        if (selectedItem.id === element.id) {
          element.quantity -= 1;
        }
        return element;
      });

      localStorage.setItem("buy", JSON.stringify(updatedCart));
      displayDataInDOM(updatedCart);
    });
    buttonElement.append(incrementButton, quantity, decrementButton);
    let buttonToCancel = document.createElement("button");
    buttonToCancel.textContent = "Cancel";
    buttonToCancel.classList.add("cancel-button");

    buttonToCancel.addEventListener("click", () => {
      let cartItems = JSON.parse(localStorage.getItem("buy")) || [];

      let selectedItem = element;
      let updatedCart = cartItems.filter(
        (element) => selectedItem.id !== element.id
      );

      localStorage.setItem("buy", JSON.stringify(updatedCart));
      displayDataInDOM(updatedCart);
    });

    cardElement.append(
      image,
      name,
      ingredientList,
      description,
      price,
      buttonElement,
      buttonToCancel
    );
    mainContainer.append(cardElement);
  });

  totalAmount = data.reduce((acc, ele) => {
    return (acc += ele.price * ele.quantity);
  }, 0);

  orderTotal.textContent = totalAmount;
}

couponButton.addEventListener("click", handleCoupon);
function handleCoupon() {
  console.log(totalAmount, typeof totalAmount);
  if (couponInput.value === "Masai30") {
    totalAmount = Math.floor(totalAmount * 0.7);
  } else {
    alert("Enter valid coupoun");
  }

  orderTotal.textContent = totalAmount;
}

displayDataInDOM(coffeeOrderData);
