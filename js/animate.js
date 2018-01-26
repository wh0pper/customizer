var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


camera.position.set(0, 0, 100);

// cube geometry
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//table top geometry

var topGeometry = new THREE.BoxGeometry( 20, 2, 10 );
var topMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var tableTop = new THREE.Mesh( topGeometry, topMaterial );
scene.add( tableTop );

//table legs geom

// //line geometry and material
// var lineMat = new THREE.LineBasicMaterial({ color: 0x0000ff });
//
// var lineGeo = new THREE.Geometry();
// lineGeo.vertices.push(new THREE.Vector3(-10, 0, 0));
// lineGeo.vertices.push(new THREE.Vector3(0, 10, 0));
// // lineGeo.vertices.push(new THREE.Vector3(10, 0, 0));
//
// //combine geo and mat into line object
// var line = new THREE.Line(lineGeo, lineMat);
// scene.add(line);





renderer.render(scene, camera);

//animate scene
var animate = function () {
  requestAnimationFrame( animate );

  scene.rotation.y += 0.01;
  scene.rotation.x += 0.01;
  // tableTop.rotation.z += 0.01;

  renderer.render(scene, camera);
};

animate();
