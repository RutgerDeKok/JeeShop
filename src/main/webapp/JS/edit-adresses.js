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
//        NIET NODIG! ADres ziet al alles! User niet, dus die gebruikte een var om onnodig typen te voorkomen.
//        var address = user.billingAddress; <------compleet onnodig hier.
//        if (!address) {
//            address = {};  <-- onzin die if.
//        }
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


    // alles is gevuld, dus je hebt de data neem ik aan!

    var userObject = {};
    var addressObject = {};

    if ($('#addressIdId').val() > 0) {
        addressObject.id = $('#addressIdId').val();
    }
    else{
     alert("dit gaat helemaal niet goed!")   ;
    }
    addressObject.firstName = $('#voornaamId').val();
    addressObject.insertion = $('#insertionId').val();
    addressObject.familyName = $('#achternaamId').val();
    addressObject.street = $('#straatId').val();
    addressObject.number = $('#nummerId').val();
    addressObject.numAddition = $('#additionId').val();
    addressObject.zipCode = $('#zipCodeId').val();
    addressObject.city = $('#stadId').val();

//NU heb ik hopelijk een addressObject die naar de Database Kan!


//twijfel of dit nodig is.
//    userObject.id = $('#IdId').val();
//    alert("hash = " + $('#hashId').val());
//    userObject.passHash = $('#hashId').val();
//    userObject.email = $('#emailId').val();
//    userObject.type = $('#typeId').val();
//    userObject.billingAddress = addressObject; <-- sneaky zin


    var jsonData = JSON.stringify(addressObject);
    console.log(jsonData);
    alert(jsonData);

    var id = addressObject.id;
    alert("id= " + id);

    if (id !== undefined) {
        alert("PUT");
        $.ajax({
            type: "PUT",
            url: "/Jee-Shop/rest/addresses/" + id,
            data: jsonData,
//            dataType: "json", alleen nodig als return data wordt 
            contentType: "application/json",
            success: function () {
                window.opener.location.reload(true);
                setTimeout(function () {
                    window.close();
                }, 200);
 //               Dit was een controle zin met de users om te kijken of het werkte
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

                window.location.href = "/Jee-Shop/customer_confirmation.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    }

}


