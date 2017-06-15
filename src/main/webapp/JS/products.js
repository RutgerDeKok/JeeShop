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
            datarow += ' <td align=/"left/" onclick=\"editRow(' + rowindex + ',' + value.id + ')\"> Edit </td> </tr>';
            rowindex++;
        });
        $('#table_main').append(datarow);
    });
}

function editRow(index, id) {
//   index not used at the moment
    window.location.href = "edit-product.html?" + id;

}


function displayCategories() {

    $.getJSON('rest/products/categories', function (data) {
        var textline = " ";
        $.each(data, function (key, value) {
            textline += value.name + ' : ' + value.readableName + ' <br>';
        });
        $('#test_p').text("").append(textline);
        ;
    });

}


function setupEditProduct() {

    var id = window.location.search.substring(1);

    $('#productForm').action = "rest/products/" + id;

//    prefill the imput boxes with available product data
    $.getJSON('rest/products/' + id, function (product) {

        $('#IdId').val(product.id);
        $('#nameId').val(product.name);
        $('#brandId').val(product.brand);
        $('#priceId').val(product.price);
        $('#stockId').val(product.stockCount);
        $('#infoId').val(product.info);

        var select = $('#categoryId');
        $.getJSON('rest/products/categories', function (data) {
            $.each(data, function (key, value) {

                if (product.category === value.name) {
                    $('<option value="' + value.name + '" selected="selected">' + value.readableName + '</option>').appendTo(select);
                } else {
                    $('<option value="' + value.name + '">' + value.readableName + '</option>').appendTo(select);
                }
            });
        });

    });
}



function putPostProduct() {
//    var dataObject = {brand: "AH", category: "CREAM", id: 3, info: "zeer romige roomkaas!", name: "Boersjaan", price: 3.5, stockCount: 5};
//    var dataObject = {brand: "Bagger", category: "BLUE", info: "Echt smerig!", name: "Smorgus", price: 1.12 , stockCount: 5};


    var dataObject = {};

//    dataObject.id = $('#IdId').val();
//    dataObject.name = $('#nameId').val();
//    dataObject.brand = $('#brandId').val();
//    dataObject.price = $('#priceId').val();
//    dataObject.stockCount = $('#stockId').val();
//    dataObject.info = $('#infoId').val();
//    dataObject.category = $('#categoryId').val();

    var form = $('#productForm').serializeArray();
    $.each(form,
            function (i, v) {
//                alert("name: "+v.name + ", value: "+v.value);
                if (v.value !== "") {
                    dataObject[v.name] = v.value;
                }
            });

    var jsonData = JSON.stringify(dataObject);
    var id = dataObject.id;
//    alert("id= " + id);

    if (id !== undefined) {
//        alert("PUT");
        $.ajax({
            type: "PUT",
            url: "rest/products/" + id,
            data: jsonData,
//            dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {

                window.location.href = "index.html";
            },
            error: function () {
                alert("Error, "+ jsonData);
            }
        });
    } else {
//        alert("POST");
        $.ajax({
            type: "POST",
            url: "rest/products/",
            data: jsonData,
    //      dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {

                window.location.href = "index.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    }

}




