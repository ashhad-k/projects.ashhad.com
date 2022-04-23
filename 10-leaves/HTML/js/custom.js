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
	
	
	$(".menu-toggle img").click(function(){    
		$(".overlay").toggleClass("hide");
		});
		
		$(".overlay").click(function(){    
		$(".overlay").toggleClass("hide");
		});
		
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	
	
		$("#help .nav-tabs a").click(function() {
			$("#help .nav-tabs a").removeClass("active")
			$(this).addClass("active");
		  
		  });
	
		$(".carousel-arrows li").click(function() {
			$(".carousel-arrows li").removeClass("active")
			$(this).addClass("active");
		  
		});
		
		$(".service-dropdown span").click(function() {
			$(".service-dropdown span").removeClass("active")
			$(this).addClass("active");
		  
		  });
					  
		  setTimeout(function(){
			$(".loader").addClass("loaderhide");
		 }, 2000);  

 
        $(window).scroll(function(){
            if ($(this).scrollTop() > 250) {
                $('.gotop').fadeIn();
            } else {
                $('.gotop').fadeOut();
            }
        });
 
        $('.gotop').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });
 
