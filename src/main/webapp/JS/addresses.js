function displayUserAddress() {
    //var isRegistered = lookup user
    if (isRegistered) {
        var addressJson = $.getJSON('/addresses/' + user.getBillingAddressId());
        var addressObj = JSON.parse(addressJson);
    } else {
        //user is niet ingelogd, dus geen toegang?
        console.log("Kan geen adres ophalen");
    }    
}

function displayCartAddress() {
    //var isRegistered = lookup user
    if (isRegistered) {
        var addressJson = $.getJSON('/addresses/' + user.getBillingAddressId());
        var addressObj = JSON.parse(addressJson);
    } else {
        //user is niet ingelogd, dus geen toegang?
        console.log("Kan geen adres ophalen");
    }    
}

function editUserAddress() {
    //var isRegistered = lookup user
    if (isRegistered) {
        var addressJson = $.getJSON('/addresses/' + user.getBillingAddressId());
        var addressObj = JSON.parse(addressJson);
        console.log(addressObj);
        //use addressObj to pupulate fields
        //let user edit fields
        //send back new addressObj
        $.ajax({
            type: "PUT",
            url: "rest/addresses/" + addressObj[id],
            data: addressObj,
            contentType: "application/json",
            success: function () {
                console.log("Save Succesful!");
            },
            error: function () {
                alert("Error, " + addressObj);
            }
        });
        
        
    } else {
        //user is niet ingelogd, dus geen toegang?
        console.log("Kan geen adres ophalen");
    }    
}

function startAddressesTable() {     
    $.getJSON('rest/addresses', function (data) { 
        var datarow = " "; 
        var rowindex = 0; 
         
//        alert("first row is"+data.products[0]); 
        $.each(data, function (key, value) { 
            datarow += '<tr>'; 
            datarow += ' <td align=/"left/">' + value.firstName + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.insertion + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.familyName + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.street + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.number + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.numAddition + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.city + ' </td>'; 
            datarow += ' <td align=/"left/">' + value.zipCode + ' </td>'; 
            rowindex++; 
        }); 
        $('#table_main').append(datarow); 
    }); 
}


