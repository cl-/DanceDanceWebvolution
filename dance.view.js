//==================================================
// window.addEventListener("DOMContentLoaded", function() {
// });
// $( document ).ready(function() {
//   // Handler for .ready() called.
// });
    function lolo(modeSnapshot){
      window.xxx = modeSnapshot;
    }

window.onload = function () {
  var canvases = initDanceWorld();
  ///var video = document.querySelector('video');
  var video = canvases[0];
  // video.src = "";
  // var snapshotCanvas = document.getElementById("snapshotCanvas");
  // var snapshotCtx = snapshotCanvas.getContext("2d");
  console.log(video);
  setup_video(video);
  // var ww=0;
  // while((typeof video.src=='undefined') || (video.src=="")){
  //   ww++;
  //   if(ww%10000000==0){
  //    console.log(video.src=='');}
  // } //doNothing
  video.oncanplay = function(){
    console.log("Video has been allowed.");
    window.xxx = drawWorldBkgd(canvases[1], video, canvases[6]);
    window.xxx.onchange = function(){alert("THE VALUE IS DONE");};
  };
  console.log("here");
};


//==================================================
function initDanceWorld(){
  //Create and Set All Canvases
  var video = document.getElementsByTagName("video")[0];

  var worldBkgdCanvas = document.getElementById("worldBkgdCanvas");
  var liveWorldCanvas = document.getElementById("liveWorldCanvas");
  var whiteMaskCanvas = document.getElementById("whiteMaskCanvas");

  var arrowBayCanvas = document.getElementById("arrowBayCanvas");
  var tempArrowBayCanvas = document.getElementById("tempArrowBayCanvas");
  
  var movingArrowCanvas = document.getElementById("movingArrowCanvas");
  var snapshotCanvas = document.getElementById("snapshotCanvas");

  var allCanvases = [video, worldBkgdCanvas, liveWorldCanvas, whiteMaskCanvas, arrowBayCanvas, tempArrowBayCanvas, movingArrowCanvas, snapshotCanvas];
  setSizeDanceWorld(allCanvases);

  // clickCanvas.width = 100; clickCanvas.height = 100;
  // glowingCanvas.width = 100; glowingCanvas.height = 100;
  // scoreCanvas.width = 100; scoreCanvas.height = 100;

  $(window).resize(function() {
    setSizeDanceWorld(allCanvases); ///worldBkgdCanvas.width = window.innerWidth; worldBkgdCanvas.height = window.innerHeight;
    if(window.showResults_on){
      // worldBkgdCanvas.getContext("2d").fillStyle = "rgba(0,0,0,0.7)";
      // worldBkgdCanvas.getContext("2d").fillRect(0,0,worldBkgdCanvas.width,worldBkgdCanvas.height);
    }
  });

  //Now create the permanent circles for clickCanvas and glowingCanvas.
  //For scoreCanvas, it is not permanent as it will be overwritten.
  //Hence create new empty copy of 3 hollow circles only when you start the screen saver.
  // // var canvasCenter_coord = calcCanvasCenter(clickCanvas);
  // // createCircle( clickCanvas, canvasCenter_coord, {r:0,g:0,b:0,a:-0.2},{a:-0.5} );
  // // createCircle( glowingCanvas, canvasCenter_coord, {r:0,g:0,b:0,a:-0.2},{a:-0.7} );
  return allCanvases;
}//endof initLockscreen()

function setSizeDanceWorld(objects){
  // video.width = window.innerWidth;           video.height = window.innerHeight;
  for (var ee=0; ee<objects.length; ee++){
    console.log("===================");
    if(ee==0){console.log(objects[0])}
    objects[ee].width = window.innerWidth; objects[ee].height = window.innerHeight;
    if(ee==0){console.log(objects[0])}
  }
  // worldBkgdCanvas.width = window.innerWidth; worldBkgdCanvas.height = window.innerHeight;
  // liveWorldCanvas.width = window.innerWidth; liveWorldCanvas.height = window.innerHeight;
  // whiteMaskCanvas.width = window.innerWidth; whiteMaskCanvas.height = window.innerHeight;
  // arrowBayCanvas.width = window.innerWidth; arrowBayCanvas.height = window.innerHeight;
  // tempArrowBayCanvas.width = window.innerWidth; tempArrowBayCanvas.height = window.innerHeight;
  // movingArrowCanvas.width = window.innerWidth; movingArrowCanvas.height = window.innerHeight;
  // snapshotCanvas.width = window.innerWidth; snapshotCanvas.height = window.innerHeight;
}

function drawWorldBkgd(bkgdCanvas, video, snapshotCanvas){
  if (typeof window.worldSnapshots=="undefined")
    window.worldSnapshots = [];
  if (typeof window.worldFinal=="undefined")
    window.worldFinal = {};
  var lastSnapshotTime = "";

  numSnaps = 10; timeoutInterval = 500;
  for(var tt=0; tt<numSnaps; tt++){
    setTimeout(function(){
      window.worldSnapshots.push(  getWorldSnapshot_ImageData(snapshotCanvas, video)  );
    }, timeoutInterval*tt);
  }
  var modeSnapshot_ImageData = {};
  setTimeout(function(){
    modeSnapshot_ImageData = createModeImage(window.worldSnapshots);
    bkgdCtx = bkgdCanvas.getContext("2d");
    ///http://stackoverflow.com/questions/3448347/how-to-scale-an-imagedata-in-html-canvas
    bkgdCtx.putImageData(modeSnapshot_ImageData, 0, 0);
    lolo(modeSnapshot_ImageData);
    console.log("it's done...");
  }, timeoutInterval*numSnaps);
  return modeSnapshot_ImageData;
}


