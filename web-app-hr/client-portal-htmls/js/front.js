$(function () {
$('.selectdate').datepicker({});

$(".monthyear").datepicker( {
    format: "mm-yyyy",
    viewMode: "months", 
    minViewMode: "months"
});


// $('.Menubtn').click(function(){
//     $(this).toggleClass('open');
// });

$('.overlay, .Menubtn').click(function(){
    $('.sidebar-link + div').removeClass('show')
    $('.Menubtn').toggleClass('open')
});
    $('.slideBtn').click(function(){
          $('.slideData').slideToggle();
    });
// $('.selectdate').datepicker({});
    // ------------------------------------------------------- //
    // Sidebar
    // ------------------------------------------------------ //
    $('.sidebar-toggler').on('click', function () {
        $('.sidebar').toggleClass('shrink show');
        $('.overlay').toggleClass('active')
    });
    $('.overlay').on('click', function(){
       $('.sidebar').toggleClass('shrink show');
       $(this).removeClass('active');
       $('.Menubtn').removeClass('open')
    })



    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $( "<link id='new-stylesheet' rel='stylesheet'>" ).insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {
        if ($(this).val() !== '') {
            var theme_csspath = 'css/style.' + $(this).val() + '.css';
            alternateColour.attr("href", theme_csspath);
            $.cookie("theme_csspath", theme_csspath, { expires: 365, path: document.URL.substr(0, document.URL.lastIndexOf('/')) });
        }
        return false;
    });
});


// Cookies.set('active', 'true');
