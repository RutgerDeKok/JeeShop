$(document).ready(function () {
    setupEditUser();
});

$(document).on("submit", "form#userForm", function (event) {
    event.preventDefault();
//    alert("submit event");
    putPostUser();
});



function setupEditUser() {

    var id = window.location.search.substring(1);

    $('#userForm').action = "../rest/users/" + id;

//    prefill the imput boxes with available product data
    $.getJSON('../rest/users/' + id, function (user) {
        $('#IdId').val(user.id);
        $('#hashId').val(""+user.passHash);
        $('#addressIdId').val(user.billingAddress.id);
        $('#emailId').val(user.email);
        $('#firstNameId').val(user.billingAddress.firstName);
        $('#insertionId').val(user.billingAddress.insertion);
        $('#familyNameId').val(user.billingAddress.familyName);
        $('#streetId').val(user.billingAddress.street);
        $('#numberId').val(user.billingAddress.number);
        $('#additionId').val(user.billingAddress.numAddition);
        $('#zipCodeId').val(user.billingAddress.zipCode);
        $('#cityId').val(user.billingAddress.city);

        var select = $('#typeId');
        $.getJSON('../rest/users/types', function (data) {
            $.each(data, function (key, value) {

                if (user.type === value.name) {
                    $('<option value="' + value.name + '" selected="selected">' + value.readableName + '</option>').appendTo(select);
                } else {
                    $('<option value="' + value.name + '">' + value.readableName + '</option>').appendTo(select);
                }
            });
        });

    });
}


function getTypes() {
    $.getJSON('../rest/users/types', function (types) {
        return types;
    });
}

function getTypeEnum(readableName) {
    var types = getTypes();
    var result = "";
    $.each(types, function (key, value) {
        if (value.readableName === readableName.trim()) {
            result = value.name;
        }
    });
    return result;
}




function putPostUser() {

    var userObject = {};
    var addressObject = {};


    addressObject.id = $('#addressIdId').val();
    addressObject.firstName = $('#firstNameId').val();
    addressObject.insertion = $('#insertionId').val();
    addressObject.familyName = $('#familyNameId').val();
    addressObject.street = $('#streetId').val();
    addressObject.number = $('#numberId').val();
    addressObject.numAddition = $('#additionId').val();
    addressObject.zipCode = $('#zipCodeId').val();
    addressObject.city = $('#cityId').val();

    userObject.id = $('#IdId').val();
    alert("hash = "+ $('#hashId').val());
    userObject.passHash = $('#hashId').val();
    userObject.email = $('#emailId').val();
    userObject.type = $('#typeId').val();
    userObject.billingAddress = addressObject;


    var jsonData = JSON.stringify(userObject);
    console.log(jsonData);
    alert(jsonData);
    
    var id = userObject.id;
//    alert("id= " + id);

    if (id !== undefined) {
//        alert("PUT");
        $.ajax({
            type: "PUT",
            url: "../rest/users/" + id,
            data: jsonData,
//            dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {

                window.location.href = "../employees/users.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    } else {
//        alert("POST");
        $.ajax({
            type: "POST",
            url: "../rest/users/",
            data: jsonData,
            //      dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {

                window.location.href = "../employees/users.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    }

}

