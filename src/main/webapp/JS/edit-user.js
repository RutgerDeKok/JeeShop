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

    $.getJSON('/Jee-Shop/rest/users/' + id, function (user) {
        var address = user.billingAddress;
        if (!address) {
            address = {};
        }
        $('#IdId').val(user.id);
        $('#hashId').val(user.passHash);
        $('#emailId').val(user.email);
        $('#addressIdId').val(address.id);
        $('#firstNameId').val(address.firstName);
        $('#insertionId').val(address.insertion);
        $('#familyNameId').val(address.familyName);
        $('#streetId').val(address.street);
        $('#numberId').val(address.number);
        $('#additionId').val(address.numAddition);
        $('#zipCodeId').val(address.zipCode);
        $('#cityId').val(address.city);
        if (!id > 0) {
            // show the password boxes
            toggle_vis();
            //hide the checkbox to choose password options
            $('#passOption').each(function (i, obj) {
                $(obj).hide();
            }); 
        }
        //populate pulldown menu for User Type
        var select = $('#typeId');
        $.getJSON('/Jee-Shop/rest/users/types', function (data) {
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
    $.getJSON('/Jee-Shop/rest/users/types', function (types) {
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
    userObject.passHash = $('#hashId').val();
    userObject.pass = $('#pass').val();
    userObject.email = $('#emailId').val();
    userObject.type = $('#typeId').val().trim();
    
    
    userObject.billingAddress = addressObject;


    var jsonData = JSON.stringify(userObject);
    alert(jsonData);
    var id = userObject.id;
   
    if (id&&id.length>0) {
        alert("PUT");
        $.ajax({
            type: "PUT",
            url: "/Jee-Shop/rest/users/" + id,
            data: jsonData,
            contentType: "application/json",
            success: function () {
                window.opener.location.reload(true);
                setTimeout(function () {
                    window.close();
                }, 100);
//                window.location.href = "/Jee-Shop/employees/users.html";
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });
    } else {
        alert("POST");
        $.ajax({
            type: "POST",
            url: "/Jee-Shop/rest/users/employees/",
            data: jsonData,
            dataType: "text",
            contentType: "application/json",
            success: function (data) {

                console.log(data);
                if (data === "EMAIL_IN_USE") {
                    console.log("adjusting message");
                    $('#feedbackText').html("Email reeds ingebruik,<br> kies een andere.");
                } else {
                    console.log("Registered Succesfully");
                    window.opener.location.reload(true);
                    setTimeout(function () {
                        window.close();
                    }, 100);
                }
            },
            error: function () {
                alert("Error, " + jsonData);
            }
        });

    }

}

function toggle_vis() {
    console.log("toggle visability of pasword imputs");
    var pattern = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}";
    $('.passRow').each(function (i, obj) {
        console.log("checking row: " + (i + 1));
        var row = $(obj);
        if (row.is(":visible")) {
            row.hide();
            row.find('input').removeAttr("required");
            row.find('input').removeAttr("pattern");
            row.find('input').val("");
        } else {

            row.show();
            row.find('input').attr("required", );
            row.find('input').attr("pattern", pattern);

        }

//         getAttributes(row.find('input'));

    });
}

function getAttributes($node) {
    var attrs = {};
    $.each($node[0].attributes, function (index, attribute) {
        console.log("name: " + attribute.name + " , value: " + attribute.value);
    });

    return attrs;
}



