// by ASH
var colors = new Array(
    [14,0,81],
    [24,6,82],
    [37,17,86],
    [46,28,98],
    [100,85,200],
    [14,0,81]);

/* by FRK
var colors = new Array(
    [20,12,70],
    [37,34,132],
    [100,85,200],
    [20,12,70],
    [100,85,200],
    [37,34,132]);*/
  
  var step = 0;
  //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0,1,2,3];
  
  //transition speed
  var gradientSpeed = 0.002;
  
  function updateGradient()
  {
    
    if ( $===undefined ) return;
    
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb("+r1+","+g1+","+b1+")";
  
  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "rgb("+r2+","+g2+","+b2+")";
  
   $('.gradient').css({
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
    
    step += gradientSpeed;
    if ( step >= 1 )
    {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];
      
      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      
    }
  }
  
  setInterval(updateGradient,5);


// Player 3D

  //Sets Variables
var thumb = $('.js-thumb');
var shine = $('.js-shine');
var moreInfo = $('.js-more-info');
var hovered = false;

//Event Listner waiting for the mouse to enter the div .thumb
thumb.on('mousemove', function (e) {

	//set the hovered var to true
	hovered = true;

	//on hover if thumb has class idle removes it
	if ($(this).hasClass('idle')) {
		$(this).removeClass('idle');
	}

	// Define vars
	//gets the half point horizontally
	var hCenter = $(this).width() / 2;
	//gets the half point vertically
	var vCenter = $(this).height() / 2;
	//gets the x coord of the pointer
	var relativeX = e.pageX - $(this).offset().left;
	//gets the y coords of the pointer
	var relativeY = e.pageY - $(this).offset().top;
	//calculates the x rotation
	var xRotation = (relativeY - vCenter) * 0.1;
	//calculates the y rotation
	var yRotation = (relativeX - hCenter) * 0.05;
	//calculates the x-offset of the shine
	var xShine = relativeX * 100 / $(this).width();
	//calculates the y-offset of the shine
	var yShine = relativeY * 100 / $(this).height();

	//Invert x and y offset
	xShine = 100 - xShine;
	yShine = 100 - yShine;

	//var coords = [{xcord:xShine,ycod:yShine}]
	//console.table(coords);

	//Apply rotation to the element
	$(this).css({ transform: 'rotatex(' + xRotation + 'deg) rotatey(' + yRotation + 'deg)' });

	//Apply the shine to the element
	$('.js-shine').css({ background: 'radial-gradient(ellipse at ' + xShine + '% ' + yShine + '%, rgba(255,255,255,0.4) 0%,rgba(51,51,51,0) 60%)' });
});

//on the mouse leave reset the thumb
thumb.on('mouseleave', function () {
	$(this).css({ transform: 'rotatex(0deg) rotatey(0deg)' });
	$('.js-shine').css({ background: 'none' });
});

//event listner waiting for a click on the more info btn
moreInfo.on('click', function () {
	var info = $('.info');
	$('.info').toggleClass('open');
	if (info.hasClass('open')) {
		$(this).html('Less info');
	} else {
		$(this).html('More info');
	}
});

//After xs if no interaction was made with the thumbnail adds in a little helper with what to do, this should disapear after you mouse on the thumb
setTimeout(function () {
	if (hovered == false) {
		thumb.addClass('idle');
	}
}, 8000);


$('.about-carousel-ul li').click(function(){
$('.about-carousel-ul li').removeClass('active');
$(this).addClass('active');
});