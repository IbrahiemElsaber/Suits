var productDetails = [{
        "product": "Toxic Suit",
        "price":2500
        },{
        "product": "men Suit",
        "price":1000
        },{
        "product": "women Suit",
        "price":2000
        },{
        "product": "child Suit",
        "price":500
         }]

         $(document).ready(function(){
           var cartImages = $(".cart-img");
           var cartProduct = $(".cart-product");
           var cartPrice = $(".cart-price");
           var cartQuantity = $(".cart-quantity");
           var cartTotal = $(".cart-total-price");
           var cartIndex = $(".cart-index");
           var finalTotal = 0;
           for (let i = 0; i < cartImages.length; i++) {
             var price =  productDetails[i].price;
             var quantity = Math.ceil(Math.random()* 10);
             var total = price * quantity;
             finalTotal+=total;
             $(cartImages[i]).attr('src','https://picsum.photos/id/' + Math.ceil(Math.random() * 100) + '/500/500');
             $(cartProduct[i]).text(productDetails[i].product);
             $(cartPrice[i]).html("$" +price);
             $(cartQuantity[i]).text(quantity);
             $(cartTotal[i]).text("$"+ total);
             $(cartIndex[i]).text(i+1);
             
           }
           


         })































// $.ajax({
//   url: "data.txt",
//   success: function (response) {
//     loop(JSON.parse(response));
//   }
// })
// var table = document.getElementById("std-table");

// function loop(response) {
//   var rows = response.map(function (item) {
//     return `<tr>
//               <td>${item.name}</td>
//               <td>${item.age}</td>
//               <td>${item.address}</td>
//               <td>${item.degree}</td>
//               <td>${item.track}</td>
//               <td class="discard-update controls"><button class=" btn btn-info btn-update">Edit</button> <button class=" btn btn-danger btn-delete">Delete</button> </td>
//             </tr>`;
//   });

//   table.innerHTML = rows.join("\n")
// }