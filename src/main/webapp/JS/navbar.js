$(document).ready(function(){
    $('#dropdown-trigger').click(function() {
        $(this).next('#dropdown').slideToggle();
        $(this).toggleClass('active');             
        if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;');
            else $(this).find('span').html('&#x25BC;');
        });
});