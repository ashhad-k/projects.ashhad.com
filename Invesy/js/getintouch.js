/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	var openCtrl = document.getElementById('btn-contact'),
		openCtrl2 = document.getElementById('btn-contact2'),
		closeCtrl = document.getElementById('btn-contact-close'),
		contactContainer = document.querySelector('.contact'),
		inputcontact = contactContainer.querySelector('.contact__input');

	function init() {
		initEvents();	
	}

	function initEvents() {
		openCtrl.addEventListener('click', opencontact);
		openCtrl2.addEventListener('click', opencontact);
		closeCtrl.addEventListener('click', closecontact);
		document.addEventListener('keyup', function(ev) {
			// escape key.
			if( ev.keyCode == 27 ) {
				closecontact();
			}
		});
	}

	function opencontact() {
		contactContainer.classList.add('contact--open');
		inputcontact.focus();
	}

	function closecontact() {
		contactContainer.classList.remove('contact--open');
		inputcontact.blur();
		inputcontact.value = '';
	}

	init();

})(window);