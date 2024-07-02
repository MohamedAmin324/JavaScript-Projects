import { getTotalNumberOfProducts, selectedProducts, chosenProductsReferences, getTotalBillValue } from "./cart.js";
import { generateLabel } from "./data-generator.js";

const EMPTY_CART_HTML_CODE = `
        <p class="empty-alert">Cart is Empty</p>
        <a class="home-btn" href="./index.html" >Back to Home</a>`


const totalProductsIndex = document.querySelector(".total-products");
const main = document.querySelector("main");

const generateUserOptionsCode = () =>
        `<div class="container">
<h2 class="total-bill">Total Bill : $<span class="total-bill-value">${ getTotalBillValue() }</span></h2>
<div class="user-options">
<button class="checkout-btn">Checkout</button>
<button class="clear-btn">Clear Cart</button>
</div>
</div>
`

function clearCart() {
        chosenProductsReferences.length = 0;
        Object.keys(selectedProducts).forEach((prop) => {
                delete selectedProducts[prop];
        });

        localStorage.setItem("chosen products references", JSON.stringify(chosenProductsReferences));
        localStorage.setItem("products list", JSON.stringify(selectedProducts));

        totalProductsIndex.innerText = 0;

        main.innerHTML = EMPTY_CART_HTML_CODE;
}

function removeChosenProduct() {
        const label = this.closest(".label");
        const productName = label.querySelector(".label-name-text").innerText;
        const totalBillValue = main.querySelector(".total-bill-value");

        if(main.childElementCount === 2) {
                clearCart();
                return;
        }
        
        main.removeChild(label);

        chosenProductsReferences.splice(chosenProductsReferences.findIndex((reference)=> reference.name === productName), 1);
        delete selectedProducts[productName];

        localStorage.setItem("chosen products references", JSON.stringify(chosenProductsReferences));
        localStorage.setItem("products list", JSON.stringify(selectedProducts));

        totalProductsIndex.innerText = getTotalNumberOfProducts();
        totalBillValue.innerText = getTotalBillValue();
}

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

        const clearBtn = document.querySelector(".clear-btn");
        const cancelBtns = document.querySelectorAll(".cancel-btn");
        cancelBtns.forEach((btn) => btn.addEventListener("click", removeChosenProduct));


        clearBtn.addEventListener('click', clearCart);

})
