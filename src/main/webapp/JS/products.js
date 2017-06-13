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
    alert("editRow = " + index + " id = " + id);
//    window.location.href = "rest/products/" + id;
    setupEditProduct(id);
    window.location.href = "edit-product.html";
  
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


function setupEditProduct(id) {
    $('#postProduct').action = "/rest/products/" + id;
    $.getJSON('rest/products/' + id, function (data) {
        var product = data[0];

        $('#nameId').val(product.name);
        $('#brandId').val(product.brand);

    });

}



