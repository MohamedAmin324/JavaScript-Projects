"use strict"

async function getItems() {
    const data = await fetch("./src/data.json");
    const items = await data.json();

    return items;
}


const generateProductHtmlCode = ({ id, desc, name, img, price }) =>
    ` <div class="product" id=${ id }>
        <img src=${ img } alt="product image">

        <h2>${ name }</h2>

        <p>${ desc }</p>

        <div class="wrapper">
            <span class="product-price">${ price }</span>

            <div class="order-commands">
            <button class="increment-number">-</button>
            <span class="number">0</span>
            <button class="decrement-number">+</button>
            </div>

        </div>
    </div> `

const mainElement = document.querySelector("main");

getItems().then((items) => {
    const codeString = items.reduce((str, item) => str + generateProductHtmlCode(item), "");
    mainElement.innerHTML = codeString;
});
