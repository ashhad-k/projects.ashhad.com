(function() {
  'use strict';

  var renderer = getRenderer(),
      camera   = new THREE.PerspectiveCamera(60,1,0.1,10000),
      scene    = new THREE.Scene(),
      prevX,
      oGeometry,
      mesh,
      timeline;

  var ROTATION_RATE        = 300,
      DEFORMATION_STRENGTH = 20;

  function init() {
    var L1,
        L2;

    document.getElementById('interactive-object').appendChild(renderer.domElement);

    camera.position.z = 200;
    scene.add(camera);
    renderer.setSize(600,600);

    L1 = new THREE.PointLight( 0xffffff, 1);
    L1.position.set(100, 100, 100);
    scene.add(L1);

    L2 = new THREE.PointLight( 0xffffff, 0.8);
    L2.position.set(-100, 50, 200);
    scene.add(L2);

    mesh = createMesh();
    mesh.dynamic = true;
    mesh.rotation.z = 1;

    oGeometry = mesh.geometry.clone();

    scene.add(mesh);

    document.addEventListener('mousemove', mutate, false);

    TweenLite.ticker.addEventListener("tick", render);
    setupTweens();
  }

  function render() {
    renderer.render(scene, camera);
    mesh.geometry.verticesNeedUpdate = true;
  }

  function mutate(e) {
    if (!prevX) {
      prevX = e.clientX;
      return;
    }

    mesh.rotation.y -= (prevX - e.clientX)/ROTATION_RATE;
    timeline.progress(e.clientY/window.innerHeight);

    prevX = e.clientX;
  }

  function hasWebGL() {
    return (function () {
      try {
        var canvas = document.createElement('canvas');
        return !! window.WebGLRenderingContext
          && (canvas.getContext('webgl')
          || canvas.getContext('experimental-webgl'));
      } catch(e) { return false; }
    })();
  }

  function getRenderer() {
    return hasWebGL() ?
      new THREE.WebGLRenderer({ antialias: true, alpha: true })
        :
      new THREE.CanvasRenderer({ antialias: true, alpha: true });
  }

  function createMesh() {
    return new THREE.Mesh(
      new THREE.IcosahedronGeometry(75,1),
      new THREE.MeshPhongMaterial({
        color      : new THREE.Color(0x3ce8a9),
        emissive   : new THREE.Color(0x1414cb),
        specular   : new THREE.Color(0x01577e),
        shininess  : 10,
        shading    : THREE.FlatShading,
        transparent: 1,
        opacity    : .9,
        overdraw   : true
      })
    );
  }

  function setupTweens() {
    var tweens = [];

    timeline = new TimelineLite();

    for(var i = 0; i < mesh.geometry.vertices.length; i++) {
      tweens.push( new TweenLite.to(mesh.geometry.vertices[i], 1, {
        x: oGeometry.vertices[i].x + (Math.random(0,1) * 2 - 1)*DEFORMATION_STRENGTH,
        y: oGeometry.vertices[i].y + (Math.random(0,1) * 2 - 1)*DEFORMATION_STRENGTH,
        z: oGeometry.vertices[i].z + (Math.random(0,1) * 2 - 1)*DEFORMATION_STRENGTH
      }));
    }

    timeline.insertMultiple(tweens)
    timeline.pause();
  }

  init();
  render();

})();


$('.top1 a.nav-link').click(function(){
  $('.grow-boxes').removeClass('active');
  $(this).addClass('active');
});


$('.grow-boxes').click(function(){
    $('.grow-boxes').removeClass('active');
    $(this).addClass('active');
});

$('.big-dot').click(function(){
    $('.big-dot').removeClass('activedot');
    $(this).addClass('activedot');
});



// Cache selectors
var lastId,
    topMenu = $('#side-nav'),
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

function animateWithRandomNumber(myClass, from, to) {
    TweenLite.fromTo(myClass, Math.floor(Math.random() * 40 + 1), { y: from }, { y: to,
        onComplete: animateWithRandomNumber,
        onCompleteParams: [myClass, from, to],
        ease: Linear.easeNone });
}

var itemsDown = [".light4", ".light5", ".light6", ".light7", ".light8", ".light11", ".light12", ".light13", ".light14", ".light15", ".light16"].forEach(function (e) {
    return animateWithRandomNumber(e, -1080, 1080);
});
var itemsUp = [".light1", ".light2", ".light3", ".light9", ".light10", ".light17"].forEach(function (e) {
    return animateWithRandomNumber(e, 1080, -1080);
});