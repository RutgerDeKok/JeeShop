$(document).ready(function () {
    $.get("../top-navbar.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
    });

    startUserTable();
    displayTypeFilters();
});


function getTypes() {
    $.getJSON('../rest/users/types', function (data) {
       types = data;
        return types;
    });
}


function startUserTable() {

    getTypes();
    
    var typeFilter = window.location.search.substring(1);
    if(typeFilter===""){
        typeFilter="ALL";
    }

    $.getJSON('../rest/users/type/'+typeFilter, function (data) {
        var datarow = "<tbody>";
        $.each(data, function (index, value) {
            // create name string
            var insertion = value.billingAddress.insertion;
            if(insertion){
                insertion += " ";
            }else{
                insertion = "";
            }
            var name = value.billingAddress.firstName +' '+ insertion + value.billingAddress.familyName;
            
            // create address string          
            var addition = value.billingAddress.numAddition;
            if(addition){
                addition = " "+addition;
            }else{
                addition = "";
            }
            var address = value.billingAddress.zipCode +', '+ value.billingAddress.number +addition+ ',  '+value.billingAddress.city;
                     
            datarow += '<tr>';
            datarow += '<td id="id" hidden>' + value.id + '</td>';
//            datarow += '<td id="type">' + value.type + ' </td>';
            datarow += '<td id="type"><span id="typeSpan' + index + '">' + getType(value.type) + '</span>';
//            datarow += '<select id="typeSel' + index + '" hidden></select> \n\
            datarow += ' </td>';
            datarow += '<td id="email">' + value.email + ' </td>';
            datarow += '<td id="name">'+ name+ ' </td>';
            datarow += '<td id="adres">'+ address + ' </td>';
                                                   
            datarow += '<td id="editSave"><button id="edit" onclick="editRow(this,' + index + ')">Edit</button></td>';
            datarow += ' <td align=/"left/" onclick=\"deleteRow(' + value.id + ')"> <div style="text-align:center; color:red;"> X <div></td> </tr>';
        });
        datarow += '</tbody>';
        $('#usersTable').append(datarow);
    });

}

function deleteRow(id) {
//    alert("deleting id: "+id);
    $.ajax({
        type: "DELETE",
        url: "../rest/users/" + id,
        contentType: "application/json",
        success: function () {
            console.log("Delete Succesful!");
            $('#usersTable').children('tbody').empty();
            startUserTable() ;
        },
        error: function () {
            alert("Error, ");
        }
    });

}



//function editRow(button, index) {
//    button.parentNode.parentNode.className = 'highlight';
//    button.parentNode.parentNode.setAttribute("contenteditable", "true");
//    button.parentNode.innerHTML = '<button id="save" onclick="saveRow(this,' + index + ')">Save</button>';
////    button.parentNode.parentNode.find('.categorytext').hide();
//    var $catSpan = $(document.getElementById('catSpan' + index));
//    var $catSel = $(document.getElementById('catSel' + index));
//
//    //opties toevoegen aan <select> menu
//    $catSel.html(' ');
//    $.each(categories, function (i, cat) {
//        if (getCategoryEnum($catSpan.text()) === cat.name) {
//            $catSel.append('<option value="' + cat.name + '" selected="selected">' + cat.readableName + '</option>');
//        } else {
//            $catSel.append('<option value="' + cat.name + '">' + cat.readableName + '</option>');
//        }
//    });
//    $catSel.show();
//    $catSpan.hide();
//
//}




function getType(type) {
    var result = "";
    $.each(types, function (key, value) {
        if (value.name === type) {
            result = value.readableName;
        }
    });
    return result;
}

function getTypeEnum(readableName) {
    var result = "";
    $.each(types, function (key, value) {
        if (value.readableName === readableName.trim()) {
            result = value.name;
        }
    });
    return result;
}



//function saveRow(button, index) {
//    button.parentNode.parentNode.className = '';
////    button.parentNode.parentNode.removeClass("highlight");
//    button.parentNode.parentNode.setAttribute("contenteditable", "false");
//    var $row = jQuery(button).closest('tr');
//    var $columns = $row.find('td').not(':last');
//
//    var $catSpan = $(document.getElementById('catSpan' + index));
//    var $catSel = $(document.getElementById('catSel' + index));
//    var catVal = $catSel.val();
//    var catText = $catSel.find('option:selected').text();
//
//    $catSpan.text(catText);
//    $catSel.hide();
//    $catSpan.show();
//    $catSel.html(' ');
//    //    console.log("columns: " + $columns);
//    var dataObject = {};
//    jQuery.each($columns, function (i, item) {
//
//        if (item.value !== "") {
//            if ($columns[i].id === "category") {
//                dataObject[$columns[i].id] = catVal;
//            } else {
//                dataObject[$columns[i].id] = item.innerHTML;
//            }
//        }
//    });
//
//    var id = dataObject.id;
//    var jsonData = JSON.stringify(dataObject);
//    //    alert("json: "+JSON.stringify(dataObject));
//    $.ajax({
//        type: "PUT",
//        url: "../rest/products/" + id,
//        data: jsonData,
//        contentType: "application/json",
//        success: function () {
//            console.log("Save Succesful!");
//        },
//        error: function () {
//            alert("Error, " + dataObject);
//        }
//    });
//
//    button.parentNode.innerHTML = '<button id="edit" onclick="editRow(this ,' + index + ')">Edit</button>';
//// show edit button instead of save again
//}

function displayTypeFilters() {
    var typeFilter = window.location.search.substring(1);

    $.getJSON('../rest/users/types', function (data) {
        var textline = "";
        var filterExists = false;
        $.each(data, function (key, value) {
            if (value.name === typeFilter) {
                filterExists = true;
                textline += '<input type="radio" value="' + value.name + '" id="rad' + value.name + ' name = "typefilter" checked="checked" />';
                textline += getType(value.name) + '<br>';
            } else {
                textline += '<input type="radio" value="' + value.name + '" id="rad' + value.name + '" name = "typefilter" />';
                textline += getType(value.name) + '<br>';
            }
        });

        $('#UserTypes').text("").append(textline);
        if (!filterExists) {
            typeFilter = "ALL";
//            window.location.href = "demo-products.html?ALL";
//            document.getElementById('#radAll').checked = true;
            $('#radALL').attr("checked", true);
        }
    });
}



$(document).on("change", "input[type='radio']", function (event) {

    var selection = $("input[name='typefilter']:checked").val();
    window.location.href = "users.html?" + selection;

});





