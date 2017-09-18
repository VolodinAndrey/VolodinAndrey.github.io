// SCROLL LAYOUT WITH EASING
var ScrollLayout = (function() {

	// cache and initialize some values
	var config = {
		// the cbp-fbscroller's sections
		$sections : $( '#msl > section' ),
		// the navigation links
		$navlinks : $( '#msl > nav > a' ),
		// custom: homenav
		$homenav : $( '#header-nav > a'),
		// index of current link / section
		currentLink : 0,
		// index of current link / section
		$body : $( 'html, body' ),
		// the body animation speed
		animspeed : 1050,
		// the body animation easing (jquery easing)
		animeasing : 'easeInOutExpo'
	};

	function init() {

		// custom: homenav
		config.$homenav.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			return false;
		} );

		// click on a navigation link: the body is scrolled to the position of the respective section
		config.$navlinks.on( 'click', function() {
			scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
			return false;
		});

		var waypoints = $('#sec2').waypoint({
			handler: function(direction) {
				$('#fix-menu').fadeToggle("fast", "linear");
			},
			offset: '50%'
		});


	}

	// function to scroll / animate the body
	function scrollAnim( myTop ) {
		config.$body.stop().animate( { scrollTop : myTop }, config.animspeed, config.animeasing );
	}

	return { init : init };

})();


// ADDITIONAL FEATURES
$(document).ready(function(){
	// SECTIONS HEIGHT BASED ON VIEWPORT
	resizeDiv();

	// SLICK SLIDER
	$('.portfolio-slider').slick({
		arrows: false,
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,		
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		]
	});

	// CUSTOM SLICK NAV
	$('.next-slide').click(function(){
	    $(".slick-slider").slick('slickNext');
	});

	$('.prev-slide').click(function(){
	    $(".slick-slider").slick('slickPrev');
	});


	$('.slick-slider').on('edge', function(event, slick, direction) {
		if (direction === 'left') {
			$(".next-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-next-edge.png');
		}
	}).on('swipe', function(event, slick, direction){
		if (direction === 'right') {
			$(".next-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-next-fill.png');
		}
	});

	$('.slick-slider').on('edge', function(event, slick, direction) {
		if (direction === 'right') {
			$(".prev-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-prev-edge.png');
		}
	}).on('swipe', function(event, slick, direction){
		if (direction === 'left') {
			$(".prev-slide").attr('src', 'https://himigatliwanag.files.wordpress.com/2016/01/slick-prev-fill.png');
		}
	});


});

window.onresize = function(event) {
	resizeDiv();
};

function resizeDiv() {
	vpw = $(window).width();
	vph = $(window).height();
	$('.page-sections').css({'min-height': vph + 'px'});
};

$(function() {
		ScrollLayout.init();
});



// ____________________________ Cache selectors
var lastId,
    topMenu = $("#fix-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});