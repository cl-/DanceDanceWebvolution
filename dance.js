initDanceWorld();
setDanceRoutine();



//==================================================
function setDanceRoutine(){
  var dance = {
    arrows: [],
    speeds: [],
  };

  var iter = 0;
  //When start game
  //Set Interval...
    if (iter<dance.arrows.length){
      iter += 1;
      createMovingArrow(dance.arrows[iter], dance.speeds[iter]);
    }

}



//==================================================
function createMovingArrow(directionString,speed){

}

//==================================================
function drawArrow(directionString){}
function drawArrowBay(directionString, coord){ //the Bay that Moving Arrows will go into

}

//==================================================
function addHandTracker(directionString){
  //directionString can be either the regular direction string, or an object with coordinates
}
function delHandTracker(directionString){}

function createCoord(xx,yy){
  return {x:xx, y:yy};
}


//==================================================
//Utilities