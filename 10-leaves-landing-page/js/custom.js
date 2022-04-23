// JavaScript Document

AOS.init({
	offset: 200,
	duration: 800,
	easing: 'ease-out-cubic',
	delay: 100,
});



//

 $.scrollify({
    section : ".scrollify",
    sectionName : "section-name",
	interstitialSection:".footer1,.footer2",
    easing: "easeOutExpo",
    scrollSpeed: 1100,
    offset : 0,
    scrollbars: true,
    standardScrollElements: "",
    setHeights: true,
    overflowScroll: true,
    updateHash: true,
    touchScroll:true,
    before:function() {},
    after:function() {},
    afterResize:function() {},
    afterRender:function() {}
  });


//
(function(window) {
	
		'use strict';
	
		var openCtrl = document.getElementById('btn-search'),
			closeCtrl = document.getElementById('btn-search-close'),
			searchContainer = document.querySelector('.search'),
			inputSearch = searchContainer.querySelector('.search__input');
	
		function init() {
			initEvents();	
		}
	
		function initEvents() {
			openCtrl.addEventListener('click', openSearch);
			closeCtrl.addEventListener('click', closeSearch);
			document.addEventListener('keyup', function(ev) {
				// escape key.
				if( ev.keyCode == 27 ) {
					closeSearch();
				}
			});
		}
	
		function openSearch() {
			searchContainer.classList.add('search--open');
			inputSearch.focus();
		}
	
		function closeSearch() {
			searchContainer.classList.remove('search--open');
			inputSearch.blur();
			inputSearch.value = '';
		}
	
		init();
	
	})(window);
	
// menu	
	$(".menu-toggle img").click(function(){    
		$(".overlay").toggleClass("hide");
		});
		
		$(".overlay").click(function(){    
		$(".overlay").toggleClass("hide");
		});
	
// tooltip

		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});


//
$('.bn2').click(function(){
  $.scrollify.move("#3");
});

 $(".pagination a").on("click",function() {
        $.scrollify.move($(this).attr("href"));
      });