function Table(type, height, material[], extras) {
  this.type = type;
  this.height = height;
  this.topMaterial = material[1];
  this.legMaterial = material[2];
  this.extras = extras; //array of addOns
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
    this.price +=0;
  }

  if (this.height === "small") {
    this.price += 75;
  } else if (this.height === "medium") {
    this.price += 100;
  } else if (this.height === "large") {
    this.price += 125;
  } else {
    this.price += 0;
  }

  this.extras.forEach(function(each) {
    this.price += 15;
  })
}

$(document).ready(function() {
  $("#inputForm").submit

});
