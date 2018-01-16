var model = [];

var schools = [];

var int = [];

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
  for(i = 0; i < 100; i++) {
    int.push(i);
  }
}

function selectSchools() {
  schoolList();
  for(i = 0; i <6; i++) {
    var tempArray = shuffle(int);
    var temp = int.pop()
    schools.push(temp);

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


generateModel();

selectSchools();
console.log(schools);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random - used for generating random integer
