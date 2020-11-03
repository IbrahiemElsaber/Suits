//Fetch Products from products.json file into Gallery Page
// and Showing Products from products.json into Gallery Page
export let fetChProductsFile = $.ajax({
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

    //Show full description on product after click See more button on Gallery page
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

export let showProductFullDetails = $("#productDetails").prepend(`<div class="col-md-3">
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
