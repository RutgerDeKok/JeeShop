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
            datarow += '<td class="wwi"  hidden>' + value.id + '</td>';
            datarow += '<td >' + value.orderDate + ' </td>';
            datarow += '<td >' + value.totalPrice + ' </td>';
            datarow += '<td >' + value.firstName + '</td>';
            datarow += '<td >' + value.familyName + ' </td>';
            datarow += '<td >' + value.zipCode + ' </td>';
            datarow += '<td >' + value.number + ' </td>';
            datarow += '<td >' + value.street + ' </td>';
            datarow += '<td >' + value.city + '</td>';
            datarow += '<td ><button id="view" onclick="viewRow(this,' + value.id + ')">View</button></td>';
            datarow += '</tr>';

        });
        datarow += '</tbody>';
        $('#table_order').append(datarow);
    });
}
;

function viewRow(button, order_id) {


    button.parentNode.parentNode.className = 'highlight';
    //dit gaat altijd goed nu.
    //alert("order id is:" + order_id);

    geeftFinalSubordersWeer(order_id);

    button.parentNode.innerHTML = '<button id="unview" onclick="unviewRow(this,' + order_id + ')">Unview Details</button>';

}
;

function unviewRow(button, order_id) {
    button.parentNode.parentNode.className = '';
    button.parentNode.innerHTML = '<button id="view" onclick="viewRow(this,' + order_id + ')">Zie details opnieuw</button>';

    //liefst ook leeg halen viewtables.
    $("#table_viewFinalSubs").children("tbody").empty();
    
    
};


function geeftFinalSubordersWeer(id) {


    getCategories();

    

    var datarowSubOrder = "<tbody >";

    $.getJSON('/Jee-Shop/rest/finalsuborders/find_by_order_id/' + id, function (data) {

        $.each(data, function (key, value) {


            if (value.order.id === id) {

                datarowSubOrder += ' <tr >';
                datarowSubOrder += ' <td align=/"left/">' + value.id + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.prdName + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + getCategory(value.prdCategory) + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.prdBrand + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.itemPrice + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.quantity + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.subTotal + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.order.totalPrice + '</td>';
                

            } //einde if
            else {
                alert("niet gelijke data gevonden met de index id van table");
            }
        });
        datarowSubOrder += '</tbody>';
        $("#table_viewFinalSubs").append(datarowSubOrder);
        //$("#footer").text("TotaalPrijs: " + Math.round(totalPrijs*100)/100);

    });


}


function getCategories() {
    $.getJSON('../rest/products/categories', function (data) {
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














