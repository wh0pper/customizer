//parse table parameters from form input
//parameters order: [type, height, top material, leg material, leg color]
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
  tableWidth = tableLength = 22;
} else if (parameters[0] === "work") {
  tableWidth = 28;
  tableLength = 44;
} else if (parameters[0] === "coffee") {
  tableWidth = 26;
  tableLength = 48;
} else if (parameters[0] === "dining") {
  tableWidth = 48;
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
  tableHeight = 40;
} else {
  tableHeight = 24;
}

var legThickness = 1; //thick for wood, thin for metal
var legColor = parameters[4]; //wood (same) or metal (black)
if (parameters[3] === "wood") {
  legThickness = 2;
  legColor = 0xd2b48c;
} else {
  legThikness = 1;
  legColor = 0x000000;
}


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xfff6e6 );
document.body.appendChild( renderer.domElement );


camera.position.set(0, 0, 120);
camera.lookAt(new THREE.Vector3(0,0,0));



//table top geometry

var topGeometry = new THREE.BoxGeometry( tableLength, 4, tableWidth );
var topMaterial = new THREE.MeshLambertMaterial( { color: 0xd2b48c } );
var tableTop = new THREE.Mesh( topGeometry, topMaterial );
tableTop.position.set( 0, (tableHeight+4)/2, 0 )
scene.add( tableTop );

//table legs geom
var legGeometry = new THREE.BoxGeometry( legThickness, tableHeight, legThickness );
var legMaterial = new THREE.MeshLambertMaterial( { color: legColor } );
var legOne = new THREE.Mesh( legGeometry, legMaterial );
legOne.position.set( (tableLength-legThickness)/2, 0, (tableWidth-legThickness)/2 );
var legTwo = new THREE.Mesh( legGeometry, legMaterial )
legTwo.position.set( -(tableLength-legThickness)/2, 0, (tableWidth-legThickness)/2 );
var legThree = new THREE.Mesh( legGeometry, legMaterial )
legThree.position.set( -(tableLength-legThickness)/2, 0, -(tableWidth-legThickness)/2 );
var legFour = legThree.clone();
legFour.position.set( (tableLength-legThickness)/2, 0, -(tableWidth-legThickness)/2 );
scene.add( legOne, legTwo, legThree, legFour );

//lightsource
var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // soft white light
scene.add( light );

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
