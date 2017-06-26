$(document).ready(function () {
    $.get("top-navbar.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
    });
    startProductTable();
    displayCatFilters();
});



function getCategories() {

    $.getJSON('rest/products/categories', function (data) {
        categories = data;
//        alert("categories" + categories);
        return categories;
    });

}

function getCategory(cat) {
//    alert("cat is" + cat);
    var result = "";
    $.each(categories, function (key, value) {

        if (value.name === cat) {
            result = value.readableName;
        }

    });
//    alert("result is: " + result);
    return result;

}


function startProductTable() {


    getCategories();
    $.getJSON('rest/products', function (data) {
        var datarow = " ";
        var rowindex = 0;

//        alert("first row is"+data.products[0]);
        $.each(data, function (key, value) {
            datarow += '<tr>';
            datarow += ' <td align=/"left/">' + value.name + ' </td>';
//          datarow += ' <td align=/"left/">' + value.category + ' </td>';
            datarow += ' <td align=/"left/">' + getCategory(value.category) + ' </td>';
            datarow += ' <td align=/"left/">' + value.brand + ' </td>';
            datarow += ' <td align=/"left/">' + value.price + ' </td>';
            datarow += ' <td align=/"left/">' + value.stockCount + ' </td>';
            datarow += ' <td align=/"left/">' + value.info + ' </td>';
            datarow += ' <td align=/"left/" > <input id="quantity_field" type="text" name="quantity"/>';  
            datarow += ' <td align=/"left/" class="/click_button/" onclick=\"addProduct(this, ' + rowindex + ',' + value.id + ',' + value.price + ')\"><strong>Voeg toe</strong></td>';
             
            datarow += '</tr>';
            rowindex++;
        });
        $('#productsTable').append(datarow);
    });
}

function addProduct(button, index, productId, prijs) {       
       var cartId = $("#IdId").val();

        console.log(button);
        tablerow = button.parentNode.getElementById('quantity_field');
                //var quantity = $(tablerowchildren.item(6).valueOf());
       //console.log(quantity);
 
               console.log(prijs);
                       //console.log(totalPrice);
        productUrl = "rest/products/" + productId;
        cartUrl = "rest/carts/" + cartId;
        $.getJSON(productUrl, function(product) {
            $.getJSON(cartUrl, function(cart) {
                
                var jsonData = 
//                        {"cartsuborder":{"quantity" : "1",
//                        "subTotal": prijs,
//                        "cart" : cart,
//                        "product" : product
//                        }};
                        { "cart":cart,
                          "id":"0",  
                          "product":product,
                          "quantity":1,
                          "subTotal":prijs }
                      
                        
                $.ajax({
                   type: "POST",
                   url: "rest/cartsuborders",
                   data: JSON.stringify(jsonData),
                   contentType: "application/json",
                   success: function () {

                       // window.location.href = "customer_cart.html?id=1";
                   },
                   error: function () {
                       console.log(jsonData);
                       console.log(" /n/n/n");
                       console.log(JSON.stringify(jsonData));
                   }
               });
            });   
        });
}    
//                $.when(
//                    $.getJSON(productUrl),
//                    $.getJSON(cartUrl)
//                    ).done(function(product, cart) {
//                        
//                    jsonData = {"cartsuborder":{"quantity" : "1",
//                        "subTotal": prijs,
//                        "cart" : cart,
//                        "product" : product
//                        }};
//                        console.log(JSON.stringify(jsonData));
                        
              
                

        
//           $.ajax({
//            type: "GET",
//            url: "rest/products/" + productId,
//            contentType: "application/json",
//            succes: function(productDB){
//                product = productDB;
//            }
            
               
                
//                   },
//                   
//             error: function () {
//                   console.log("fail 1");
//                      
//                   }  
//           });       
               
            
        
           
       
//    window.location.href = "edit-product.html?" + id;



//function displayCategories() {
//
//    $.getJSON('rest/products/categories', function (data) {
//        var textline = "";
//        $.each(data, function (key, value) {
//            textline += '<p class="cheeseCategorie">' + value.name + ' : ' + value.readableName + ' </p>';
//        });
//        $('#categories').text("").append(textline);
//        ;
//    });
//
//}

