$(document).ready(function(){
    $('#login-trigger').click(function() {
        $(this).next('#login-dropdown').slideToggle();
        $(this).toggleClass('active');             
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;');
            else $(this).find('span').html('&#x25BC;');
        });
});

$(document).ready(function(){
    $('#signup-trigger').click(function() {
        $(this).next('#signup-dropdown').slideToggle();
        $(this).toggleClass('active');             
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;');
            else $(this).find('span').html('&#x25BC;');
        });
});

$(document).ready(function(){
   $('#login-submit').click(function() {
      var form = document.getElementById("login") ;
      form.submit();
      $.ajax({
        url: '/rest/users',
        type: 'post',
        dataType: 'json',
        data: $('#login').serialize(),
        success: function(data) {                   
                 }
      });
   }); 
});

$(document).ready(function(){
   $('#signup-submit').click(function(e) {
       e.preventDefault();
//     var form = document.getElementById("signup") ;
//      form.submit();
    console.log(JSON.stringify($('#signup').serialize()));
      $.ajax({
        url: '/rest/users',
        type: 'post',
        dataType: 'json',
        data: JSON.stringify($('#signup').serialize()),
        success: function(data) {
            console.log("Succes");
        },
        error: function(data) {
            console.log("Error");
        }           
      });
   }); 
});