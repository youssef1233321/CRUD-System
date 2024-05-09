var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn")
var regex = /^[A-Z][a-z]{3,15}$/i;
var regex2 = /^[1-9]{1,7}$/;
var productsContainer = [];

if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProducts(productsContainer);
}



function addProduct () {
    if (regex.test(productNameInput.value) == true ) {
        if (regex2.test(productPriceInput.value)== true){
            var product = {
                name : productNameInput.value , 
                price : productPriceInput.value ,
                category : productCategoryInput.value ,
                desc : productDescriptionInput.value 
            };
            productsContainer.push(product);
            localStorage.setItem("products" , JSON.stringify(productsContainer) )
            displayProducts(productsContainer);
            clearData();
        }
        else {
            alert("the price must be numbers or must be less than 8 numbers ")
            clearData();
        }
    }
    else {
        alert("wrong name");
        clearData();
    }
}

function clearData() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
}

function displayProducts(arr){
    var cartona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartona += `<tr>
        <td>${arr[i].name}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].desc}</td>
        <td><button onclick ="updateItem(${i})" class="btn btn-outline-info btn-sm ">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn  btn-outline-primary btn-sm ">delete</button></td>
        </tr>`;
        
    }
    
    document.getElementById('tableBody').innerHTML = cartona;
}
 
function deleteProduct(productIndex) {
    productsContainer.splice(productIndex,1);
    localStorage.setItem("products" , JSON.stringify(productsContainer) )
    displayProducts(productsContainer)
}

function searchItem (keyy) {
    var match = [];
    for (var i = 0 ; i<productsContainer.length ; i++){
         if (productsContainer[i].name.toLowerCase().includes(keyy.toLowerCase()) ===true){
                match.push(productsContainer[i]);
         }
    }
    
    displayProducts(match)
}

function updateItem (ind) {
    addBtn.classList.add("d-none");
    updateBtn.classList.replace("d-none" , "d-block")
    productNameInput.value = productsContainer[ind].name
    productPriceInput.value = productsContainer[ind].price
    productCategoryInput.value = productsContainer[ind].category
    productDescriptionInput.value = productsContainer[ind].desc
}

function updateProduct () {

    for (var i = 0 ; i < productsContainer.length ; i++){
        if (productNameInput.value === productsContainer[i].name){
            productsContainer[i].price = productPriceInput.value;
            productsContainer[i].category = productCategoryInput.value;
            productsContainer[i].desc = productDescriptionInput.value;
            
        }
    }
    localStorage.setItem("products" , JSON.stringify(productsContainer) )
    addBtn.classList.replace ("d-none" , "d-block" )
    updateBtn.classList.replace("d-block" , "d-none")
    clearData()
    displayProducts(productsContainer);

    
}   

