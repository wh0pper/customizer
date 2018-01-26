function Table(type, height, material, extras) {
  this.type = type;
  this.height = height;
  this.material = material; //array of top and leg materials
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

  if (this.material[0] === "beech") {
    this.price += 30;
  } else if (this.material[0] === "oak") {
    this.price += 50;
  } else if (this.material[0] === "maple") {
    this.price += 60;
  } else if (this.material[0] === "walnut") {
    this.price += 70;
  } else {
    this.price += 0;
  }

  var self=this;
  this.extras.forEach(function() {
    self.price += 15;
  })
}

$(document).ready(function() {
  $("#inputForm").submit(function(event) {
    event.preventDefault();
    var inputType = $("select#type").val();
    var inputHeight = $("select#height").val();
    var inputMaterialArray = [$("input:radio[name=topMaterial]:checked").val(), $("input:radio[name=legMaterial]:checked").val()];
    var inputExtrasArray = [];
    $('input[type="checkbox"]').each(function() {
      inputExtrasArray.push($(this).val());
    });

    table = new Table(inputType, inputHeight, inputMaterialArray, inputExtrasArray);
    table.pricer();


  });

});
