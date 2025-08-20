
//view page error if user is offline and 
// view Home page if user is online
const noInternet = document.querySelector('.noInternet');
const internet = document.querySelector('.internet')
window.onload = () => {
    if (window.navigator.onLine) {
        noInternet.style.display = 'none';
        internet.style.display = 'block'
    } else {
        noInternet.style.display = 'block';
        internet.style.display = 'none'
    }
}

window.addEventListener("online", () => {
    noInternet.style.display = 'none'
    internet.style.display = 'block'
}
);

window.addEventListener("offline", () => {
    noInternet.style.display = 'block';
    internet.style.display = 'none'
});

// -------------------------------------------------------------------------------------------------------------------
// window.addEventListener('DOMContentLoaded', function () {
//     drawData();
//     search.focus();
// });

let container = document.querySelector(".products")
let AddToCartBtn = document.querySelector(".AddToCartBtn")
let RemoveFromCartBtn = document.querySelector(".RemoveFromCartBtn")

let products = [
    { id: 1, title: "Dell G15-5520", category: "Labtop", color: "Black", price: "36870", salePrice: "36270", imageURL: "images/Labtop1.jpg" },
    { id: 2, title: "Lenovo V15", category: "Labtop", color: "gray", price: "13333", salePrice: "13011", imageURL: "images/Labtop2.jpg" },
    { id: 3, title: "HP Victus", category: "Labtop", color: "Black", price: "47699", salePrice: "47438", imageURL: "images/Labtop3.jpg" },
    { id: 4, title: "Dell Vostro", category: "Labtop", color: "Black", price: "29660", salePrice: "29320", imageURL: "images/Labtop4.jpg" },
    { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: "1699", salePrice: "1399", imageURL: "images/Earbuds1.jpg" },
    { id: 6, title: "R100", category: "Earbuds", color: "White", price: "1600", salePrice: "1499", imageURL: "images/Earbuds.jpg" },
    { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: "2899", salePrice: "2699", imageURL: "images/Earbuds3.jpg" },
    { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: "2485", salePrice: "1600", imageURL: "images/Earbuds4.jpg" },
    { id: 8, title: "Generic", category: "Over Ear", color: "Blue", price: "215", salePrice: "185", imageURL: "images/Over Ear1.jpg" },
    { id: 9, title: "Panduo", category: "smart watch", color: "Green", price: "450", salePrice: "375", imageURL: "images/smartwatch1.jpg" },
    { id: 10, title: "Muktrics", category: "smart watch", color: "Black", price: "400", salePrice: "350", imageURL: "images/smartwatch2.jpg" },
    { id: 11, title: "BigPlayer", category: "smart watch", color: "Brown", price: "730", salePrice: "650", imageURL: "images/smartwatch3.jpg" },
    { id: 12, title: "Galaxy A34", category: "phone", color: "Awesome Silver", price: "11286", salePrice: "10400", imageURL: "images/phone1.jpg" },
    { id: 13, title: "A24", category: "phone", color: "Black", price: "49900", salePrice: "38090", imageURL: "images/phone2.jpg" },
    { id: 14, title: "Oppo Reno 8T", category: "phone", color: "gray", price: "12793", salePrice: "12.445", imageURL: "images/phone3.jpg" },
    { id: 15, title: "Galaxy S22", category: "phone", color: "Green", price: "24299", salePrice: "24899", imageURL: "images/phone4.jpg" },
    { id: 16, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: "32800", salePrice: "33400", imageURL: "images/phone5.jpg" },
    { id: 17, title: "Galaxy S21", category: "phone", color: "Light Green", price: "21990", salePrice: "19299", imageURL: "images/phone6.jpg" },
    { id: 18, title: "Galaxy Z Fold5", category: "phone", color: "	Light blue", price: "73930", salePrice: "66000", imageURL: "images/phone7.jpg" },
]

function drawData(items) {
  

  let allCarts = items.map(({id,color,imageURL,title, category, price, salePrice}) => {
  
          
    let isFavorite = checkFavorite(id);

        let heartIconClass = isFavorite ? "fas" : "far";
       
        return `
            <div  class="product-item col-xl-3 col-md-4 col-sm-6 col-6 py-3 px-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${imageURL}" alt="Card image" style="width:60%; height:${category == 'phone' ? '170px' : '110px'};">
                    <div class="product-itm-desc card-body pb-0 pl-2">
                        <p class="card-title overflow-hidden">Product: ${title}.</p>
                        <p class="card-text  d-sm-block d-none">Category :${category}.</p>
                        <p class="color overflow-hidden">Color: ${color}.</p>
                        <p class="card-price overflow-hidden">Price: <span> <del>${price}</del> /${salePrice}<br/> EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between px-1">
                    <button id="add-btn-${id}" class="AddToCartBtn btn btn-primary mb-1" onClick="addTOCartEvent(${id})">Add To Cart</button>
                    <button id="remove-btn-${id}" class="RemoveFromCartBtn btn btn-primary mb-1" onClick="removeFromCart(${id})">Remove From Cart</button>
                        <i id="fav-${id}" class="${heartIconClass} fa-heart" onClick="addFav(${id})"></i>
                    </div>
                </div>
            </div>
        `;
        
 
});

// insert carts in container

container.innerHTML = allCarts.join('');}
  
