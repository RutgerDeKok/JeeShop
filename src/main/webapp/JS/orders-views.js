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
            datarow += '<td id="winkelwagenid"  hidden>' + value.id + '</td>';
            datarow += '<td >' + value.orderDate + ' </td>';
            datarow += '<td >' + value.totalPrice + ' </td>';
            datarow += '<td >' + value.firstName + '</td>';
            datarow += '<td >' + value.familyName + ' </td>';
            datarow += '<td >' + value.zipCode + ' </td>';
            datarow += '<td >' + value.number + ' </td>';
            datarow += '<td >' + value.street + ' </td>';
            datarow += '<td >' + value.city + '</td>';
            datarow += '<td ><button id="view" onclick="viewRow(this)">View</button></td>';
            datarow += '</tr>';
            
        });
        datarow += '</tbody>';
        $('#table_order').append(datarow);
    });
};

function viewRow (button){
    
    
    button.parentNode.parentNode.className = 'highlight';
    
    
    
  
  //hier moet code zodat de juiste waarde (winkelwagen id ) door gegeven wordt ipv 0-35.
   var wwi = $("#winkelwagenid").val();
   
   alert("wwi is" +wwi);
  
  geeftWagenWeer(wwi);
  
  
  button.parentNode.innerHTML = '<button id="unview" onclick="unviewRow(this)">Unview Details</button>';
  
    
};

function unviewRow(button,index){
    button.parentNode.parentNode.className = ''; 
    button.parentNode.innerHTML = '<button id="view" onclick="viewRow(this,' + index + ')">Zie details opnieuw</button>';
    
    //liefst ook leeg halen viewtables.
    
    
};




 function geeftwagenWeer(id) {

    $("#table_viewWagen").remove();

    var datarowSubOrder = " ";

    $.getJSON('rest/cartsuborders', function (data) {


        $.each(data, function (key, value) {

//dit is nog cheaten (id input) .(waarden 55-70 bestaan)
            if (value.cart && value.cart.id == 60) {

                datarowSubOrder += ' <tr class="table_content">';
                datarowSubOrder += ' <td align=/"left/">' + value.id + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.name + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.category + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.brand + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.product.price + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.quantity + ' </td>';
                datarowSubOrder += ' <td align=/"left/">' + value.subTotal + ' </td>';

                totalPrijs += value.subTotal;

            } //einde if
            else {
                alert("waarschijnelijk foute index waarde.");
            }
        });

                    $('#table_viewWagen').append(datarowSubOrder);
                    //$("#footer").text("TotaalPrijs: " + Math.round(totalPrijs*100)/100);

    });

}
;



