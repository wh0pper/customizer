//parse table parameters from form input
//parameters order: [type, height, top material, leg material]
var queryString = decodeURIComponent(window.location.search);
var parsedParameters = queryString.split("&");
var parameters = [];
parsedParameters.forEach(function(parameter) {
  var vals = parameter.split("=");
  parameters.push(vals[1]);
})

//move from table properties to animation variables
var tableWidth;
var tableLength;
if (parameters[0] === "end") {
  tableWidth = tableLength = 18;
} else if (parameters[0] === "work") {
  tableWidth = 22;
  tableLength = 40;
} else if (parameters[0] === "coffee") {
  tableWidth = 20;
  tableLength = 48;
} else if (parameters[0] === "dining") {
  tableWidth = 40;
  tableLength = 80;
} else {
  tableWidth = tableLength = 20;
}

var tableHeight;
if (parameters[1] === "small"){
  tableHeight = 16;
} else if (parameters[1] === "medium"){
  tableHeight = 30;
} else if (parameters[1] === "large"){
  tableHeight = 44;
} else {
  tableHeight = 24;
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xfff6e6 );
document.body.appendChild( renderer.domElement );


camera.position.set(0, 0, 60);
camera.lookAt(new THREE.Vector3(0,0,0));



//table top geometry

var topGeometry = new THREE.BoxGeometry( tableLength, 1, tableWidth );
var topMaterial = new THREE.MeshLambertMaterial( { color: 0xd2b48c } );
var tableTop = new THREE.Mesh( topGeometry, topMaterial );
tableTop.position.set( 0, tableHeight/2, 0 )
scene.add( tableTop );

//table legs geom
var legGeometry = new THREE.BoxGeometry( 1, tableHeight, 1);
var legMaterial = new THREE.MeshLambertMaterial( { color: 0xd2b48c } );
var legOne = new THREE.Mesh( legGeometry, legMaterial );
legOne.position.set( (tableLength-1)/2, 0, (tableWidth-1)/2 );
var legTwo = new THREE.Mesh( legGeometry, legMaterial )
legTwo.position.set( -(tableLength-1)/2, 0, (tableWidth-1)/2 );
var legThree = new THREE.Mesh( legGeometry, legMaterial )
legThree.position.set( -(tableLength-1)/2, 0, -(tableWidth-1)/2 );
var legFour = legThree.clone();
legFour.position.set( (tableLength-1)/2, 0, -(tableWidth-1)/2 );
scene.add( legOne, legTwo, legThree, legFour );

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // soft white light
// light.position.set( 40, 40, 40);
scene.add( light );

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

var controls = new THREE.OrbitControls( camera );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );

//animate scene
var animate = function () {
  requestAnimationFrame( animate );

  scene.rotation.y += 0.005;

  renderer.render(scene, camera);
};

animate();