//=========================
function setup_video(videoReference){
  ///BETTER TUTORIAL: http://davidwalsh.name/browser-camera
  ///http://www.html5rocks.com/en/tutorials/getusermedia/intro/
  var getUserMedia_option = {video: true};
  function getUserMedia_errBack(e) { videoReference.src = 'fallbackvideo.webm'; console.log("No permission to use Camera...");} //errBack, fallBack
  function getUserMedia_success(stream) { videoReference.src = window.URL.createObjectURL(stream); videoReference.play(); }

  if(navigator.getUserMedia)// Standard
    navigator.getUserMedia(getUserMedia_option, getUserMedia_success, getUserMedia_errBack);
  else if(navigator.webkitGetUserMedia)// WebKit-prefixed //Chrome
    navigator.webkitGetUserMedia(getUserMedia_option, getUserMedia_success, getUserMedia_errBack);
  else if(navigator.mozGetUserMedia)// Firefox-prefixed
    navigator.mozGetUserMedia(getUserMedia_option, getUserMedia_success, getUserMedia_errBack);
}

function getWorldSnapshot_ImageData(snapshotCanvas, video){
  //Draw the video image onto the canvas, so as to extract the image data.
  // var img=document.getElementById("scream");
  // snapshotCanvasCtx.drawImage(img,10,10);
  snapshotCtx = snapshotCanvas.getContext("2d");
  snapshotCtx.drawImage(video, 0, 0, snapshotCanvas.width, snapshotCanvas.height); ///(video, 0, 0, 640, 480);

  var imgData = snapshotCtx.getImageData(0,0,snapshotCanvas.width,snapshotCanvas.height);
  return imgData;
}//endof getWorldSnapshot_ImageData

//=========================
function createModeImage(imageDatas, strictness){
  ///looping image data of Canvas: http://stackoverflow.com/questions/17714742/looping-through-pixels-in-an-image#answer-17717174
  ///https://www.google.com.sg/search?q=javascript+iterate+through+pixels+of+jpg
  ///WRONG.. for Jpg: http://codeinthebrowser.org/image-loop.html
  if (typeof strictness=='undefined')
    strictness=0.5; //50%
  var pixelDict = [];
  var modeImage = [];
  var modeImageData = [];
  console.log(imageDatas[0]);

  for(var ii=0; ii<(imageDatas[0].data.length/4);ii++){
    //each pixel is represented by 4 sequential elements (red,green,blue,alpha) inside each imageData eg imageDatas[0]
    pixelDict[ii] = {};
  }
  console.log("pixelDict length"+pixelDict.length);

  //var pp=0; //pixel counter //DONT PUT HERE!!
  for(var ii=0; ii<imageDatas.length; ii++){
    var currData = imageDatas[ii].data; console.log("ii"+ii);
    var pp=0; //pixel counter //PUT HERE
    for(var jj=0; jj<currData.length;jj+=4){
      //each pixel is represented by 4 sequential elements: red,green,blue,alpha
      var red=currData[jj], green=currData[jj+1], blue=currData[jj+2], alpha=currData[jj+3];
      var key = JSON.stringify([red,green,blue,alpha]);
      if(jj%262144==0){ //262144==4^9
        console.log(key);
        var length=0;
        for(var keyIter in pixelDict[pp]){
          length++;
        }
        console.log("pp"+pp+" length"+length);
        console.log("undefined::"+(typeof pixelDict[pp][key] == "undefined"));
      }
      if (typeof pixelDict[pp]=='undefined'){
        console.log("ZZZ undef");
        console.log(pp);
      }
      if (typeof pixelDict[pp][key] == "undefined")
        pixelDict[pp][key] = 1;
      else
        pixelDict[pp][key] += 1;
      pp+=1;
    }//iterated thru all data
  }
  console.log("pixels: "+(pp==pixelDict.length)+"\n"+"pp"+pp);

  ///http://stackoverflow.com/questions/16686627/sorting-javascript-object-arrays-based-on-arbitrary-lenght-of-properties
  ///http://blog.bogojoker.com/2008/06/javascript-sort-an-array-of-objects/
  //STOPGAP: SKIP SORTING FOR NOW. Just find Maximum Count.
  for(var qq=0; qq<pixelDict.length; qq++){
    modeImage[qq] = "";
    currMaxCount = 0;
    for(var key in pixelDict[qq]){
      if(pixelDict[qq][key]>currMaxCount){
        modeImage[qq] = key;
        currMaxCount=pixelDict[qq][key];
      }
    }
    //after iterating over all samples of this particular pixel, we have the best pixel.
    var parseToData = JSON.parse(modeImage[qq]);
    for(var colorIdx=0; colorIdx<4; colorIdx++){
      ///DONT modeImageData.push(parseToData[colorIdx]);
//      imageDatas[0].data[qq+colorIdx] = parseToData[colorIdx]; 
    }
  }//finished going through all pixels
  ///JSON.parse(JSON.stringify(imageDatas[0]));
  console.log("finaldata");
  console.log(imageDatas[0]);
  return imageDatas[0]; //return modeImageData;
}//endof createModeImage




