const selectedProducts = {};

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

export { selectedProducts, updateSelectedProducts };
