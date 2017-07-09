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
            datarow += '<td ><button id="view" onclick="viewRow(this,'+value.id+')">View</button></td>';
            datarow += '</tr>';
            
        });
        datarow += '</tbody>';
        $('#table_order').append(datarow);
    });
};

function viewRow (button,order_id){
    
    
    button.parentNode.parentNode.className = 'highlight';
    //dit gaat altijd goed nu.
    //alert("order id is:" + order_id);

    geeftFinalSubordersWeer(order_id);

    button.parentNode.innerHTML = '<button id="unview" onclick="unviewRow(this,'+order_id+')">Unview Details</button>';

};

function unviewRow(button,order_id){
    button.parentNode.parentNode.className = ''; 
    button.parentNode.innerHTML = '<button id="view" onclick="viewRow(this,' + order_id + ')">Zie details opnieuw</button>';
    
    //liefst ook leeg halen viewtables.
   
};




 function geeftFinalSubordersWeer(id) {

    //Dit gaat altijd goed.
   //alert(id+"is de waarde die geeftFinalSuborderWeerKrijgt");




    var datarowSubOrder = "<tbody>";
    
    $.getJSON('/Jee-Shop/rest/finalsuborders/find_by_order_id/'+id, function (data) {

        $.each(data, function (key,value) {

        alert("De id is = "+ id);
        
        
        alert("value.order.id is : "+value.order.id);


            if (value.order.id === id) {
                
                 alert("ze zijn inderdaad gelijk!");

                datarowSubOrder += ' <tr >';
                datarowSubOrder += ' <td align=/"left/">' + value.id + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.name + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.category + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.brand + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.price + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.quantity + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.subTotal + ' </td>';
                //dit gaat niet helemaal lekker.
                
                alert("komt niet aan, anders zie je dit wel.");
                //totalPrijs += value.subTotal;

            } //einde if
            else {
                alert("waarschijnelijk foute index waarde.");
            }
        });
                    datarowSubOrder += '</tbody>';
                    $(".display").append(datarowSubOrder);
                    //$("#footer").text("TotaalPrijs: " + Math.round(totalPrijs*100)/100);

    });

}





