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
        $.each(data, function (key, value) {
            datarow += '<tr>';
            datarow += ' <td align=/"left/">' + value.name + ' </td>';
//          datarow += ' <td align=/"left/">' + value.category + ' </td>';
            datarow += ' <td align=/"left/">' + getCategory(value.category) + ' </td>';
            datarow += ' <td align=/"left/">' + value.brand + ' </td>';
            datarow += ' <td align=/"left/">' + value.price + ' </td>';
            datarow += ' <td align=/"left/">' + value.stockCount + ' </td>';
            datarow += ' <td align=/"left/">' + value.info + ' </td>';
            datarow += '</tr>';
        });
        $('#table_main').append(datarow);
    });
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



