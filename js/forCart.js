//Creating my cart table in cart page from products page on clicking myCurt button
export let productDetailsArray = JSON.parse(localStorage.getItem("productDemo")) || [];

export let finalTotalPrice = 0;
function productDetailsFunc (){for (let i = 0; i < productDetailsArray.length; i++) {
  let clicked = false;
  let name = productDetailsArray[i].productNme;
  let imgSrc = productDetailsArray[i].imageSource;
  let brand = productDetailsArray[i].productBrnd;
  let price = productDetailsArray[i].productFinalPrice;
  let quantity = productDetailsArray[i].productQuantity;
  let total = productDetailsArray[i].productTotalPrice;
  finalTotalPrice += total;

  $("#cartTable").append(`<tr id="count">
            <td class="cart-index align-middle">${name}</td>
            <td>
              <img
                class="cart-img rounded-circle"
                src="${imgSrc}"
                height="80px"
                width="80px"/>
            </td>
            <td class="cart-product align-middle">${brand}</td>
            <td class="cart-price align-middle">${price}</td>
            <td class="cart-quantity align-middle">${quantity}</td>
            <td class="cart-total-price align-middle"  id="totalPriceAmount">${total}</td>`);

  //Show Receipt modal on clicking Shop now button on Cart page
  $("#orderBtn").on("click", function () {
    if (clicked == false) {
      clicked = true;
    } else return;
    let emailVal = $("#emailInput").val();
    $("#emailP").text(emailVal);
    $(`<b>Product Name:</b><span style="color:orange">${name}</span>
    <b>Product Price is:</b><span style="color:orange">${price}</span>
    <b>Product Quantity:</b><span style="color:orange">${quantity}</span>
    <b>total Price is:</b><span style="color:orange">$${total}</span>
 
 ------------------------</br>`).insertBefore(".totalAmount");
  });

  $("#totalPrice").text(finalTotalPrice);
}}
export let productDetailsFuncCalling = productDetailsFunc();