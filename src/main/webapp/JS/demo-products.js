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
            datarow += '<td id="editSave"><button id="edit" onclick="editRow(this)">Edit</button></td></tr>';
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

function getCategoryEnum(readableName) {
    var result = "";
    $.each(categories, function (key, value) {
        if (value.readableName === readableName.trim()) {
            result = value.name;
        }
    });
    return result;
}

function editRow(button) {
    button.parentNode.parentNode.className = 'highlight';
    button.parentNode.parentNode.setAttribute("contenteditable", "true");
    button.parentNode.innerHTML = '<button id="save" onclick="saveRow(this)">Save</button>';
}

function saveRow(button) {
    button.parentNode.parentNode.className = '';
//    button.parentNode.parentNode.removeClass("highlight");
    button.parentNode.parentNode.setAttribute("contenteditable", "false");
    var $row = jQuery(button).closest('tr');
    var $columns = $row.find('td').not(':last');
//    console.log("columns: " + $columns);
    var dataObject = {};
    jQuery.each($columns, function (i, item) {
   
//        alert("name: " + $columns[i].id + ", value: " + item.innerHTML);
        if (item.value !== "") {
            if ($columns[i].id === "category") {
                var catprod = getCategoryEnum(item.innerHTML);
                dataObject[$columns[i].id] = catprod;
            } else {
                dataObject[$columns[i].id] = item.innerHTML;
            }
//            alert("dataObject: " + dataObject);
        }
    });
  
    var id  = dataObject.id;
    var jsonData = JSON.stringify(dataObject);
//    alert("json: "+JSON.stringify(dataObject));
    $.ajax({
        type: "PUT",
        url: "rest/products/" + id,
        data: jsonData,
        contentType: "application/json",
        success: function () {
            alert("Succes!");
        },
        error: function () {
            alert("Error, " + dataObject);
        }
    });
    
   button.parentNode.innerHTML = '<button id="edit" onclick="editRow(this)">Edit</button>';
// show edit button instead of save again
}

