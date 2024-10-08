let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let cartBox = document.querySelector('.cart-box');
let closeCart = document.querySelector('#close-cart');
// Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}
// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}

// Cart Working JS
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

// Making Function
function ready() {
    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for ( var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for ( var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //  Add  to Cart
    var addCart = document.getElementsByClassName('add-cart')
    for ( var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
//Buy Button
function buyButtonClicked(){
    alert('Your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    };
    updateTotal()
};

// Quantity Changes
function quantityChanged(e){
    var input = e.target
    if(isNaN(input.value) || input.value <= 0){
        input.parentElement.parentElement.remove()
    }
    updateTotal()
}

// Remove Items From Cart
function removeCartItem(e){
    var buttonClicked = e.target
    buttonClicked.parentElement.remove()
    updateTotal();
}
// Add To Cart
function addCartClicked(e){
    var button = e.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    cart.classList.add('active')
    addProductsToCart(title, price, productImg)
    updateTotal()
}
function addProductsToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    const id = cartShopBox.id = Math.floor(Date.now() * Math.random()).toString(36)
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for ( var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText === title){
            // alert('Your have already add this item to cart.')
            cartItemsNames[i].parentElement.parentElement.getElementsByClassName("cart-quantity")[0].value++
            updateTotal()
            return
        }
    };
var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <div class="cart-quantity-btn">
                    <button type="button" class="minus" id="minus-${id}"></button>
                    <input type="number" min='0' value="1" class="cart-quantity">
                    <button type="button" class="plus" id="plus-${id}"></button>
                </div>
            </div>
                <!-- Remove CArt -->
                <i class="bx bxs-trash-alt cart-remove"></i>
                `;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
};

// Update Total
function updateTotal(){
    var cartBoxes = document.getElementsByClassName('cart-box')
    var total = 0;
    if(cartBoxes.length === 0){
        cart.classList.remove('active')
    }
    for ( var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerHTML.replace('R$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

        //  If price Contain some Cents Value 
        total = Math.round(total *100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = 'R$ ' + total;
}

// Eventos

const decreament = (index) => {
    var cartBoxes = document.getElementsByClassName('cart-box')
    if(cartBoxes.length === 0){
        cart.classList.remove('active')
    }
        for ( var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i]
            if(cartBox.id === index){
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = parseInt(quantityElement.value) - 1;
            if(quantityElement.value === '0'){
                cartBox.remove()
                updateTotal()
            }
        }
        updateTotal()
        }
}
const increament = (index) => {
    var cartBoxes = document.getElementsByClassName('cart-box')
    if(cartBoxes.length === 0){
        cart.classList.remove('active')
    }
        for ( var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i]
            if(cartBox.id === index){
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
            quantityElement.value = parseInt(quantityElement.value) + 1
        }
        updateTotal()
        }
    
    }
const minusPlus = (e)=>{
    if(e.target.type == 'button'){
        const [action, index] = e.target.id.split('-')
        
        if(action == 'minus'){
            decreament(index)
        }else{
            increament(index)
        }
    }
}

document.querySelector(".cart")
        .addEventListener('click', minusPlus)