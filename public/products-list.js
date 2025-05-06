"use strict";
(function () {
    window.addEventListener("load", init);
    function init() {
        //load products

        let newButton = id("new-product-btn");
        newButton.addEventListener("click", function () {
            id("form-popup").style.display = "block";
        });

        let saveButton = id("save-product");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let closeButton = id("cancel-btn");
        closeButton.addEventListener("click", function (e) {
            id("form-container").reset();
            id("form-popup").style.display = "none";
        });

        let deleteButtons = qsa(".delete-product");
        for (let index = 0; index < deleteButtons.length; index++) {
            const element = deleteButtons[index];
            element.addEventListener("click", function (e) {
                let myId = e.currentTarget.getAttribute("id");
                deleteGame(e.currentTarget.getAttribute("id"));
            });

        }
    }

    function submitForm() {
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        fetch("/products/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: jsonBody,
        })
            .then(checkStatus)
            .then(reload)
            .catch(alert);
    }

    function deleteGame(prodId) {
        console.log(prodId);
        fetch("/products/delete/" + prodId, {
            method: "DELETE"
        })
            .then(checkStatus)
            .then(reload)
            .catch(alert);
    }

    function reload() {
        location.reload();
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function id(idName) {
        return document.getElementById(idName);
    }

    function qsa(className) {
        return document.querySelectorAll(className);
    }

    function loadproducts() {
        let gamesDiv = document.getElementById("items-container");
        fetch("/products/all")
            .then(checkStatus)
            .then((response) => {
                for (const item of response) {
                    addGame(prodDiv, item);
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }
    
    function addProduct(prodDiv, prodObject) {
        let article = document.createElement("article");
        let itemDiv = document.createElement("div");

        let heading = document.createElement("h3");
        heading.appendChild(document.createTextNode(prodObject.prodId));

        let itemName = document.createElement("p");
        itemName.appendChild(document.createTextNode(prodObject.prodName));

        let itemImg = document.createElement("img");
        itemImg.src = prodObject.imgUrl;

        let itemPrice = document.createElement("p");
        itemPrice.appendChild(document.createTextNode(prodObject.price));

        let itemCat = document.createElement("p");
        itemCat.appendChild(document.createTextNode(prodObject.catId));

        itemDiv.appendChild(heading);
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemImg);
        itemDiv.appendChild(itemPrice);
        itemDiv.appendChild(itemCat);

        itemDiv.classList.add("text");
        article.classList.add("item");

        article.appendChild(itemDiv);
        prodDiv.appendChild(article);
    }

})();