// call in globel scope 
drawData(products);


// -------------------------------------------------------------------------------------------------------------

let badge = document.querySelector(".badge");
let buyProudect = document.querySelector(".buyProudect");
let totalPrice = document.querySelector(".total .totalPrice");
let shoppingCartIcon = document.querySelector(".shoppingCart");
let cartsProudect = document.querySelector(".cartsProudect");
// iniial value 
let quantity = 1;
let total = localStorage.getItem("totalPrice") ? +(localStorage.getItem("totalPrice")) : 0;

let addItemStorage = localStorage.getItem("proudectInCart") ? JSON.parse(localStorage.getItem("proudectInCart")) : [];
if (addItemStorage) {
    addItemStorage.map((item) => {
        drawBuyProudect(item);
        document.getElementById(`add-btn-${item.id}`).style.display = "none";
        document.getElementById(`remove-btn-${item.id}`).style.display = "inline-block";
        total += +item.salePrice * +(localStorage.getItem(`quantity-${item.id}`));
    })
    totalPrice.innerHTML = total / 2 + " EGP";


    if (addItemStorage.length != 0) {
        badge.style.display = "block";
        badge.innerHTML = addItemStorage.length;
    }
    else {
        badge.style.display = "none";
    }

}


function plas(id, salePrice) {
    // console.log(item);

    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +(quantityElement.innerHTML);

    quantity++;
    quantityElement.innerHTML = quantity;
    localStorage.setItem(`quantity-${id}`, quantity.toString());
    total += (+salePrice);
    totalPrice.innerHTML = total + " EGP";
    localStorage.setItem("totalPrice", JSON.stringify(total));
    openCart();
}
function mins(id, salePrice) {
    // console.log(item);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +(quantityElement.innerHTML);

    if (quantity > 1) {
        quantity--;
        quantityElement.innerHTML = quantity;
        localStorage.setItem(`quantity-${id}`, quantity.toString());
        total -= (+salePrice);
        totalPrice.innerHTML = total + " EGP";
        localStorage.setItem("totalPrice", JSON.stringify(total));
    }
    else {
        removeFromCart(id);
    }
    openCart();
}
function removeFromCart(id) {
    let itemIndex = addItemStorage.findIndex((item) => item.id === id);
    let quantityElement = document.getElementById(`quantity-${id}`);
    let quantity = +(quantityElement.innerHTML);

    if (itemIndex !== -1) {
        addItemStorage.splice(itemIndex, 1);
        localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

        total = 0;
        document.getElementById(`add-btn-${id}`).style.display = "inline-block";
        document.getElementById(`remove-btn-${id}`).style.display = "none";

        let buyProudectItem = document.getElementById(`buyProudectItem-${id}`);
        if (buyProudectItem) {
            buyProudectItem.remove();
        }

        addItemStorage.forEach((item) => {
            drawBuyProudect(item);
            total += +item.salePrice * quantity;
            // total += +item.salePrice * +(localStorage.getItem(`quantity-${item.id}`));

        });

        totalPrice.innerHTML = total + " EGP";
        localStorage.setItem("totalPrice", JSON.stringify(total));

        if (addItemStorage.length !== 0) {
            badge.style.display = "block";
            badge.innerHTML = addItemStorage.length;
        } else {
            badge.style.display = "none";
        }
    }
}
function addTOCartEvent(id) {
    let userName=JSON.parse(localStorage.getItem("userData")).userName
    if (userName) {
        let choosenItem = products.find((item) => item.id === id);
        let itemIndex = addItemStorage.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            drawBuyProudect(choosenItem);

            addItemStorage = [...addItemStorage, choosenItem];
            localStorage.setItem("proudectInCart", JSON.stringify(addItemStorage));

            let quantity = localStorage.getItem(`quantity-${choosenItem.id}`) ? +(localStorage.getItem(`quantity-${choosenItem.id}`)) : 1;

            total += (+choosenItem.salePrice) * quantity;
            totalPrice.innerHTML = total + " EGP";
            localStorage.setItem("totalPrice", JSON.stringify(total));

            document.getElementById(`add-btn-${id}`).style.display = "none";
            document.getElementById(`remove-btn-${id}`).style.display = "inline-block";

            if (addItemStorage.length != 0) {
                badge.style.display = "block";
                badge.innerHTML = addItemStorage.length;
            }
        } else {
            badge.style.display = "none";
        }
    } else {
        window.location = "login.html";
    }
}
function drawBuyProudect(item) {
    if (!document.getElementById(`buyProudectItem-${item.id}`)) {
        let quantity = +(localStorage.getItem(`quantity-${item.id}`)) || 1;

        buyProudect.innerHTML += `<div id="buyProudectItem-${item.id}" class="row my-2 pr-2">
        <span class="col-6">${item.title}</span>
        <span class="col-2" id="quantity-${item.id}">${quantity}</span>
        <span class="text-danger mins col-2" onClick="mins(${item.id},${item.salePrice})">-</span>
        <span class="text-success pls col-2" onClick="pls(${item.id},${item.salePrice})">+</span>
      </div>`;
    }
}

