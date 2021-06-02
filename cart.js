/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 500; 
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;
  
  /* Sum up row totals */
  $('.product').each(function () {
    ('.subtotal') += parseFloat($(this).children('.product-line-price').text());
  });
  
  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;
  
  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('.cart-subtotal').html(subtotal.toFixed(2));
    $('.cart-tax').html(tax.toFixed(2));
    $('.cart-shipping').html(shipping.toFixed(2));
    $('.cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;
  
  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });  
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = (removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}


addToCartBtn = document.getElementsByClassName('addToCartBtn');
cartContainer = document.getElementsByClassName('cartContainer')[0];


for (var i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener('click', updateCartContainer)
}

function updateCartContainer(e) {
    addToCartBtn = e.target;
    productContainer = addToCartBtn.parentElement;
    productTitle = productContainer.getElementsByClassName('productTitle')[0].innerText;
    productPrice = productContainer.getElementsByClassName('productPrice')[0].innerText;
    productimg = productContainer.getElementsByClassName('img')[0].src;

    cartTitles = cartContainer.getElementsByClassName('cartTitle');
    for (var i = 0; i < cartTitles.length; i++) {
        if (cartTitles[i].innerText == productTitle) {
            alert('Product already to cart');
            return;
        }
    }


    AddRowInCart(productTitle, productPrice, productimg);





}

// add new row in cart
function AddRowInCart(productTitle, productPrice, productimg) {


    div = document.createElement('div');
    div.classList.add('row');
    insideDiv = `<div class="col-xs-3 cartImage"> <img src="${productimg}"></div>
<div class="col-xs-3 cartTitle"> ${productTitle} </div>
<div class="col-xs-3 cartPrice"> ${productPrice}</div>
 <div class="col-xs-3 removeButton"> Remove</div>`;
    div.innerHTML = insideDiv
    cartContainer.appendChild(div);
    totalPrice = 0;
    cartPrice = cartContainer.getElementsByClassName('cartPrice');
    for (var i = 0; i < cartPrice.length; i++) {
        priceFormatedNumb = cartPrice[i].innerText.replace('₹', '').replace(',', '');
        totalPrice = totalPrice + parseInt((priceFormatedNumb));
    }
    document.getElementsByClassName('cartTotalPrice')[0].innerText = new Number(totalPrice).toLocaleString('en');;



    removeButton = document.getElementsByClassName('removeButton');
    for (var i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', removeFromCart)
    }
}



// remove product from Cart

function removeFromCart(e) {
    e.target.parentElement.remove();
    updatePriceAfterRemove();
}


function updatePriceAfterRemove() {
    totalPrice = 0;
    cartPrice = cartContainer.getElementsByClassName('cartPrice');
    for (var i = 0; i < cartPrice.length; i++) {
        priceFormatedNumb = cartPrice[i].innerText.replace('₹', '').replace(',', '');
        totalPrice = totalPrice + parseInt((priceFormatedNumb));
    }
    document.getElementsByClassName('cartTotalPrice')[0].innerText = new Number(totalPrice).toLocaleString('en');


}