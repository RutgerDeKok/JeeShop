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
    
  
  geeftAdresWeer(index,value);
  
  geeftWagenWeer(index,value);
  
  
  
  
    
};

function unviewRow(button,index){
    button.parentNode.parentNode.className = ''; 
    button.parentNode.innerHTML = '<button id="view" onclick="viewRow(this,' + index + ')">View Details Again</button>';
    
    //liefst ook leeg halen viewtables.
    
    
};


function geeftAdresWeer(index,value){
    //data nodig (altijd maar 1)
    
    
    
    //data vullen in table_viewAdres
    
    
    
};

function geeftWagenWeer(index,value){ 
   
    //data nodige loop
    
    
    //data vullen in table_viewWagen
    
    
    
                
            
};





