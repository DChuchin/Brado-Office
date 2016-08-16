$(document).ready(function() {
    $('.bottom-carousel__body').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        asNavFor: '.product-detail__main-slider'
    });
    $('.product-detail__main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.bottom-carousel__body',
        infinite: true
    });
    $('.single-news__carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
    });
})

document.addEventListener('DOMContentLoaded',function() {
    console.log('load');
    let cookieLink = document.querySelector('.cookie__close-btn');

    if (cookieLink) {
        cookieLink.addEventListener('click', function(e){
            e.preventDefault();
            cookieLink.parentElement.style.display= 'none';
        });
    };
});