function displayCatFilters() {
    catFilter = window.location.search.substring(1);

    $.getJSON('rest/products/categories', function (data) {
        var textline = "";
        var filterExists = false;
        $.each(data, function (key, value) {
            if (value.name === catFilter) {
                filterExists = true;
                textline += '<input type="radio" value="' + value.name + '" id="rad' + value.name + ' name = "catfilter" checked="checked" />';
                textline += '<label> ' + getCategory(value.name) + '</label><br>';
            } else {
                textline += '<input type="radio" value="' + value.name + '" id="rad' + value.name + '" name = "catfilter" />';
                textline += '<label> ' + getCategory(value.name) + '</label><br>';
            }
        });

        $('#categories').text("").append(textline);
        if (!filterExists) {
            catFilter = "ALL";
//            window.location.href = "demo-products.html?ALL";
//            document.getElementById('#radAll').checked = true;
            $('#radALL').attr("checked", true);
        }
        ;
    });

}

function filterProducts() {
    alert("filter products function");
}


$(document).on("change", "input[type='radio']", function (event) {
//       var selection =  event.target.values();
    var selection = $("input[name='catfilter']:checked").val();
    window.location.href = "index.html?" + selection;
//        alert("Ik doe iets! "+ selection);
});


//function setupEditProduct() {
//
//    var id = window.location.search.substring(1);
//
//    $('#productForm').action = "rest/products/" + id;
//
////    prefill the imput boxes with available product data
//    $.getJSON('rest/products/' + id, function (product) {
//
//        $('#IdId').val(product.id);
//        $('#nameId').val(product.name);
//        $('#brandId').val(product.brand);
//        $('#priceId').val(product.price);
//        $('#stockId').val(product.stockCount);
//        $('#infoId').val(product.info);
//
//        var select = $('#categoryId');
//        $.getJSON('rest/products/categories', function (data) {
//            $.each(data, function (key, value) {
//
//                if (product.category === value.name) {
//                    $('<option value="' + value.name + '" selected="selected">' + value.readableName + '</option>').appendTo(select);
//                } else {
//                    $('<option value="' + value.name + '">' + value.readableName + '</option>').appendTo(select);
//                }
//            });
//        });
//
//    });
//}
//
//
//
//function putPostProduct() {
////    var dataObject = {brand: "AH", category: "CREAM", id: 3, info: "zeer romige roomkaas!", name: "Boersjaan", price: 3.5, stockCount: 5};
////    var dataObject = {brand: "Bagger", category: "BLUE", info: "Echt smerig!", name: "Smorgus", price: 1.12 , stockCount: 5};
//
//
//    var dataObject = {};
//
////    dataObject.id = $('#IdId').val();
////    dataObject.name = $('#nameId').val();
////    dataObject.brand = $('#brandId').val();
////    dataObject.price = $('#priceId').val();
////    dataObject.stockCount = $('#stockId').val();
////    dataObject.info = $('#infoId').val();
////    dataObject.category = $('#categoryId').val();
//
//    var form = $('#productForm').serializeArray();
//    $.each(form,
//            function (i, v) {
////                alert("name: "+v.name + ", value: "+v.value);
//                if (v.value !== "") {
//                    dataObject[v.name] = v.value;
//                }
//            });
//
//    var jsonData = JSON.stringify(dataObject);
//    var id = dataObject.id;
////    alert("id= " + id);
//
//    if (id !== undefined) {
////        alert("PUT");
//        $.ajax({
//            type: "PUT",
//            url: "rest/products/" + id,
//            data: jsonData,
////            dataType: "json", alleen nodig als return data wordt 
//            contentType: "application/json",
//            success: function () {
//
//                window.location.href = "index.html";
//            },
//            error: function () {
//                alert("Error, " + jsonData);
//            }
//        });
//    } else {
////        alert("POST");
//        $.ajax({
//            type: "POST",
//            url: "rest/products/",
//            data: jsonData,
//            //      dataType: "json", alleen nodig als return data wordt 
//            contentType: "application/json",
//            success: function () {
//
//                window.location.href = "index.html";
//            },
//            error: function () {
//                alert("Error, " + jsonData);
//            }
//        });
//    }
//
//}




