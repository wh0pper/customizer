//parse parameters using local storagerr
//parameters order: [type, height, top material, leg material, leg color]
if (localStorage.type) {
  var tableType = localStorage.type;
  var tableHeightInput = localStorage.height;
  var tableMaterials = localStorage.material.split(",");
} else {
  //default table if no inputs
  var tableType = 'end';
  var tableHeightInput = 'small';
  var tableMaterials = ['oak','metal','#090f0f'];
}

localStorage.clear();


//move from table properties to animation variables
var tableWidth;
var tableLength;
if (tableType === "end") {
  tableWidth = tableLength = 22;
} else if (tableType === "work") {
  tableWidth = 28;
  tableLength = 44;
} else if (tableType === "coffee") {
  tableWidth = 26;
  tableLength = 48;
} else if (tableType === "dining") {
  tableWidth = 48;
  tableLength = 80;
} else {
  tableWidth = tableLength = 20;
}

var tableHeight;
if (tableHeightInput === "small"){
  tableHeight = 16;
} else if (tableHeightInput === "medium"){
  tableHeight = 30;
} else if (tableHeightInput === "large"){
  tableHeight = 40;
} else {
  tableHeight = 24;
}

//defaults
var legThickness; //thick for wood, thin for metal
var legColor;
if (tableMaterials[1] === "wood") {
  legThickness = 2;
  legColor = 0xd2b48c;
} else if (tableMaterials[1] === "metal") {
  legThickness = 1;
  legColor = 0x000000;
} else { //Materials[1]===painted
  legThickness = 1;
  legColor = Number(tableMaterials[2].replace(/#/, "0x"));
}
// tableMaterials[2].replace(/#/,"0x")

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
