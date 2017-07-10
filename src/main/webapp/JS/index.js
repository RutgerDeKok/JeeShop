var tableInfoTable = [];
var cheese_name = "";

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
    $(".table_info_content").remove();
    var catFilter = window.location.search.substring(1);
    if(catFilter===""){
        catFilter="ALL";
    }

    $.getJSON('rest/products/cat/'+catFilter, function (data) {
        
        var datarow = " "; 
        var rowindex = 0;
        var substring = cheese_name;
        $.each(data, function (key, value) {
            var name = value.name;

//           console.log (name);
//            console.log(substring);
            console.log(name.toLowerCase().indexOf(substring.toLowerCase()) !== -1);
            if (name.toLowerCase().indexOf(substring.toLowerCase()) !== -1){
            datarow += '<tr class="table_info_content" class="tablerow" name=' + rowindex + ' >';
            datarow += ' <td align=/"left/">' + value.name + ' </td>';
            datarow += ' <td align=/"left/">' + getCategory(value.category) + ' </td>';
            datarow += ' <td align=/"left/">' + value.brand + ' </td>';
            datarow += ' <td align=/"left/">' + value.price + ' </td>';
            datarow += ' <td align=/"left/">' + value.stockCount + ' </td>';
            datarow += ' <td align=/"left/">' + value.info + ' </td>';
            datarow += ' <td align=/"left/" > <input id="quantity_field' + rowindex + '" type="text"></input>';  
            datarow += ' <td align=/"left/" class="/click_button/" onclick=\"addProduct(' + rowindex + ',' + value.id + ',' + value.price + ')\"><button><strong>Voeg toe</strong></button></td>';
             
            datarow += '</tr>';
            rowindex++;
            tableInfoTable.push(value.info);
         }
        });
          cheese_name = "";
          substring = "";
        $('#productsTable').append(datarow);
    });
}

function addProduct(index, productId, productPrijs) {   
       
       var cartId = getCookie("UserId");
       if (!cartId == ""){ 
       var quantity = $("#quantity_field"+index).val();
       console.log("cart = " + cartId);
       var totalPrice = quantity* productPrijs;
        productUrl = "rest/products/" + productId;
        cartUrl = "rest/carts/" + cartId;
        $.getJSON(productUrl, function(product) {
            $.getJSON(cartUrl, function(cart) {
                
                var jsonData = 
                        { "cart":cart,
                          "id":"0",  
                          "product":product,
                          "quantity":quantity,
                          "subTotal":totalPrice }
                      
                        
                $.ajax({
                   type: "POST",
                   url: "rest/cartsuborders",
                   data: JSON.stringify(jsonData),
                   contentType: "application/json",
                   success: function () {
                      window.location.href = "customer_cart.html?id=" + cartId;
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
        else 
        alert("you are not logged in, looser.. Log in first please");
}

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

function searchCheese(){
    cheese_name = $("#cheese_name").val();
    startProductTable();
  
    
}


$(document).on("change", "input[type='radio']", function (event) {

    var selection = $("input[name='catfilter']:checked").val();
    window.location.href = "index.html?" + selection;

});

$("#productsTable").mouseover(function(){
    $(".table_info_content").hover(function(event){
        //$(this).css("background", "rgb(252,150,150)");
        $("#productInfo").css({"position":"fixed","top":event.clientY,"left":event.clientX});
        $("#productInfo").html(tableInfoTable[$(this).attr('name')]);
       
    });
});
 

         
    
    
                
