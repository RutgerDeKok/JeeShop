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

function editRow(button) {
    button.parentNode.parentNode.className = 'highlight';
    button.parentNode.parentNode.setAttribute("contenteditable","true");
    button.parentNode.innerHTML = '<button id="save" onclick="saveRow(this)">Save</button>';
}

function saveRow(button) {
    button.parentNode.parentNode.className = '';
    button.parentNode.parentNode.setAttribute("contenteditable","false");
    var $row = jQuery(button).closest('tr');
    var $columns = $row.find('td').not(':last');
//    console.log($columns);
    var values = "{";
    var id = "";
    jQuery.each($columns, function(i, item) {
        //console.log($columns[i].id);
        if ($columns[i].id === "id") {
            id = item.innerHTML;
            alert(id);
        }
        values += $columns[i].id + ":";
        values = values.concat("\x22",item.innerHTML,"\x22",",");
        //alert(values);
    });
    values = values.replace(/,$/,"}");
    console.log(values);
    console.log(JSON.stringify(values));
    
    $.ajax({
                type: "PUT",
                url: "rest/products/" + id,
                data: values,
                contentType: "application/json",
                success: function () {
                    alert("Succes!");
                },
                error: function () {
                    alert("Error, "+ values);
                }
         }); 
    
}

//function saveRow(button) {    
//    button.parentNode.parentNode.className = '';
//    button.parentNode.parentNode.setAttribute("contenteditable","false");
//    var table = document.getElementById('productsTable'),
//        highlight = table.getElementsByClassName('highlight');
//    alert(button.parentNode.);
    
//    velden product:
//            id
//            brand
//            category
//            info
//            name
//            stockCount
    // convert row to json
    //
//    $(".highlight").click(function () {
//    var row = $(this).parent().parent().parent().html();
//    alert(row);
//    });
//    $('.save').on('click',function() {
//       var row = document.getElementById("id");
//       alert(row);
//       $(button).parent('table').find('td').each(function() {
//           var colData = $(this).find('tr').eq(row).html();
//           alert(colData);
//       });
//    });
    // 
    // send json to rest
    // 
        
    // remove highlight
    // show edit button instead of save again
//}