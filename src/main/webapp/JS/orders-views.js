$(document).ready(function () {
    $.get("../top-navbar.html", function (data) {
        $("#nav-placeholder").replaceWith(data);
    });

    startOrderTable();
});


function startOrderTable() {
    
    
    $.getJSON('../rest/sales', function (data) {
        
        
            var datarow = "<tbody>";
                $.each(data, function (index, value) {
            datarow += '<tr>';
            datarow += '<td  hidden>' + value.id + '</td>';
            datarow += '<td >' + value.orderDate + ' </td>';
            datarow += '<td >' + value.totalPrice + ' </td>';
            datarow += '<td >' + value.familyName + ' </td>';
            datarow += '<td >' + value.zipCode + ' </td>';
            datarow += '<td >' + value.number + ' </td>';
            datarow += '<td >' + value.city + '</td>';
            datarow += '<td ><button id="view" onclick="viewRow(this,' + index + ')">View</button></td>';
            datarow += '</tr>';
           
        });
        datarow += '</tbody>';
        $('#table_order').append(datarow);
    });
};

function viewRow (button, index){};