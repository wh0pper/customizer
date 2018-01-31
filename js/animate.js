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
var topMaterial = new THREE.MeshLambertMaterial();

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

//color to HSV - tween animatio approach
// THREE.Color.prototype.getHSV = function()
// {
//     var rr, gg, bb,
//         h, s,
//         r = this.r,
//         g = this.g,
//         b = this.b,
//         v = Math.max(r, g, b),
//         diff = v - Math.min(r, g, b),
//         diffc = function(c)
//         {
//             return (v - c) / 6 / diff + 1 / 2;
//         };
//
//     if (diff == 0) {
//         h = s = 0;
//     } else {
//         s = diff / v;
//         rr = diffc(r);
//         gg = diffc(g);
//         bb = diffc(b);
//
//         if (r === v) {
//             h = bb - gg;
//         } else if (g === v) {
//             h = (1 / 3) + rr - bb;
//         } else if (b === v) {
//             h = (2 / 3) + gg - rr;
//         }
//         if (h < 0) {
//             h += 1;
//         } else if (h > 1) {
//             h -= 1;
//         }
//     }
//     return {
//         h: h,
//         s: s,
//         v: v
//     };
// };
// //color animation tween
// var current
//
// var colorTween = new TWEEN.Tween(tableTop.material.color.getHSV())
//     .to({h: 217, s: 0, v: 0}, 2000)
//     .easing(TWEEN.Easing.Quartic.In)
//     .onUpdate(
//         function()
//         {
//             tableTop.material.color.setHSV(this.h, this.s, this.v);
//         }
//     )
//     .start();

//hardcode color animation

var originalColor = {h:.1, s:.38, l:.64};//hsv(34°, 33%, 82%)
var destinationColor = {h:0, s:0, l:0};



var steps = 20;
function animateColor(orig, dest) {
  var newColor = {h: orig.h, s: orig.s, l: orig.l};
  var hDiff = dest.h - orig.h;
  var sDiff = dest.s - orig.s;
  var lDiff = dest.l - orig.l;
  var hStep = hDiff/steps;
  var sStep = sDiff/steps;
  var lStep = lDiff/steps;

  function animateLoop() {
    setTimeout(function() {
      console.log(newColor.h, newColor.s, newColor.l)
      tableTop.material.color.setHSL(newColor.h, newColor.s, newColor.l);
      if (newColor.h > dest.h) {
        newColor.h += hStep;
        newColor.s += sStep;
        newColor.l += lStep;
        animateLoop();
      }

    }, 100);
  }
  animateLoop();
}

animateColor(originalColor, destinationColor);

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
