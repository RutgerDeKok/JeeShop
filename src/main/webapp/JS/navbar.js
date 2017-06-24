$(document).ready(function(){
    $('#login-trigger').click(function() {
        slideDown($(this));
        slideUp($(document).find('#signup-dropdown'));
        isActive($(this));        
    });
});

$(document).ready(function(){
    $('#signup-trigger').click(function() {
        slideDown($(this));
        slideUp($(document).find('#login-dropdown'));        
        isActive($(this));
    });
});

function isActive(element) {
    if (element.hasClass('active')) {
        element.find('span').html('&#x25B2;');
    } else {
        element.find('span').html('&#x25BC;');
    };
}

function slideDown(element) {
    if (element.is('#login-trigger')) {
        element.next('#login-dropdown').slideToggle();
    }
    else {
        element.next('#signup-dropdown').slideToggle();
    }
    element.toggleClass('active');
}

function slideUp(element) {
    var trigger = "";
    if (element.is('#login-dropdown')) {
        trigger = $(document).find('#login-trigger');     
    }
    else {
        trigger = $(document).find('#signup-trigger');
    }
    if (trigger.hasClass('active')) {        
        trigger.toggleClass('active'); 
        element.slideUp();
    }
    isActive(trigger);
}

$(document).ready(function(){
    $('#login-submit').click(function(e) {
        e.preventDefault();
        var jsonData = JSON.stringify($('#login').serializeArray()
            .reduce(function(dataObject, field) { 
                dataObject[field.name] = field.value; return dataObject; 
            }, 
        {}));
        $.ajax({
        url: 'rest/users/login',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        //dataType: "application/json; charset=utf-8",
        data: jsonData,
        success: function(data) {
            console.log("Cookie: " + document.cookie);
            console.log(data);
            console.log("Locatie: " + location.href);
        },
        error: function(data) {
            console.log(data);
        }           
        });
   }); 
});

$(document).ready(function(){
    $('#signup-submit').click(function(e) {
        e.preventDefault();
        var jsonData = JSON.stringify($('#signup').serializeArray()
            .reduce(function(dataObject, field) { 
                dataObject[field.name] = field.value; return dataObject; 
            }, 
        {}));
        $.ajax({
        url: 'rest/users',
        type: 'POST',
        contentType: "application/json; charset=utf-8", 
        data: jsonData,
        success: function(data) {
            console.log("Succes");
        },
        error: function(data) {
            console.log("Error");
        }           
        });
   }); 
});