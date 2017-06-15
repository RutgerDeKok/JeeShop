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
            datarow += '<td id="stockCount">' + value.stockCount + ' </td>';
            datarow += '<td id="info">' + value.info + ' </td>';
            datarow += '<td id="editSave"><button id="edit" onclick=\"editRow(this)\">Edit</button></td></tr>';
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
    button.parentNode.innerHTML = '<button id="save">Save</button>';    
}

function saveRow(button) {
//    velden product:
//            id
//            brand
//            category
//            info
//            name
//            stockCount
    // convert row to json
    // 
    $("#save").click(function(){
        var data = [];
//        var el = document.getElementById("id");
//        alert(el.getAttribute("id"));
        $("#productsTable").find('tr.highlight').each(function(rowIndex, row) {
            var cols = [];
            $(this).find('td').not(':last').each(function(colIndex, col) {                      
                cols.push($(this).text().trim());
            });
            data.push(cols);            
        });
        alert(data);
        return data;
    });
    // 
    // send json to rest
    // 
    //    $.ajax({
    //            type: "PUT",
    //            url: "rest/products/" + dataObject.id,
    //            data: dataObject,
    //            contentType: "application/json",
    //            success: function () {
    //                alert("Succes!");
    //            },
    //            error: function () {
    //                alert("Error, "+ dataObject);
    //            }
    //     }); 
    // remove highlight
    // show edit button instead of save again
}