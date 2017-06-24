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

        $.each(data, function (key, value) {
            datarow += '<tr>';
            datarow += ' <td align=/"left/">' + value.name + ' </td>';
            datarow += ' <td align=/"left/">' + getCategory(value.category) + ' </td>';
            datarow += ' <td align=/"left/">' + value.brand + ' </td>';
            datarow += ' <td align=/"left/">' + value.price + ' </td>';
            datarow += ' <td align=/"left/">' + value.stockCount + ' </td>';
            datarow += ' <td align=/"left/">' + value.info + ' </td>';
            datarow += ' <td align=/"left/" onclick=\"addProduct(' + rowindex + ',' + value.id + ')\"><strong>Voeg toe</strong></td>';
            datarow += '</tr>';
            rowindex++;
        });
        $('#productsTable').append(datarow);
    });
}

function addProduct(index, id) {
    alert("add product with index: " + index + ", and id: " + id);
//    window.location.href = "edit-product.html?" + id;
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


$(document).on("change", "input[type='radio']", function (event) {

    var selection = $("input[name='catfilter']:checked").val();
    window.location.href = "index.html?" + selection;

});



