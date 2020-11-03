export let addToCartBtn = $("#addProductToCart").on("click", function () {
  let productQuantity = $("#proQuantity").val();
  let finalPrice = localStorage.getItem("productLastP").slice(1);
  let totalPrice = parseInt(productQuantity) * parseInt(finalPrice);
  let productDetailsArray =
    JSON.parse(localStorage.getItem("productDemo")) || [];
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
