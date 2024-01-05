import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";      // ../ used to go outside the curr folder
import { formatCurrency } from "../utils/money.js";  //here single ./ used to look into current folder
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"; //1. Named export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';    //2. default export-> used when we want to export only 1 thing
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

// const today = dayjs();
// const deliveryDate = today.add(7, 'days');  //here .add is method use to add 7 day form current day
// console.log(deliveryDate.format('dddd, MMMM D'));  //here .format is used to make date easy to read
// ESM(ecmascript) version is used to work with js module and external library together to avoid naming conflicts

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'                                             //days added shows length of time
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );


    cartSummaryHTML +=
      `
  <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
      ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.
        quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}"> 
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
    </div>

    ${deliveryOptionsHTML(matchingProduct, cartItem)}
  </div>
  </div>
  </div>
    `;
  });

  //we made delivery option html dyanmically 
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'                                             //days added shows length of time
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0   //it behave like a if else statement
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id ===
        cartItem.deliveryOptionId;

      html += `
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
      </div>
    `
    });
    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        //step to delete form the page
        //1. use DOM to get the element to remove 
        //2. use .remove() method

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );

        container.remove();

        renderPaymentSummary(); //used to regenerate payment summary after deleting product
      });
    });
  // used to delivery date acc to clicked option
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;   //here some shorthand property is used
        updateDeliveryOption(productId, deliveryOptionId);

        renderOrderSummary(); //used to re-generate the data
        renderPaymentSummary(); //regenerate after delition of product
      });
    });
}
//In avove code we use MVC tech to generate the data(design pattern)