initDanceWorld();
setDanceRoutine();

//==================================================
function initDanceWorld(){
  //Create and Set All Canvases
  var worldBkgdCanvas = document.getElementById("worldBkgdCanvas");
  var whiteMaskCanvas = document.getElementById("whiteMaskCanvas");

  var arrowBayCanvas = document.getElementById("arrowBayCanvas");
  var tempArrowBayCanvas = document.getElementById("tempArrowBayCanvas");
  
  var movingArrowCanvas = document.getElementById("movingArrowCanvas");

  setSizeDanceWorld();

  // clickCanvas.width = 100; clickCanvas.height = 100;
  // glowingCanvas.width = 100; glowingCanvas.height = 100;
  // scoreCanvas.width = 100; scoreCanvas.height = 100;

  $(window).resize(function() {
    setSizeDanceWorld(); ///worldBkgdCanvas.width = window.innerWidth; worldBkgdCanvas.height = window.innerHeight;
    if(window.showResults_on){
      // worldBkgdCanvas.getContext("2d").fillStyle = "rgba(0,0,0,0.7)";
      // worldBkgdCanvas.getContext("2d").fillRect(0,0,worldBkgdCanvas.width,worldBkgdCanvas.height);
    }
  });

  //Now create the permanent circles for clickCanvas and glowingCanvas.
  //For scoreCanvas, it is not permanent as it will be overwritten.
  //Hence create new empty copy of 3 hollow circles only when you start the screen saver.
  var canvasCenter_coord = calcCanvasCenter(clickCanvas);
  createCircle( clickCanvas, canvasCenter_coord, {r:0,g:0,b:0,a:-0.2},{a:-0.5} );
  createCircle( glowingCanvas, canvasCenter_coord, {r:0,g:0,b:0,a:-0.2},{a:-0.7} );
}//endof initLockscreen()

function setSizeDanceWorld(){
  worldBkgdCanvas.width = window.innerWidth; worldBkgdCanvas.height = window.innerHeight;
  whiteMaskCanvas.width = window.innerWidth; whiteMaskCanvas.height = window.innerHeight;
  arrowBayCanvas.width = window.innerWidth; arrowBayCanvas.height = window.innerHeight;
  tempArrowBayCanvas.width = window.innerWidth; tempArrowBayCanvas.height = window.innerHeight;
  movingArrowCanvas.width = window.innerWidth; movingArrowCanvas.height = window.innerHeight;
}


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