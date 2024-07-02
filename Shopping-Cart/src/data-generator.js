import { getTotalBillValue } from "./cart.js";

async function getItems() {
    const data = await fetch("./src/data.json");
    const items = await data.json();

    return items;
}

// generate code for a card of a product displayed in the main page
const generateCard = ({ id, desc, name, img, price }, number = 0) =>
    ` <div class="card" id=${ id }>
        <img src=${ img } class="card-image" alt="product image">

        <div class="card-body">
        <h2 class="product-name">${ name }</h2>

        <p class="product-description">${ desc }</p>

        <div class="wrapper display-flex">
            <span class="product-price">$  ${ price }</span>

            <div class="order-commands">
            <button class="decrement-number">-</button>
            <span class="number">${ number === undefined ? 0 : number }</span>
            <button class="increment-number">+</button>
            </div>

        </div>
        </div>
    </div> `


// generate code for a label of a chosen product
const generateLabel = ({ id, name, img, price }, number) => `
<div class="label" id=${ id }>
            <figure>
                <img class="label-img" src=${ img } />
            </figure>
            <div class="label-info">
                <p class="label-name"><span class="label-name-text">${ name }</span> <span class="label-price">$ ${ price }</span>
                </p>
                <div class="order-commands">
                    <button class="decrement-number">-</button>
                    <span class="number">${ number }</span>
                    <button class="increment-number">+</button>
                    </div>
                    <p class="label-total-cost">$ ${ number * price }</p>
                </div>
                <button class="cancel-btn">X</button>
        </div>
`

const generateUserOptionsCode = () =>
    `<div class="container">
<h2 class="total-bill">Total Bill : $ <span class="total-bill-value">${ getTotalBillValue() }</span></h2>
<div class="user-options">
<button class="checkout-btn">Checkout</button>
<button class="clear-btn">Clear Cart</button>
<a class="home-btn" href="./index.html" >Back to Home</a>
</div>
</div>
`

export { getItems, generateCard, generateLabel, generateUserOptionsCode }
