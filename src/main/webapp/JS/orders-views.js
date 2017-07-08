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
            datarow += '<td >' + value.firstName + '</td>';
            datarow += '<td >' + value.familyName + ' </td>';
            datarow += '<td >' + value.zipCode + ' </td>';
            datarow += '<td >' + value.number + ' </td>';
            datarow += '<td >' + value.street + ' </td>';
            datarow += '<td >' + value.city + '</td>';
            datarow += '<td ><button id="view" onclick="viewRow(this,' + index + ')">View</button></td>';
            datarow += '</tr>';
            
        });
        datarow += '</tbody>';
        $('#table_order').append(datarow);
    });
};

function viewRow (button, index, value){
    
    alert("view is geklikt! bij nummer "+index+" en met button" + button);
    
    button.parentNode.parentNode.className = 'highlight';
    
    button.parentNode.innerHTML = '<button id="unview" onclick="unviewRow(this,' + index + ')">Unview Details</button>';
    
  
  
   
  
  //geeftWagenWeer(index);
  
  
  
  
    
};

function unviewRow(button,index){
    button.parentNode.parentNode.className = ''; 
    button.parentNode.innerHTML = '<button id="view" onclick="viewRow(this,' + index + ')">View Details Again</button>';
    
    //liefst ook leeg halen viewtables.
    
    
};




 function geeftwagenWeer(id){
                
                $("#table_viewWagen").remove();

                 var datarowSubOrder = " ";
                
                $.getJSON('rest/cartsuborders', function (data) {
                   
                    
                    $.each(data, function (key, value) {
                        
                      
                      if (value.cart && value.cart.id===id  ){
                        
                        datarowSubOrder += ' <tr class="table_content">';
                        datarowSubOrder += ' <td align=/"left/">' + value.id + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.product.name + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.product.category + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.product.brand + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.product.price + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.quantity + ' </td>';
                        datarowSubOrder += ' <td align=/"left/">' + value.subTotal + ' </td>';
                        
                        
                        totalPrijs+= value.subTotal;
                       
                       } //einde if
                    });
                   
                    $('#table_viewWagen').append(datarowSubOrder);

                });
                
 };



