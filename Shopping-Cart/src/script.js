"use strict"

async function getItems() {
    const data = await fetch("./src/data.json");
    const items = await data.json();

    return items;
}


const generateProductHtmlCode = ({ id, desc, name, img, price }) =>
    ` <div class="card" id=${ id }>
        <img src=${ img } class="card-image" alt="product image">

        <div class="card-body">
        <h2 class="product-name">${ name }</h2>

        <p class="product-description">${ desc }</p>

        <div class="wrapper display-flex">
            <span class="product-price">$  ${ price }</span>

            <div class="order-commands">
            <button class="decrement-number">-</button>
            <span class="number">0</span>
            <button class="increment-number">+</button>
            </div>

        </div>
        </div>
    </div> `

const mainElement = document.querySelector("main");

getItems().then((items) => {
    const codeString = items.reduce((str, item) => str + generateProductHtmlCode(item), "");
    mainElement.innerHTML = codeString;
});
