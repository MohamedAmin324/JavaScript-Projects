const selectedProducts = localStorage.getItem("products list") ? JSON.parse(localStorage.getItem("products list")) : {};

function updateSelectedProducts(productName, operationCode) {
    if (!["increment", "decrement"].includes(operationCode)) {
        throw new Error("Operation unauthorized");
    }

    if (operationCode === "increment") {
        selectedProducts.hasOwnProperty(productName) ? selectedProducts[productName]++ : selectedProducts[productName] = 1;
        return;
    }

    selectedProducts.hasOwnProperty(productName) && selectedProducts[productName] > 1 ? selectedProducts[productName]-- : delete selectedProducts[productName];
}

const getTotalNumberOfProducts = () => {
    const productsNumbers = Object.values(selectedProducts);
    if (productsNumbers.length === 0) return 0;
    return productsNumbers.reduce((total, number) => total + number, 0);
}

export { selectedProducts, updateSelectedProducts, getTotalNumberOfProducts };
