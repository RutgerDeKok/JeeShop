$(document).ready(function () {
    $.get("../top-navbar.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
    });

    startUserTable();
    displayTypeFilters();
    
     $('#newButton').click(function (e) {
        e.preventDefault();
        newUser();
    });
    
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
    if (typeFilter === "") {
        typeFilter = "ALL";
    }

    $.getJSON('../rest/users/type/' + typeFilter, function (data) {
        var datarow = "<tbody>";
        $.each(data, function (index, value) {
            // create name string
            var address;
            var name;
            if (value.billingAddress) {
                // create name string 
                var insertion = value.billingAddress.insertion;
                if (insertion) {
                    insertion += " ";
                } else {
                    insertion = "";
                }

                name = value.billingAddress.firstName + ' ' + insertion + value.billingAddress.familyName;

                // create address string          
                var addition = value.billingAddress.numAddition;
                if (addition) {
                    addition = " " + addition;
                } else {
                    addition = "";
                }
                address = value.billingAddress.zipCode + ', ' + value.billingAddress.number + addition + ',  ' + value.billingAddress.city;
            }else{
                address = "";
                name = "";
            }

            // create table body row 
            datarow += '<tr>';
            datarow += '<td id="id" hidden>' + value.id + '</td>';
            datarow += '<td id="type">' + getType(value.type) + '</td>';
            datarow += '<td id="email">' + value.email + ' </td>';
            datarow += '<td id="name">' + name + ' </td>';
            datarow += '<td id="adres">' + address + ' </td>';

            datarow += '<td id="editSave"><button id="edit" onclick="editRow(' + value.id + ')">Edit</button></td>';
            datarow += '<td style="padding-left: 35px;"><button onclick="deleteRow(' + value.id + ')"> <span style=" color:red;"> X <span></button></td> </tr>';
        });
        datarow += '</tbody>';
//        alert(datarow);
        $('#usersTable').append(datarow);
        $("#scroll75").scrollTop($("#scroll75")[0].scrollHeight);
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
            startUserTable();
        },
        error: function () {
            alert("Error, ");
        }
    });

}

function newUser() {
    
    popitup( "edit-user.html");

}


function editRow(id) {
    
    popitup( "edit-user.html?" + id);
//    window.location.href = "edit-user.html?" + id;
}


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

function popitup2(url) {
    newwindow = window.open(url, 'name', 'height=600px,width=700px');
    if (window.focus) {
        newwindow.focus();
    }
    return false;
}

function popitup(url) {
  var w = 600;
  var h = 650;
  var title = "Edit User";
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'titlebar= no, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 




