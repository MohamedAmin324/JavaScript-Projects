import { getTotalNumberOfProducts, selectedProducts, chosenProductsReferences, getTotalBillValue } from "./cart.js";
import { generateLabel } from "./data-generator.js";

const EMPTY_CART_HTML_CODE = `
        <p class="empty-alert">Cart is Empty</p>
        <a class="home-btn" href="./index.html" >Back to Home</a>`


const totalProductsIndex = document.querySelector(".total-products");
const main = document.querySelector("main");

const generateUserOptionsCode = () => `
<div class="container">
<h2 class="total-bills">Total Bill : $${ getTotalBillValue() }</h2>
<div class="user-options">
<button class="checkout-btn">Checkout</button>
<button class="clear-btn">Clear Cart</button>
</div>
</div>
`

window.addEventListener("load", () => {
        totalProductsIndex.innerText = getTotalNumberOfProducts();
        if (getTotalNumberOfProducts() === 0) return;
        main.innerHTML = "";
        let codeString = generateUserOptionsCode();
        chosenProductsReferences.forEach((reference) => {
                const labelHtml = generateLabel(reference, selectedProducts[reference.name]);
                codeString += labelHtml;
        })
        main.innerHTML = codeString;
})
