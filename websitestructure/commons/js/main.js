
$(document).ready(function() {
   slickInit();
   setUpListeners();
   $('.languages-menu').styler();
});



function slickInit() {
     $('.bottom-carousel__body').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
    });
    $('.product-detail__main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
    });
    $('.single-news__carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
    });
};

function setUpListeners() {

    $('.cookie__close-btn').on('click', closeCookie);
    $('.gamburger').on('click', toggleMenu);
    $('.shadow').on('click',toggleMenu);
    $(document).on('keydown', function(e) {
        console.log(e);
    });
};

function closeCookie() {
    var $this = $(this),
        cookie = $this.closest('.cookie');
    cookie.fadeOut(200);
    return false;
};

function toggleMenu() {
    var $this = $(this),
        mainMenu = $('.main-menu'),
        shadow = $('.shadow');

    mainMenu.stop(true, true).slideToggle(300);
    shadow.stop(true, true).fadeToggle(200);
    
    
    return false;
};