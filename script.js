var model = [];
var schools = [];
var distanceTied = [];
var populations = [];
var schoolIndex = [[],[],[],[],[],[]];

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
        population:getRandomInt(1,7),
        assignedTo:"N/A"
      });
    }
  }
}


var onesInt = [];
var tensInt = [];

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
      //console.log(".row-" + model[i].xcoordinate + "-column-" + model[i].ycoordinate + "");
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

function calculateDistance() {

  for(i = 0; i < model.length; i++) {
    var temp = [];
    var tempInt = 0;
    if(model[i].isSchool == false) {
      for(j = 0; j <schools.length;j++) {
        tempInt = Math.pow((Math.pow(model[i].xcoordinate - model[schools[j]].xcoordinate,2) + Math.pow(model[i].ycoordinate - model[schools[j]].ycoordinate,2)),.5);
        temp.push(tempInt);
      }
    }
        else {
        temp = null;
    }
    model[i].distances = temp;
  }
}

function resolveTies() {
  for( i = 0; i < distanceTied.length; i ++) {
    var temp = model[distanceTied[i]].distances;
    //console.log(temp);
    var index1 = "N/A";
    var index2 = "N/A";
    var min = Math.min.apply(null,temp);
    for(j = 0; j < temp.length; j++) {
      if(temp[j] == min) {
        if(index1 === "N/A") {
          index1 = j;
        }
        else if(index1 != "N/A" && index2 === "N/A") {
          index2 = j;
        }
      }
    }
    if(populations[index1] > populations[index2]) {
      model[distanceTied[i]].assignedTo = index2;
    }
    else if(populations[index1] < populations[index2]) {
      model[distanceTied[i]].assignedTo = index1;
    }
  }
  setColors();
}


function assignPopToSchool() {
  for(i = 0; i< model.length; i++) {
    var checksum = true;
    var temp = 100;
    var tempIndex = 0;
    var tie = [];
    if(model[i].isSchool == false) {
    //  console.log("calculation");
      for(j = 0; j < model[i].distances.length; j++) {
        if(temp > model[i].distances[j]) {
          temp = model[i].distances[j];
          tempIndex = j;
        }
        else if(temp == model[i].distances[j]) {
          tie.push(temp);
        }
      }
    }
    if(tie.length != 0) {
      for(k = 0; k < tie.length; k++) {
        if(tie[k] <= temp) {
          distanceTied.push(i);
          checksum = false;
        }
      }
    }
    if(checksum == true) {
      model[i].assignedTo = tempIndex;
    }
  }



}

function standardDeviation(array) {
  var sum = 0;
  var temp = 0;
  for(i = 0; i <array.length; i++) {
    sum+= array[i];
  }
  var mean = sum/array.length;
  for( i = 0; i < array.length; i++) {
    temp += Math.pow(array[i]-mean,2);
  }
  var variance = temp/array.length;
  var std = Math.pow(variance,0.5);
  return std;
}

function census() {
  var schoolPop = [0,0,0,0,0,0];
  var schoolIndexUpdate = [[],[],[],[],[],[]];
  for( i = 0 ; i < model.length;i++){
    if(model[i].isSchool === false && model[i].assignedTo !== "N/A") {
      schoolPop[model[i].assignedTo]  += model[i].population;
      schoolIndexUpdate[model[i].assignedTo].push(i);
    }
  }
  console.log(schoolPop);
  populations = schoolPop;
  schoolIndex = schoolIndexUpdate;
}

function setColors(){
  var colors = []
  for ( i = 0; i < schools.length; i++) {
    colors[i] = [getRandomInt(1,256),getRandomInt(1,256),getRandomInt(1,256)];
  }
  for( i = 0; i < model.length; i++ ) {
    if(model[i].isSchool === false) {
      if(model[i].assignedTo !== "N/A") {
      $(".row-" + model[i].xcoordinate + "-column-" + model[i].ycoordinate + "").attr("style","background-color:rgb(" + colors[model[i].assignedTo][0] +"," + colors[model[i].assignedTo][1] + "," +colors[model[i].assignedTo][2] +")");
      }
    }
  }
  for( i = 0; i < schools.length; i++) {
      $(".row-" + model[schools[i]].xcoordinate + "-column-" + model[schools[i]].ycoordinate + "").attr("style","background-color:rgb(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2]+");color:rgb(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] +")");
  }
}

function distanceBetween(x,y) {
  var distance = Math.pow(Math.pow(model[x].xcoordinate - model[y].xcoordinate,2)+Math.pow(model[x].ycoordinate - model[y].ycoordinate,2),0.5);
  return distance;
}

function calculateProximityforMinimum() {
  var index;
  var schoolDistance = [[],[]];
  var filteredSchoolDistance;
  var closestSchoolIndex = [100,0];
  var secondClosestSchoolIndex = [100,0];
  for(i = 0; i<populations.length; i++) {
    if (populations[i] == Math.min.apply(null,populations)) {
      index = i;
    }
  }

  for(i = 0; i < schools.length; i++) {
    if( i != index){
      schoolDistance[0].push(distanceBetween(schools[i],schools[index]));
      schoolDistance[1].push(i);
    }
  }
  for(i = 0; i < schoolDistance[0].length; i++) {
      if(schoolDistance[0][i] <= closestSchoolIndex[0]) {
        secondClosestSchoolIndex[0] = closestSchoolIndex[0];
        secondClosestSchoolIndex[1] = closestSchoolIndex[1];
        closestSchoolIndex[0] = schoolDistance[0][i];
        closestSchoolIndex[1] = schoolDistance[1][i];
    }
  }
  return [index,closestSchoolIndex[1],secondClosestSchoolIndex[1]];
}


function adjustforArea([minimum,first,second]) {
  var minimumIndex = schools[minimum];
  var comparison;
  var compArray = [];
  var distanceArray = [];
  var adjustment;
  if(populations[first] < populations[second]) {
    comparison = second;
  }
  else {
    comparison = first;
  }
  compArray = schoolIndex[comparison];
  //console.log(compArray + " compArray");
  for(i = 0; i < compArray.length; i++) {
    var temp = distanceBetween(schools[minimum],compArray[i]);
  //  console.log ("temp " + temp );
    distanceArray.push(temp);
}
  //console.log(distanceArray);
  adjustment = distanceArray.indexOf(Math.min.apply(null,distanceArray));
  //console.log(adjustment + " adjustment");
  model[compArray[adjustment]].assignedTo = minimum;

}

function optimize() {
  while(standardDeviation(populations) > 15) {
  console.log(standardDeviation(populations) + " -1");
  adjustforArea(calculateProximityforMinimum());
  census();
  setColors();
  console.log(standardDeviation(populations) + " -2")
  }
}

$(document).ready(function(){
  generateVisualModel()
  generateModel();
  selectSchools();
  calculateDistance();
  assignPopToSchool();
  setColors();
  census();
  resolveTies();
  census();
  calculateProximityforMinimum();
  optimize();

});
