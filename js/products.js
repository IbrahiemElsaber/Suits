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
  error: function (xhr, textStatus, err) {},
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

    // if (localStorage.getItem("user")) {
    //   // let arr = JSON.parse(localStorage.getItem("user"));
    //   let arr2 = JSON.parse(sessionStorage.getItem("userData"));
    //   for (let i = 0; i < arr.length; i++) {
    //     // if (arr[i].userName === null) {
    //     //   location.href = "./account.html";
    //     //   break;
    //     // } else
    //      if (arr2[i].userName1 === null) {
    //       location.href = "./account.html";
    //       RegisterForm.css("transform", "translateX(300px)");
    //       LoginForm.css("transform", "translateX(300px)");
    //       indicator.css("transform", "translateX(0px)");
    //       break;
    //     }
    //   }
    // } else {







      $("#addProductToCart").on("click", function () {
        //   let arr = JSON.parse(localStorage.getItem("user"));
        // for (let i = 0; i < arr.length; i++) {
        //   if (arr[i].userName !== null) {
        $(".disabled").removeClass("disabled");
        let productQuantity = $("#proQuantity").val();
        let finalPrice = localStorage.getItem("productLastP").slice(1);
        let totalPrice = parseInt(productQuantity) * parseInt(finalPrice);

        if (localStorage.getItem("productDemo")) {
          let productDetailsArray = JSON.parse(
            localStorage.getItem("productDemo")
          );
          let productDetailsObj = {
            imageSource: localStorage.getItem("imageSrc"),
            productNme: localStorage.getItem("productName"),
            productBrnd: localStorage.getItem("productBrand"),
            productFinalPrice: localStorage.getItem("productLastP"),
            productQuantity: productQuantity,
            productTotalPrice: totalPrice,
          };
          productDetailsArray.push(productDetailsObj);
          localStorage.setItem(
            "productDemo",
            JSON.stringify(productDetailsArray)
          );
        } else {
          let productDetailsArray = [];
          let productDetailsObj = {
            imageSource: localStorage.getItem("imageSrc"),
            productNme: localStorage.getItem("productName"),
            productBrnd: localStorage.getItem("productBrand"),
            productFinalPrice: localStorage.getItem("productLastP"),
            productQuantity: productQuantity,
            productTotalPrice: totalPrice,
          };
          productDetailsArray.push(productDetailsObj);
          localStorage.setItem(
            "productDemo",
            JSON.stringify(productDetailsArray)
          );
        }
        //     }
        //   else{
        //     alert("you must login first");
        //     location.href = './account.html'
        //   }
        // }
      });
    // }

let productDetailsArray = JSON.parse(localStorage.getItem("productDemo")) || [];

for (let i = 0; i < productDetailsArray.length; i++) { 
  let finalTotalPrice = 0;
  let name = productDetailsArray[i].productNme;
  let imgSrc = productDetailsArray[i].imageSource;
  let brand = productDetailsArray[i].productBrnd;
  let price = productDetailsArray[i].productFinalPrice;
  let quantity = productDetailsArray[i].productQuantity;
  let total = productDetailsArray[i].productTotalPrice;
  
  // finalTotalPrice += total;

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
            // let f = parseInt($("#totalPriceAmount").val());
            // finalTotalPrice+=f;

      
            $("#orderBtn").on("click", function () {
      
    

     var emailVal = $("#emailInput").val();
     $("#emailP").text(emailVal);
     
    // $("#Receipt").append(`
    // <b>Product Name:</b><span style="color:orange">${name}</span>
    // <b>Product Price is:</b><span style="color:orange">${price}</span>
    // <b>Product Quantity:</b><span style="color:orange">${quantity}</span>
    // <b>total Amount is:</b><span style="color:orange">$${total}</span>

    // `)
    $(`
    <b>Product Name:</b><span style="color:orange">${name}</span>
    <b>Product Price is:</b><span style="color:orange">${price}</span>
    <b>Product Quantity:</b><span style="color:orange">${quantity}</span>
    <b>total Price is:</b><span style="color:orange">$${total}</span>
 
 ------------------------</br>
    `).insertBefore(".totalAmount");
    // for (let i = 0; i < productDetailsArray.length; i++) {
    //   let total = productDetailsArray[i].productTotalPrice;
    //   total += total;
      
    // }
      


    
  });
  
  $("#totalPrice").text(total);
}

//  total +=total;
//   $("#Receipt").append(`------------------------</br>
//   <b>Total price is:</b><span style="color:orange">$${total}</span></br>------------------------</br>`)
