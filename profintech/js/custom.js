		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	$('.menu').click(function(e){
      $('.drawer').toggleClass('active');
      $('.menu').toggleClass('active');      
      e.preventDefault();
    });

    $('.mobileheader nav ul li a').click(function(e){
      $('.drawer').toggleClass('active');
      $('.menu').toggleClass('active');            
     });

     setTimeout(function(){
			$("#loader-wrapper").addClass("loaderhide");
     }, 3000);  
     
     function _(id){ return document.getElementById(id); }
function submitForm(){
	_("mybtn").disabled = true;
	_("status").innerHTML = 'please wait ...';
	var formdata = new FormData();
	formdata.append( "n", _("n").value );
	formdata.append( "e", _("e").value );
	formdata.append( "m", _("m").value );
	var ajax = new XMLHttpRequest();
	ajax.open( "POST", "contact_me.php" );
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			if(ajax.responseText == "success"){
				_("my_form").innerHTML = '<h2>Thanks '+_("n").value+', your message has been sent.</h2>';
			} else {
				_("status").innerHTML = ajax.responseText;
				_("mybtn").disabled = false;
			}
		}
	}
	ajax.send( formdata );
}