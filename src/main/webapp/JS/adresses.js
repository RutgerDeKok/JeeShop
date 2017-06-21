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