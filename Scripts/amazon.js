//1. save the deta

//(create somthing in js that match like html using obj and arrays)
//here we use combination of obj and arrays to create a data structure.

// const products= [{
//     Image:'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name:' Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//         stars:4.5,
//         count: 87
//     },
//     priceCents: 1090 
// },{
//     Image: 'images/products/intermediate-composite-basketball.jpg',
//     name: 'Intermediate Size Basketball',
//     rating:{
//         stars:4,
//         count:127
//     },
//     priceCents:2095
// },{
//     Image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//     name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//     rating:{
//         stars:4.5,
//         count:56
//     },
//     priceCents:799 
// },{
//     Image: 'images/products/black-2-slot-toaster.jpg',
//     name: '2 Slot Toaster - Black',
//     rating:{
//         stars:5,
//         count:2197
//     },
//     priceCents:1899 
// }]; 

//above commented because we get products info from products.js file

//2. generate the html for each products and combine into a string(productsHTML) 

import { cart, addToCart } from "../data/cart.js";   //3...import the cart variable so that can use into the peoject
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let productsHTML = "";
products.forEach((products) => {
    productsHTML += `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(products.priceCents)}    
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>`;

});

//and now take the above html and put it on the wweb using DOM
document.querySelector('.js-products-grid').
    innerHTML = productsHTML;


//3. make it interactive


function updateCartQuantity(){
  //loop through the cart array to calculate the total quantity of the product
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });

  //here we use DOM to display to cart quantity on webpage
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;

}


document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;        //dataset gives us all the data attribute attached to button 

           addToCart(productId);
           updateCartQuantity();          
        });
    });


    // console.log("hello world");