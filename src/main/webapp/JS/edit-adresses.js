$(document).ready(function () {
    setupEditAdres();

});

$(document).on("submit", "form#adresForm", function (event) {
    event.preventDefault();
//    alert("submit event");
    putPostAdresUser();
});



function setupEditAdres() {

    var id = window.location.search.substring(1);

    $('#adresForm').action = "/Jee-Shop/rest/addresses/" + id;

//    prefill the input boxes with available product data

    $.getJSON('/Jee-Shop/rest/adresses/' + id, function (address) {
        var address = user.billingAddress;
        if (!address) {
            address = {};
        }
        $('#addressIdId').val(address.id);
        $('#voornaamId').val(address.firstName);
        $('#achternaamId').val(address.familyName);
        $('#straatId').val(address.street);
        $('#nummerId').val(address.number);
        $('#stadId').val(address.city);
        $('#zipCodeId').val(address.zipCode);
        $('#additionId').val(address.numAddittion);
        $('#insertionId').val(address.insertion);
       
//NIET NODIG!
//        var select = $('#typeId');
//        $.getJSON('/Jee-Shop/rest/users/types', function (data) {
//            $.each(data, function (key, value) {
//
//                if (user.type === value.name) {
//                    $('<option value="' + value.name + '" selected="selected">' + value.readableName + '</option>').appendTo(select);
//                } else {
//                    $('<option value="' + value.name + '">' + value.readableName + '</option>').appendTo(select);
//                }
//            });
//        });

    });
}

//NIET nodig!
//function getTypes() {
//    $.getJSON('/Jee-Shop/rest/users/types', function (types) {
//        return types;
//    });
//}

//function getTypeEnum(readableName) {
//    var types = getTypes();
//    var result = "";
//    $.each(types, function (key, value) {
//        if (value.readableName === readableName.trim()) {
//            result = value.name;
//        }
//    });
//    return result;
//}




function putPostAdresUser() {

    var userObject = {};
    var addressObject = {};

    if ($('#addressIdId').val() > 0) {
        addressObject.id = $('#addressIdId').val();
    }
    addressObject.firstName = $('#firstNameId').val();
    addressObject.insertion = $('#insertionId').val();
    addressObject.familyName = $('#familyNameId').val();
    addressObject.street = $('#streetId').val();
    addressObject.number = $('#numberId').val();
    addressObject.numAddition = $('#additionId').val();
    addressObject.zipCode = $('#zipCodeId').val();
    addressObject.city = $('#cityId').val();

    userObject.id = $('#IdId').val();
    alert("hash = " + $('#hashId').val());
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
            url: "/Jee-Shop/rest/users/" + id,
            data: jsonData,
//            dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {
                window.opener.location.reload(true);
                setTimeout(function () {
                    window.close();
                }, 200);
//                window.location.href = "/Jee-Shop/employees/users.html";
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

                window.location.href = "/Jee-Shop/employees/users.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    }

}


