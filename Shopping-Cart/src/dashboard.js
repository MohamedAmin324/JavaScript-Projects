import { getTotalNumberOfProducts } from "./cart.js";

const totalProductsIndex = document.querySelector(".total-products");


window.onload = () => totalProductsIndex.innerText = getTotalNumberOfProducts();


