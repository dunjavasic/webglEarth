// $( document ).ready(function() {
//     $('body').show();
//  });

//  RENDERER
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'),antialias: true});
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );

// document.body.appendChild( renderer.domElement );

// var effect = new THREE.AnaglyphEffect( renderer );
// effect.setSize( window.innerWidth, window.innerHeight );

// CAMERA
camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.1, 3000 );

// SCENE
var scene = new THREE.Scene();
camera.position.z = 800;
camera.position.x = 0;
camera.position.y = 220;

// CONTROLS
controls = new THREE.OrbitControls( camera, renderer.domElement );

// LIGHTS


var light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
light.position.set(4000, 4000, 1500);
light.target.position.set (1000, 3800, 1000);

scene.add(light);

// NATURAL LIGHT
var light2 = new THREE.HemisphereLight(0xffffff, 0xffffff, .3);
scene.add(light2);

// MATERIAL
var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x565656,
    transparent: false,
    specular: 0xffffff,
    shininess: 100,
    // map: new THREE.TextureLoader().load('../images/holo.jpg')
    // map: new THREE.TextureLoader().load('https://media.istockphoto.com/photos/blurred-unclear-iridescent-background-of-smooth-holographic-paper-picture-id940741234?k=6&m=940741234&s=612x612&w=0&h=-fi6xbXebGYSfmYkn2a-5bevfp_aePIlvJS3029T5RQ=')
});

var material2 = new THREE.PointsMaterial( { color: 0x333333 } );
var material3 = new THREE.MeshStandardMaterial({
    color: 0x333333,
});

// GEOMETRY
var earthGeo = new THREE.SphereGeometry (70, 40, 400), 
earthMat = new THREE.MeshPhongMaterial(); 
var earthMesh = new THREE.Mesh(earthGeo, earthMat);

scene.add(earthMesh);

    //STARS
    var starGeo = new THREE.SphereGeometry (70, 40, 400),
        starMat = new THREE.MeshBasicMaterial();
    starMat.map = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/star-field.png');
    starMat.side = THREE.BackSide;
                
    var starMesh = new THREE.Mesh(starGeo, starMat);
                
    scene.add(starMesh);

earthMat.map = THREE.ImageUtils.loadTexture('images/earth.jpg');

var geometry1 = new THREE.BoxGeometry( 100, 200, 100 );
var mesh1 = new THREE.Mesh(geometry1, material3);
mesh1.position.z = -500;
mesh1.position.x = -180;
mesh1.position.y = 100;
// scene.add(mesh1);

// CAMERA HELPER
var newCamera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 500, 10000 );
var cameraHelper = new THREE.CameraHelper(newCamera);
// scene.add(cameraHelper);

//  RESIZE
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
    
    
requestAnimationFrame(render);
function render() {
    // ANIMATE MESH
    earthMesh.rotation.y += 0.006;
    
    var time = Date.now() * 0.0005;


    // CONTROLS
    controls.enableZoom = false;
    controls.update();
    controls.minPolarAngle = Math.PI/2;
    controls.maxPolarAngle = Math.PI/2;
    camera.lookAt( earthMesh.position );

    renderer.render( scene, camera );
    requestAnimationFrame(render);
}


// CURSOR ANIMATION
var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;

var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.010, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 7;
    posY += (mouseY - posY) / 7;
    
    TweenMax.set(follower, {
        css: {    
        left: posX - 12,
        top: posY - 12
        }
    });
    
    TweenMax.set(cursor, {
        css: {    
        left: mouseX,
        top: mouseY
        }
    });
  }
});
