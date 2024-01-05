//here we use module cocept to avoid naming confilicts with same name 
//module contain the variable inside the file
//modules are the better way to organize the code for bigger projects


//2... export the cart variable so that we can use outside the file
export let cart = JSON.parse(localStorage.getItem('cart'));    //JSON.parse use to convert string to normal data

if(!cart){
    cart = [{                                

        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId: '1' 
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId: '2'  
    }];
}


function saveToStorage(){               //this fun use to save data locally so that on refereshing the page data remain same as the action taken
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) => {                            //here we chack that is same product try to add in cart 
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
  
    if (matchingItem) {                                   //here we increase the cart quantity if cart has already a product
        matchingItem.quantity += 1;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId : '1'
        });
    }

    saveToStorage();
  }

 //for deleting the products from cart use this step
 //1. create a new array
 //2. loop through the cart
 //3. add each prodect to the new array except for this productId

  export function removeFromCart(productId){
    const newCart = [];
    
    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
  }

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });  
    matchingItem.deliveryOptionId= deliveryOptionId;  

    saveToStorage();
}
 
