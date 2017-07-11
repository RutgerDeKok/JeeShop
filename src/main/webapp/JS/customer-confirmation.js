var order_to_send;
var id;
var totalPrijs = 0;
var addressId;


$(document).ready(function () {

    $.get("/Jee-Shop/top-navbar.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
    });


    var id = getCookie("UserId");
    console.log(id);
    startCartInfoTable(id);
    startSubOrderTable(id);

    //    $("#goToEdit").click(editAdres(adresId));

    $("#confirmation_button").click(function () {
        id = $("#IdId").val();

        cartToOrder();
        window.location.href = "customer_finalorder.html";

    });

});



function cartToOrder() {

    id = getCookie("UserId");
    cartsUrl = "rest/carts/" + id;
    cartSubOrderUrl = "rest/cartsuborders";

    $.getJSON(cartSubOrderUrl, function (cartSubOrders) {
        $.getJSON(cartsUrl, function (cart) {
            var userId = cart.id;
            userUrl = "rest/users/" + id;

            $.getJSON(userUrl, function (User) {
                var subOrderList = [];
                $.each(cartSubOrders, function (key, value) {
                    console.log(value.cart.id);
                    console.log(userId);
                    if (value.cart.id == userId) {
                        subOrderList.push(value);
                    }
                });
                order_to_send = {
                    "city": cart.deliveryAddress.city,
                    "familyName": cart.deliveryAddress.familyName,
                    "firstName": cart.deliveryAddress.firstName,
                    "insertion": cart.deliveryAddress.insertion,
                    "numAddition": cart.deliveryAddress.numAddtion,
                    "number": cart.deliveryAddress.number,
                    "street": cart.deliveryAddress.street,
                    "totalPrice": totalPrijs,
                    "zipCode": cart.deliveryAddress.zipCode,
                    "finalSuborderList": subOrderList,
                    "user": User
                };

                console.log(order_to_send);

                $.ajax({
                    type: "POST",
                    url: "rest/sales",
                    data: JSON.stringify(order_to_send),
                    contentType: "application/json",
                    success: function () {

                        console.log("order gelukt");
                        subOrderToFinalOrder(id, order_to_send);

                    },
                    error: function () {
                        console.log(jsonData);
                        console.log(" /n/n/n");
                        console.log(JSON.stringify(jsonData));
                    }
                });
            });
        });
    });
}



function subOrderToFinalOrder(id, order_to_send) {

//                var userId;
//                cartUrl = "rest/carts";
//                $.getJSON(cartUrl, function(cart){
//                userId = cart.id;   
//            });

    cartSubOrderUrl = "rest/cartsuborders";
    productUrl = "rest/products";
    $.getJSON(cartSubOrderUrl, function (cartSubOrders) {
        $.each(cartSubOrders, function (key, value) {
            if (value.cart.id == id) {
                var jsonData = {
                    "itemPrice": value.product.price,
                    "prdBrand": value.product.brand,
                    "prdCategory": value.product.category,
                    "prdName": value.product.name,
                    "quantity": value.quantity,
                    "subTotal": value.subTotal,
                    "order": order_to_send
                };

                $.ajax({
                    type: "POST",
                    url: "rest/finalsuborders",
                    data: JSON.stringify(jsonData),
                    contentType: "application/json",
                    success: function () {
                        console.log("finalsubOrder gelukt");


                    },
                    error: function () {
                        console.log(jsonData);
                        console.log(" /n/n/n");
                        console.log(JSON.stringify(jsonData));
                    }
                });
            }
        });
    });
}



function startCartInfoTable(id) {

    $(".table_info_content").remove();

    $.getJSON('rest/carts/' + id, function (cartData) {

        $("#Hadres").html(cartData.deliveryAddress.id);
        $("#first_name").html("Voornaam: " + cartData.deliveryAddress.firstName);
        $("#last_name").html("Achternaam: " + cartData.deliveryAddress.familyName);
        $("#street").html("Straat: " + cartData.deliveryAddress.street);
        $("#number").html("Nummber: " + cartData.deliveryAddress.number + " " + cartData.deliveryAddress.numAddition);
        $("#city").html("Stad: " + cartData.deliveryAddress.city);
        $("#zip").html("PostCode: " + cartData.deliveryAddress.zipCode);

//        var adresId = dataCarts.deliveryAddress.id;
        addressId = cartData.deliveryAddress.id;

//        $("#goToEdit").setAttribute("onclick",).click(editAdres(dataCarts.deliveryAddress.id));
    });
}


function editAddress() {
    
    // window.location.href = "edit-adress.html?" + id;
    popitup("edit-adress.html?" + addressId);

}

function popitup(url) {
    var w = 700;
    var h = 450;
    var title = "Edit Adres";
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'titlebar= no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}




function startSubOrderTable(id) {

    $(".table_content").remove();

    var datarowSubOrder = " ";

    $.getJSON('rest/cartsuborders', function (data) {


        $.each(data, function (key, value) {


            if (value.cart && value.cart.id == id) {

                datarowSubOrder += ' <tr class="table_content">';
                datarowSubOrder += ' <td align=/"left/">' + value.id + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.subTotal + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.name + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.quantity + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.price + ' </td>';

                totalPrijs += value.subTotal;

            }
        });

        $('#table_main').append(datarowSubOrder);
        $("#footer").text("TotaalPrijs: " + Math.round(totalPrijs * 100) / 100);

    });
}


