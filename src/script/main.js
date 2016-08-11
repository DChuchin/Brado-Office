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
