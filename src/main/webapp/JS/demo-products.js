function startProductTable() {
    getCategories();
    $.getJSON('rest/products', function (data) {
        var datarow = "";
        $.each(data, function (key, value) {
            datarow += '<tbody><tr>';
            datarow += '<td id="id" hidden>' + value.id + '</td>';
            datarow += '<td id="name">' + value.name + ' </td>';
            datarow += '<td id="category">' + getCategory(value.category) + ' </td>';
            datarow += '<td id="brand">' + value.brand + ' </td>';
            datarow += '<td id="price">' + value.price + ' </td>';
            datarow += '<td id="stock">' + value.stockCount + ' </td>';
            datarow += '<td id="info">' + value.info + ' </td>';
            datarow += '<td id="editSave"><button onclick=\"editRow(this)\">Edit</button></td></tr>';
        });
        datarow += '</tbody>';
        $('#productsTable').append(datarow);
    });
}

function getCategories() {
    $.getJSON('rest/products/categories', function (data) {
        categories = data;
        return categories;
    });
}

function getCategory(cat) {
    var result = "";
    $.each(categories, function (key, value) {
        if (value.name === cat) {
            result = value.readableName;
        }
    });
    return result;
}

function editRow(button) {
    button.parentNode.parentNode.className = 'highlight';
    button.parentNode.parentNode.setAttribute("contenteditable","true");
    button.parentNode.innerHTML = '<button onclick=\"saveRow(this)\">Save</button>';    
}

function saveRow(button) {
    // get info from row
//    var tbl = $(button.parentNode.parentNode).get().map(function(row) {
//        return $(row).find('td').get().map(function(cell) {
//            return $(cell).attr("id") + ":" + $(cell).html();
//        });
//    });
//    alert (tbl);
var editableProduct = "";
    $cells = button.parentNode.parentNode.find("td");
        $cells.each(function(cellContent) {
            editableProduct += $(this).attr("id") + ":" + $(this).text();
        });
    alert (editableProduct);
    
//    velden product:
//            id
//            brand
//            category
//            info
//            name
//            stockCount
    // convert row to json
    // send json to rest
    // remove highlight
    // show edit button instead of save again
}