// --------------------------------------------------------------------------
function checkFavorite(itemId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // console.log(favorites);
    let isFavorite = favorites.includes(itemId);
    // console.log(isFavorite);

    return isFavorite;
    // return false;
}
// Function to refreash favorite status 
function addFav(id) {
    let userName = JSON.parse(localStorage.getItem("userData")).userName;
    if (userName) {
        var heartIcon = document.getElementById(`fav-${id}`);
        if (heartIcon.classList.contains("far")) {
            heartIcon.classList.remove("far");
            heartIcon.classList.add("fas");
            addToFavorites(id);
        } else {
            heartIcon.classList.remove("fas");
            heartIcon.classList.add("far");
            removeFromFavorites(id);
        }
    } else {
        window.location = "login.html";
    }
}

// Function to add an item to favorites
function addToFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites);
    if (!favorites.includes(itemId)) {
        favorites.push(itemId);
    }
    // console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to remove an item from favorites
function removeFromFavorites(itemId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // console.log(favorites);
    let index = favorites.indexOf(itemId);
    if (index !== -1) {
        favorites.splice(index, 1);
    }
    // console.log(favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
// -------------------------------------------------------------------
// shopping cart
shoppingCartIcon.addEventListener("click", openCart)

function openCart() {
    if (buyProudect.innerHTML != "") {
        if (cartsProudect.style.display == "block") {
            cartsProudect.style.display = "none"
        } else {
            cartsProudect.style.display = "block"
        }
    }
}


// --------------------------------------------------------------------------------------

// search
let search = document.getElementById('search');
let searchOption = document.getElementById('searchOption');
let modeSearch = 'title';


searchOption.addEventListener('change', function () {
    let selectedValue = this.value;

    if (selectedValue === "searchTittle") {
        modeSearch = 'title';
        console.log(searchOption.value);
    } else if (selectedValue === "searchCategory") {
        modeSearch = 'category';
        console.log(searchOption.value);
    }

    search.placeholder = `search by ${modeSearch}`;
    search.focus();
    search.value = '';
    drawData();
});


// -----
// search event 
function searchData(value) {
    let filteredProducts = products.filter((item) => {
        if (modeSearch === 'title') {
            return item.title.toLowerCase().includes(value.toLowerCase());
        } else if (modeSearch === 'category') {
            return item.category.toLowerCase().includes(value.toLowerCase());
        }
    });
    let pro = filteredProducts.map(({id,color,imageURL,title, category, price, salePrice}) => {

        let isFavorite = checkFavorite(id);

        let heartIconClass = isFavorite ? "fas" : "far";
        

        return `
            <div class="product-item col-4 mb-4 p-4">
                <div class="card border border-info pt-3">
                    <img class="product-item-img card-img-top m-auto" src="${imageURL}" alt="Card image" style="width:80%; height:${category == 'phone' ? '220px' : '150px'};">
                    <div class="product-itm-desc card-body pb-0 pl-4">
                        <p class="card-title">Product: ${title}.</p>
                        <p class="card-text">Category :${category}.</p>
                        <p class="color">Color: ${color}.</p>
                        <p class="card-price">Price: <span> <del>${price} EGP</del> ${salePrice} EGP</span></p>
                    </div>
                    <div class="product-item-action d-flex justify-content-between pr-4 pl-4">
                    <button id="add-btn-${id}" class="AddToCartBtn btn btn-primary mb-2" onClick="addTOCartEvent(${id})">Add To Cart</button>
                    <button id="remove-btn-${id}" class="RemoveFromCartBtn btn btn-primary mb-2" onClick="removeFromCart(${id})">Remove From Cart</button>
                        <i id="fav-${id}" class="${heartIconClass} fa-heart" onClick="addFav(${id})"></i>
                    </div>
                </div>
            </div>
        `;

    });


    container.innerHTML = pro.join('');
}

// handel tabs in web site

const items = document.querySelectorAll('.page-item')
const tabs = Array.from(items)

let reversePro = products.reverse()

function handelbtn(num, state) {
    drawData(reversePro)
    tabs.map((tab) => { tab.className = 'page-item' })
    tabs.filter((tab, index, tabs) => {
        if (index == num) { tabs[num].classList.add('active') }
    })

    tabs.filter((tab, index, tabs) => {
        if (num == tabs.length - 2) { tabs[tabs.length - 1].classList.add('disabled') }
        else if (num == 1) { tabs[0].classList.add('disabled') }
    })

    tabs.filter((tab, index, tabs) => {
        if (state == 'next') { tabs[num].classList.add('disabled'); tabs[num - 1].classList.add('active') }
    })
}


