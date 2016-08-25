/**********
* Accordion
*/

var accordion = (function() {
    function init() {
        _setUpListeners();
    };

    function _setUpListeners() {
        $('.mobile-menu__link-wrap').on('click', _toggleAcc);    
    };

    function _toggleAcc(e) {

        
        var $this = $(this),
            parent = $this.closest('.mobile-menu__item'),
            innerList = parent.find('.mobile-menu__inner-list'),
            otherParents = parent.siblings('.mobile-menu__item'),
            otherLists = otherParents.find('.mobile-menu__inner-list'),
            arrow = parent.find('.fa'),
            otherArrows = otherParents.find('.fa');

        if ((innerList.length)&&(!$(e.target).hasClass('mobile-menu__link'))) {
            innerList.stop(true, true).slideToggle(300);
            otherLists.stop(true, true).slideUp(300);
            arrow.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
            otherArrows.addClass('fa-angle-down').removeClass('fa-angle-up');
        };
        
    };

    return  {
        init: init
    };

})();


/*********************
* Search button mobile
*/

var search = (function() {
    function init() {
        _setUpListeners();
    };

    function _setUpListeners() {
        $('.search-btn').on('click', _toggleSearch);   
    };

    function _toggleSearch(e) {
        var $this = $(this);
        $('.mobile-search').stop(true,true).fadeIn(300);
        $this.toggleClass('hidden', true);
        $('body').on('click', function(e) {
           if (!(e.target.closest('.mobile-search')||e.target.closest('.search-btn'))) {
                $this.toggleClass('hidden', false);
                $('.mobile-search').stop(true,true).fadeOut(300);
           };
        });
    };

    return  {
        init: init
    };
})();

/******
* Popup
*/

var popup = (function() {
    function init() {
        _setUpListeners();
    };

    function _setUpListeners() {
        $('.collection__link').on('click', showPopup);
        $('.popup__btn').on('click', hidePopup);
    };

    function showPopup(e) {
        if (!$('html').hasClass('mobile')) {
            e.preventDefault();
            var $this = $(this),
                bg = $('.popup__bg'),
                modalNum = $this.data('modal'),
                modal = $('.popup__container').eq(modalNum);
            if (modal.length) {
                bg.show();
                modal.show();
            }
            
        };
    };
    function hidePopup(e) {
         e.preventDefault();
            var $this = $(this),
                bg = $('.popup__bg'),
                modal = $this.closest('.popup__container');
            bg.hide();
            modal.hide();
    };

    return  {
        init: init
    };

})();

/**************
* Video Control
*/

var play = (function() {
    function init() {
        _setUpListeners();
    };

    function _setUpListeners() {
        $('.video-btn').on('click', playVideo);
    };

    function playVideo(e) {
        e.preventDefault();
        var video = $(this).closest('.video-wrapper').find('video');
        video[0].play();
        $(this).hide();
    };

    return  {
        init: init
    };

})();

/***************
* Initialization
*/

$(document).ready(function() {
    var stickyHeader = $('body').not('.home-page').find('.main-header');
    stickyHeader.sticky({
        topSpacing:0,
        zIndex: 100
    });
    isMobile();
    play.init();
    popup.init();
    accordion.init();
    search.init();
    slickInit();
    setUpListeners();
    $('.languages-menu').styler();
});



function slickInit() {
     $('.bottom-carousel__body').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ],
        autoplay: 4000
    });
    $('.product-detail__main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: 4000
    });
    $('.single-news__carousel').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        responsive: [
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        autoplay: 4000
    });
};

function setUpListeners() {
    $(window).on('resize', function() {
        isMobile;
        $('.main-header').sticky('update');    
    });
    $('.cookie__close-btn').on('click', closeCookie);
    $('.gamburger').on('click', function() {
        if ($(this).hasClass('open')) {
            closeMenu();
        } else openMenu();
    });
    $('.shadow').on('click',closeMenu);
    $(document).on('keydown', function(e) {
        if (e.keyCode === 27) {
            closeMenu();
        }
    });
};

function closeCookie() {
    var $this = $(this),
        cookie = $this.closest('.cookie');
    cookie.fadeOut(200);
    return false;
};

function closeMenu(e) {
    var menu = $('html').hasClass('mobile') ? $('.mobile-menu') : $('.main-menu');
    menu.stop(true,true).slideUp(300);
    $('.shadow').stop(true,true).fadeOut(300);
    $('.gamburger').toggleClass('open', false);
    return false;
};

function openMenu(e) {
    var menu = $('html').hasClass('mobile') ? $('.mobile-menu') : $('.main-menu');
    menu.stop(true,true).slideDown(300);
    $('.shadow').stop(true,true).fadeIn(300);
    $('.gamburger').toggleClass('open', true);
    return false;
};

function isMobile() {
    var width = $(document).outerWidth();

    if (width < 643) {
        $('html').toggleClass('mobile', true);
        $('.main-menu').stop(true,true).slideUp(300);
        $('.shadow').stop(true,true).fadeOut(300);
        $('.compact-menu').stop(true,true).show();
        $('.search-btn').show();
    } else {
        $('html').toggleClass('mobile', false);
        $('.mobile-menu').stop(true,true).slideUp(300);
        $('.shadow').stop(true,true).fadeOut(300);
        $('.gamburger').toggleClass('open', false);
        $('.search-btn').hide();
    }
};


