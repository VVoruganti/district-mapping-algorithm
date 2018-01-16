var model = [];

var schools = [];

var onesInt = [];
var tensInt = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateModel() {

for( i = 0; i < 10; i++) {
  for(j = 0; j < 10; j ++){

    model.push( {
      isSchool:false,
      xcoordinate:j,
      ycoordinate:i,
      population:getRandomInt(1,7)
    });
  }
}

}

function schoolList() {
  for(i = 0; i < 10; i++) {
    onesInt.push(i);
    tensInt.push(i);
  }
}

function selectSchools() {
  schoolList();
  for(i = 0; i <6; i++) {
    var tempOnesArray = shuffle(onesInt);
    var tempTensArray = shuffle(tensInt);
    var tempOnes = onesInt.pop();
    var tempTens = tensInt.pop();
    schools.push(tempTens * 10 + tempOnes);
  }
  for( i = 0; i < schools.length; i++) {
    model[schools[i]].isSchool = true;
    $(".row-" +model[schools[i]].xcoordinate + "-column-" + model[schools[i]].ycoordinate ).attr("style","background-color:black");
  }
  for( i =0; i < model.length;i++) {
      $(".row-" + model[i].xcoordinate + "-column-" + model[i].ycoordinate + "").append("<p>"+model[i].population+"</p>");
      console.log(".row-" + model[i].xcoordinate + "-column-" + model[i].ycoordinate + "");
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
  return a;
}

function generateVisualModel() {
  for(i = 0; i < 10; i++) {
    $("#model").append(
      "<div id='row-" + i +"'><div class='row-" + i + "-column-0'></div><div class='row-" + i + "-column-1'></div><div class='row-" + i + "-column-2'></div><div class='row-" + i + "-column-3'></div><div class='row-" + i + "-column-4'></div><div class='row-" + i + "-column-5'></div><div class='row-" + i + "-column-6'></div><div class='row-" + i + "-column-7'></div><div class='row-" + i + "-column-8'></div><div class='row-" + i + "-column-9'></div></div>")
  }
}



// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm

function spreadSchools() {
  for(i=0; i < schools.length; i++) {
    for(j = 0; j <schools.length - 1; j ++ ) {

    }
  }
}


console.log(schools);

$(document).ready(function(){
  generateVisualModel()
  generateModel();
  selectSchools();
});

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - used for generating random integer
