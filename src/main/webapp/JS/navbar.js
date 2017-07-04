$(document).ready(function () {

    // set click action on menu items
    $('#login-trigger').click(function () {
        toggleActive($('#login-list'));
        isActive($(this));
    });

    $('#signup-trigger').click(function () {
        toggleActive($('#signup-list'));
        isActive($(this));
    });

    $('#signedin-trigger').click(function () {
        toggleActive($('#signedin-list'));
        isActive($(this));
    });

    // set login click function
    $('#login-submit').click(function (e) {
        e.preventDefault();
        login();
    });

    // set logout click function
    $('#logout-submit').click(function (e) {
        e.preventDefault();
        logout();
    });

    // sign up submit function
    $('#signup-submit').click(function (e) {
        e.preventDefault();
        signup();
    });

    // show cookies button
    $('#cookies').click(function (e) {
        e.preventDefault();
        console.log("Cookies: " + document.cookie);
    });

    // check for user cookie
    if (getCookie("UserEmail")) {
        ShowLogedInDetails(getCookie("UserEmail"), getCookie("UserType"));
    }

});


// changes the class of the a tag in the list item
function toggleActive(listItem) {

    var a = $(listItem).find('a');
    if (a.attr('class') === 'active') {
        a.removeClass('active');
    } else {
        $('.active').removeClass('active');
        a.addClass('active');
    }
}

// changes the arrow from up to down and back again
// and slides the dropdown down or up
function isActive(trigger) {
    if ((trigger).hasClass('active')) {
        (trigger).find('span').html('&#x25B2;');
        slideDown((trigger).parent());
    } else {
        (trigger).find('span').html('&#x25BC;');
        slideUp((trigger).parent());
    }
}

function slideDown(element) {
    $('div.dropDown').slideUp();
    $(element).find("div.dropDown").slideDown();
}

function slideUp(element) {
    $(element).find("div.dropDown").slideUp();
}

function ShowLogedInDetails(email, type) {
    $('#signedin-list').find('a').html('Welcome ' + email + '<span>&#x25BC;</span>');
    toggleActive($('#login-list'));
    isActive($('#login-trigger'));
    $('#signedin-list').show();
    $('#login-list').hide();
    $('#signup-list').hide();

    if (type !== 'CUSTOMER') {
        $('.emp').show();
    }
}


// login submit function
function login() {

    var jsonData = JSON.stringify($('#login').serializeArray()
            .reduce(function (dataObject, field) {
                dataObject[field.name] = field.value;
                return dataObject;
            }, {}));
    console.log("login json: " + jsonData);

    $.ajax({
        url: 'rest/users/login',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        data: jsonData,
        success: function (data) {
            console.log(data);
            var dataObject = JSON.parse(data);
            document.cookie = "AccessToken=" + dataObject.token;
            document.cookie = "UserId=" + dataObject.id;
            document.cookie = "UserEmail=" + dataObject.email;
            document.cookie = "UserType=" + dataObject.type;

            ShowLogedInDetails(dataObject.email,dataObject.type);
        },
        error: function (data) {
            alert("log in gegevens incorrect");
            console.log(data);
        }
    });
}


// logout submit function
function logout() {

    // cookie deleten
    console.log("deleting cookies");
    document.cookie = "AccessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "UserId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "UserEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "UserType=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

    // de-activate, slide up, etc
    $('signup-trigger').removeClass('active');
    isActive($('signup-trigger'));
    $('#signedin-list').find('a').html('Welcome <span>&#x25BC;</span>');
    $('#signedin-list').hide();
    $('#login-list').show();
    $('#signup-list').show();
    $('.emp').hide();

}


// sign up submit function
function signup() {

    var jsonData = JSON.stringify($('#signup').serializeArray()
            .reduce(function (dataObject, field) {
                dataObject[field.name] = field.value;
                return dataObject;
            },
                    {}));
    alert(jsonData);
    $.ajax({
        url: 'rest/users',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        data: jsonData,
        success: function (data) {
            console.log("Register Succes");
        },
        error: function (data) {
            console.log("Error");
        }
    });
}




function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}