"use strict";

import { getTotalNumberOfProducts, selectedProducts, updateSelectedProducts } from "./cart.js";

const mainElement = document.querySelector("main");
const totalProductsIndex = document.querySelector(".total-products");

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
            <button data-name=${ name } class="decrement-number">-</button>
            <span class="number">0</span>
            <button data-name=${ name } class="increment-number">+</button>
            </div>

        </div>
        </div>
    </div> `

getItems().then((items) => {
    const codeString = items.reduce((str, item) => str + generateProductHtmlCode(item), "");
    mainElement.innerHTML = codeString;
    const controlButtons = document.querySelectorAll("button");

    controlButtons.forEach((btn) => {
        btn.addEventListener("click", ({ target }) => {
            if (target.classList.contains("decrement-number")) {
                if (!selectedProducts.hasOwnProperty(target.dataset.name)) return;

                updateSelectedProducts(target.dataset.name, "decrement");
                const numberPanel = target.nextElementSibling;
                numberPanel.innerText = `${ selectedProducts.hasOwnProperty(target.dataset.name) ? selectedProducts[target.dataset.name] : 0 }`
                totalProductsIndex.innerText = getTotalNumberOfProducts();
                localStorage.setItem("products list", JSON.stringify(selectedProducts));
                return;
            }

            updateSelectedProducts(target.dataset.name, "increment");
            const numberPanel = target.previousElementSibling;
            numberPanel.innerText = `${ selectedProducts[target.dataset.name] }`
            totalProductsIndex.innerText = getTotalNumberOfProducts();
            localStorage.setItem("products list", JSON.stringify(selectedProducts));
        })
    })
});

window.onload = () => totalProductsIndex.innerText = getTotalNumberOfProducts();
