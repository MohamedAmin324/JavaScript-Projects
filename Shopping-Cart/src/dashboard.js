import { getTotalNumberOfProducts, selectedProducts, chosenProductsReferences } from "./cart.js";
import { generateLabel } from "./data-generator.js";

const EMPTY_CART_HTML_CODE = `
        <p class="empty-alert">Cart is Empty</p>
        <a class="home-btn" href="./index.html" >Back to Home</a>`

const totalProductsIndex = document.querySelector(".total-products");
const main = document.querySelector("main");




window.onload = () => {
        totalProductsIndex.innerText = getTotalNumberOfProducts();
        if (getTotalNumberOfProducts() === 0) return;
        main.innerHTML = "";
        chosenProductsReferences.forEach((reference) => {
                const labelHtml = generateLabel(reference, selectedProducts[reference.name]);
                main.innerHTML += labelHtml;
        })
}
