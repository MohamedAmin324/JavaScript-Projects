import { getTotalNumberOfProducts, selectedProducts, chosenProductsReferences, getTotalBillValue } from "./cart.js";
import { generateLabel, generateUserOptionsCode } from "./data-generator.js";

const EMPTY_CART_HTML_CODE = `
        <p class="empty-alert">Cart is Empty</p>
        <a class="home-btn" href="./index.html" >Back to Home</a>`

const totalProductsIndex = document.querySelector(".total-products");
const main = document.querySelector("main");

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

        if (main.childElementCount === 2) {
                clearCart();
                return;
        }

        main.removeChild(label);

        chosenProductsReferences.splice(chosenProductsReferences.findIndex((reference) => reference.name === productName), 1);
        delete selectedProducts[productName];

        localStorage.setItem("chosen products references", JSON.stringify(chosenProductsReferences));
        localStorage.setItem("products list", JSON.stringify(selectedProducts));

        totalProductsIndex.innerText = getTotalNumberOfProducts();
        totalBillValue.innerText = getTotalBillValue();
}

function updateProductStatus() {
        const labelInfo = this.closest(".label-info");
        const productName = labelInfo.querySelector(".label-name-text").innerText;
        const productNumber = labelInfo.querySelector(".number");
        const productTotalCost = labelInfo.querySelector(".label-total-cost");

        if (this.classList.contains("increment-number")) {
                selectedProducts[productName] += 1;
                updateLabelInfo(productName, productNumber, productTotalCost);
                return;
        }

        if (productNumber.innerText === "1") {
                removeChosenProduct.call(this);
                return;
        }

        selectedProducts[productName] -= 1;
        updateLabelInfo(productName, productNumber, productTotalCost);
}

// update the elements inside the div with the class label-info
function updateLabelInfo(productName, productNumber, productTotalCost) {
        productNumber.innerText = selectedProducts[productName];
        productTotalCost.innerText = `$ ${ selectedProducts[productName] * chosenProductsReferences.find((reference) => reference.name === productName).price }`;
        totalProductsIndex.innerText = getTotalNumberOfProducts();
        localStorage.setItem("products list", JSON.stringify(selectedProducts));
        main.querySelector(".total-bill-value").innerText = getTotalBillValue();
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

        const checkoutBtn = document.querySelector(".checkout-btn");
        const clearBtn = document.querySelector(".clear-btn");
        const cancelBtns = document.querySelectorAll(".cancel-btn");
        const controlButtons = document.querySelectorAll(".decrement-number, .increment-number");

        checkoutBtn.addEventListener("click", ()=> alert("The backend part may be done in the near future using IDK php & MySql"));
        clearBtn.addEventListener('click', clearCart);
        cancelBtns.forEach((btn) => btn.addEventListener("click", removeChosenProduct));
        controlButtons.forEach((btn) => btn.addEventListener("click", updateProductStatus));
})
