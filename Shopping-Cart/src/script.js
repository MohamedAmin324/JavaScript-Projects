"use strict";

import { getTotalNumberOfProducts, selectedProducts, updateSelectedProducts } from "./cart.js";
import { getItems, generateCard } from "./data-generator.js";


const mainElement = document.querySelector("main");
const totalProductsIndex = document.querySelector(".total-products");

function updateNumberPanel(element, productName) {
    const numberPanel = element.nextElementSibling;
    numberPanel.innerText = `${ selectedProducts.hasOwnProperty(productName) ? selectedProducts[productName] : 0 }`
}

getItems().then((items) => {
    const codeString = items.reduce((str, item) => str + generateCard(item), "");
    mainElement.innerHTML = codeString;
    const controlButtons = document.querySelectorAll("button");

    controlButtons.forEach((btn) => {
        btn.addEventListener("click", ({ target }) => {
            const productName = target.closest(".card-body").querySelector(".product-name").innerText;

            if (target.classList.contains("decrement-number")) {
                if (!selectedProducts.hasOwnProperty(productName)) return;

                updateSelectedProducts(productName, "decrement", items);
                updateNumberPanel(target, productName);
                totalProductsIndex.innerText = getTotalNumberOfProducts();
                localStorage.setItem("products list", JSON.stringify(selectedProducts));
                return;
            }

            updateSelectedProducts(productName, "increment", items);
            const numberPanel = target.previousElementSibling;
            numberPanel.innerText = `${ selectedProducts[productName] }`
            totalProductsIndex.innerText = getTotalNumberOfProducts();
            localStorage.setItem("products list", JSON.stringify(selectedProducts));
        })
    })
});

window.onload = () => {
    totalProductsIndex.innerText = getTotalNumberOfProducts();
    const decrementButtons = document.querySelectorAll(".decrement-number");
    decrementButtons.forEach((btn) => {
        const productName = btn.closest(".card-body").querySelector(".product-name").innerText;
        updateNumberPanel(btn, productName);
    })
}
