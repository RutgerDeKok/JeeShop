function setCookie(name, value, daysToExpiration) {
    var d = new Date();
    d.setTime(d.getTime() + (daysToExpiration*24*60*60*1000));
    var expires = "expires="+ d.toLocaleTimeString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    var searchName = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(searchName) === 0) {
            return c.substring(searchName.length, c.length);
        }
    }
    return ""; // not 
}