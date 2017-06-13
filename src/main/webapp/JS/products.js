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
//    alert("editRow = " + index + " id = " + id);
//    window.location.href = "rest/products/" + id;
//    setupEditProduct(id);
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



