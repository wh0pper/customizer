function Table(type, height, material, extras) {
  this.type = type;
  this.height = height;
  // this.material = material;
  this.extras = extras;
  this.price = 0;
}

Table.prototype.pricer = function() {
  if (this.type === "end") {
    this.price += 100;
  } else if (this.type === "work") {
    this.price += 250;
  } else if (this.type === "coffee") {
    this.price += 300;
  } else if (this.type === "dining") {
    this.price += 500;
  } else {
    this.price = 0;
  }

  if (this)

}

$(document).ready(function() {


});
