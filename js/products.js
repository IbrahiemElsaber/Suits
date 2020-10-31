$.ajax({
  url: "products.json",
  dataType: "json",
  cache: false,
  success: function (products, status) {
    $.each(products, function (index) {
      $(
        "#cardRow"
      ).append(`<div class="col-lg-3"><div class="card"><img class="img-fluid mb-3 img1" 
      src="${products[index].productImg}"/><h5>${products[index].productName}</h5><p>${products[index].productBrand}
              <small><del>${products[index].firstPrice}</del><span>${products[index].lastPrice}</span></small>
              <a class="btn btn-link btn-sm see-more-btn seeMore" href = "./products.html">Read more</a>
            </p></div></div>`);
    });

    $(".seeMore").each(function (index) {
      $(this).on("click", function () {
        let imgSrc = products[index].productImg,
          productName = products[index].productName,
          productBrand = products[index].productBrand,
          productFirstP = products[index].firstPrice,
          productLastP = products[index].lastPrice;
        localStorage.setItem("imageSrc", imgSrc);
        localStorage.setItem("productName", productName);
        localStorage.setItem("productBrand", productBrand);
        localStorage.setItem("productLastP", productLastP);
      });
    });
  },
  error: function (xhr, textStatus, err) { },
});

$("#productDetails").prepend(`<div class="col-md-3">
      <img src="${localStorage.getItem("imageSrc")}" class="w-100 product-img">
    </div>
    <div class="col-md-6 mb-3" >
      <!-- <p class="product-details text-center">NEW</p> -->
      <h2 class="product-details-header">${localStorage.getItem(
  "productName"
)}</h2>
      <p>Product Brand: ${localStorage.getItem("productBrand")}</p>
      <img src="./images/5stars.jpg" class="stars">
      <p class="price"> USD ${localStorage.getItem("productLastP")}</p>
      <p><b>Availability: </b>In Stock</p>
      <p><b>Condition: </b>New</p>
      <p><b>Brand: </b>ABC Company</p>
      <label><b>Quantity:</b> </label>
      <input class="quantity" id="proQuantity" type="number" value="1" min="0" max="50">
      <button class="btn btn-default add-to-cart-btn" id="addProductToCart" >Add To Cart</button>
      <a class="btn btn-default add-to-cart-btn" href="./cart.html" >My Cart</a>
    </div>

`);

$("#addProductToCart").on("click", function () {
  let productQuantity = $("#proQuantity").val();
  let finalPrice = localStorage.getItem("productLastP").slice(1);
  let totalPrice = parseInt(productQuantity) * parseInt(finalPrice);
  let productDetailsArray = JSON.parse(localStorage.getItem("productDemo")) || [];
  let productDetailsObj = {
    imageSource: localStorage.getItem("imageSrc"),
    productNme: localStorage.getItem("productName"),
    productBrnd: localStorage.getItem("productBrand"),
    productFinalPrice: localStorage.getItem("productLastP"),
    productQuantity: productQuantity,
    productTotalPrice: totalPrice,
  };
  productDetailsArray.push(productDetailsObj);
  localStorage.setItem("productDemo", JSON.stringify(productDetailsArray));
});

let productDetailsArray = JSON.parse(localStorage.getItem("productDemo")) || [];

let finalTotalPrice = 0;
for (let i = 0; i < productDetailsArray.length; i++) {
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

  $("#orderBtn").on("click", function () {
    if (clicked == false) {
      clicked = true;
    }
    else return;
    let emailVal = $("#emailInput").val();
    $("#emailP").text(emailVal);
    $(`<b>Product Name:</b><span style="color:orange">${name}</span>
    <b>Product Price is:</b><span style="color:orange">${price}</span>
    <b>Product Quantity:</b><span style="color:orange">${quantity}</span>
    <b>total Price is:</b><span style="color:orange">$${total}</span>
 
 ------------------------</br>`).insertBefore(".totalAmount");
  });

  $("#totalPrice").text(finalTotalPrice);
}
