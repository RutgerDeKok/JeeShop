function startProductTable() {
    getCategories();
    $.getJSON('rest/products', function (data) {
        var datarow = "";
        $.each(data, function (index, value) {
            datarow += '<tbody><tr>';
            datarow += '<td id="id" hidden>' + value.id + '</td>';
            datarow += '<td id="name">' + value.name + ' </td>';
            datarow += '<td id="category"><span id="catSpan' + index + '">' + getCategory(value.category) + '</span>';
            datarow += '<select id="catSel' + index + '" hidden></select> </td>';
            datarow += '<td id="brand">' + value.brand + ' </td>';
            datarow += '<td id="price">' + value.price + ' </td>';
            datarow += '<td id="stockCount">' + value.stockCount + ' </td>';
            datarow += '<td id="info">' + value.info + ' </td>';
            datarow += '<td id="editSave"><button id="edit" onclick="editRow(this,' + index + ')">Edit</button></td></tr>';
        });
        datarow += '</tbody>';
        $('#productsTable').append(datarow);
    });
}



function editRow(button, index) {
    button.parentNode.parentNode.className = 'highlight';
    button.parentNode.parentNode.setAttribute("contenteditable", "true");
    button.parentNode.innerHTML = '<button id="save" onclick="saveRow(this,' + index + ')">Save</button>';
//    button.parentNode.parentNode.find('.categorytext').hide();
    var $catSpan = $(document.getElementById('catSpan' + index));
    var $catSel = $(document.getElementById('catSel' + index));
    
    //opties toevoegen aan <select> menu
    $catSel.html(' ');
    $.each(categories, function (i, cat) {
        if (getCategoryEnum($catSpan.text()) === cat.name) {
            $catSel.append('<option value="' + cat.name + '" selected="selected">' + cat.readableName + '</option>');
        } else {
            $catSel.append('<option value="' + cat.name + '">' + cat.readableName + '</option>');
        }
    });
    $catSel.show();
    $catSpan.hide();

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



function saveRow(button, index) {
    button.parentNode.parentNode.className = '';
//    button.parentNode.parentNode.removeClass("highlight");
    button.parentNode.parentNode.setAttribute("contenteditable", "false");
    var $row = jQuery(button).closest('tr');
    var $columns = $row.find('td').not(':last');

    var $catSpan = $(document.getElementById('catSpan' + index));
    var $catSel = $(document.getElementById('catSel' + index));
    var catVal = $catSel.val();
    var catText = $catSel.find('option:selected').text();

    $catSpan.text(catText);
    $catSel.hide();
    $catSpan.show();
    $catSel.html(' ');
    //    console.log("columns: " + $columns);
    var dataObject = {};
    jQuery.each($columns, function (i, item) {

        if (item.value !== "") {
            if ($columns[i].id === "category") {
                dataObject[$columns[i].id] = catVal;
            } else {
                dataObject[$columns[i].id] = item.innerHTML;
            }
        }
    });

    var id = dataObject.id;
    var jsonData = JSON.stringify(dataObject);
    //    alert("json: "+JSON.stringify(dataObject));
    $.ajax({
        type: "PUT",
        url: "rest/products/" + id,
        data: jsonData,
        contentType: "application/json",
        success: function () {
            console.log("Save Succesful!");
        },
        error: function () {
            alert("Error, " + dataObject);
        }
    });

    button.parentNode.innerHTML = '<button id="edit" onclick="editRow(this ,' + index + ')">Edit</button>';
// show edit button instead of save again
}

