const selectedProducts = localStorage.getItem("products list") ? JSON.parse(localStorage.getItem("products list")) : {};

const chosenProductsReferences = localStorage.getItem("chosen products references") ? JSON.parse(localStorage.getItem("chosen products references")) : [];

function updateSelectedProducts(productName, operationCode, fetchedItems) {
    if (!["increment", "decrement"].includes(operationCode)) {
        throw new Error("Operation unauthorized");
    }

    if (operationCode === "increment") {
        if (selectedProducts.hasOwnProperty(productName)) {
            selectedProducts[productName]++;
            return;
        }

        selectedProducts[productName] = 1;
        updateChosenProductsList(productName, fetchedItems);
        return
    }

    if (selectedProducts.hasOwnProperty(productName) && selectedProducts[productName] > 1) {
        selectedProducts[productName]--;
        return;
    }

    if (selectedProducts.hasOwnProperty(productName)) {
        delete selectedProducts[productName];
        updateChosenProductsList(productName, fetchedItems, "delete");
    }
}

function updateChosenProductsList(productName, fetchedItems, operationKey) {
    const reference = fetchedItems.find((item) => item.name === productName);

    if (operationKey === "delete") {
        chosenProductsReferences.splice(chosenProductsReferences.findIndex(({ name }) => name === productName), 1);
        localStorage.setItem("chosen products references", JSON.stringify(chosenProductsReferences));
        return;
    }

    // if (fetchedItems.find((item) => item.name === productName) !== undefined) return;
    chosenProductsReferences.push(reference);
    localStorage.setItem("chosen products references", JSON.stringify(chosenProductsReferences));
}

const getTotalNumberOfProducts = () => {
    const productsNumbers = Object.values(selectedProducts);
    if (productsNumbers.length === 0) return 0;
    return productsNumbers.reduce((total, number) => total + number, 0);
}

export { selectedProducts, updateSelectedProducts, getTotalNumberOfProducts, chosenProductsReferences, updateChosenProductsList };
