//TODO: some strange value
var min_height = 600;
$(function () {
	resizeFrame();
});
function resizeFrame()
{
	if(1 == 0)
		return false;
	var main_iframe = $('#preview');
	//var height = $(window).height() - $('#preview-bar:visible').outerHeight()  - $('#pages-bar:visible').outerHeight();
    var height = $(window).height();
    
	/* if($.browser.opera)
	 height += 5;
	 */
	if(height < min_height)
		height = min_height;
	$('#preview').height(height);
	$('#iframelive').height(height);
	//$('#preview-wrapper').height(height);
	if($(window).width() < 1400)
		$('#min-hide-this').hide();
	else
		$('#min-hide-this').show();

}
$(window).resize(function () {
	resizeFrame();
}).load(function () {
	resizeFrame();
});
$(document).ready(function () {
	$('#close').click(function (e) {
		e.preventDefault();
		document.location.href = "";
		/*$("#preview-bar").hide();
		 resizeFrame();*/
	});
})

$(document).ready(function(){
$('#responsive_controller').BootSideMenu({side:"left", autoClose:false});

$(document).ready(function () {
    
    
	try {
		var preUrl = '';
		var imgs = ['system/imgs/p-v-active.png', 'system/imgs/p-o-active.png', 'system/imgs/t-v-active.png', 'system/imgs/t-o-active.png', 'system/responsive/pad-port-1d1d1d.jpg', 'system/responsive/pad-land-1d1d1d.jpg', 'system/responsive/phone-land-1d1d1d.jpg', 'system/responsive/phone-port-1d1d1d.jpg'], i, src;
		for(i in imgs) {
			src = imgs[i];
			imgs[i] = new Image();
			imgs[i].src = src;
		}
	} catch(e) {
	}    
    
    
	if(!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Opera Mini/))) {
		var frame = document.getElementById('preview');
		$('#iframelive').removeClass().addClass('desktop');
		$('#desktop').removeClass().addClass('active');
		$('div#responsivator_2').show();
		$('div#responsivator_2 span').click(function () {
			$('div#responsivator_2 > span').removeClass();
			$(this).addClass('active');
			$('#iframelive').removeClass().addClass($(this).attr('id'));
			//for reloading frame and scroll to top
			//frame.src = frame.src;
		});
	}
    
    
    $('#autoclose').bootstrapToggle();
    
});      
});

function checkandclose(pagina, file){

if ($('#autoclose').prop('checked')){
    $( ".toggler" ).trigger( "click" );
    
    setTimeout(function(){var $iframe = $('#preview'); $iframe.attr('src',file);   }, 500);
    
} else {
    var $iframe = $('#preview');               
    $iframe.attr('src',file);
}



}