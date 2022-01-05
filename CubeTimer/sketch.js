let state = 0;

let white; let green; let red; let darkRed; let grey; let alphaWhite; let alphaWhiteX; let bg;

let inspectionTimer = 30;
let inspectionTimerMax = 30;
let inspectionStartFrame = 0;
let cubingStartMilliSecond = 0;



let comment = "";
let typing = false;

let holdFrames = 30;
let holdingSpace = false;
let spaceHitFrame = 0;

let fade = 20;
let ms = 0;
let seconds = 0;
let arrS = [];
let arrMS = [];
let comments = [];
let best = -1;
let isBest = false;
let avg = -1;
let diff = 0;


let TextSize = 60;
let font;

function preload() {
  font = loadFont('assets/font.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight-4);


  //color scheme

  white = color(255);
  red = color(255, 94, 94);
  darkRed = color(199,0,0);
  green = color(61, 242, 128);
  alphaWhite = color(255,230);
  alphaWhiteX = color(255,130);
  grey = color(170);
  bg = color(60);


  //Text styling
  textAlign(CENTER, CENTER);
  noStroke();
}



function draw() {
  background(60);


  switch (state) {
    case 0:
      //hello
      fill(white);
      textFont(font);
      textSize(TextSize);
      text("Hello.", width/2, height/2);
      textSize(TextSize/3);
      text("Press any key to start.", width/2, height/2 + TextSize);
      break;
    case 1:
      //inspection
      if(inspectionTimer > 0){
        textFont("monospace");
        textSize(TextSize);
        fill(white);
        if(holdingSpace){
          fill(red);
          if(frameCount > spaceHitFrame + holdFrames){
            fill(green);
          }
        }
        text(inspectionTimer, width/2, height/2);
        if(frameCount % 60 == inspectionStartFrame % 60){
          inspectionTimer --;
        }
      }
      else{
        state = 4;
        arrS.unshift(0);
        arrMS.unshift(0);
        comments.unshift("");
      }
      break;

    case 2:
      //solving
      ms = round(millis() - cubingStartMilliSecond);
      seconds = floor(ms/1000);
      break;
    case 3:
      //comment
      textFont(font);
      fill(alphaWhite);
      textSize(TextSize/3);
      text(comment, width/2, (height/2) + TextSize*3);

      //best
      textFont(font);
      fill(alphaWhiteX);
      textSize(TextSize/2);
      if(best > -1){
        if(isBest){
          fill(green);
        }
        text("Best: " + floor(best/1000) + ":" + nf(best%1000,3,0), width/2, (height/2) + TextSize);
      }
      else{
        text("Best: -", width/2, (height/2) + TextSize);
      }

      //avg
      textFont(font);
      fill(alphaWhiteX);
      textSize(TextSize/2);
      if(avg > -1){
        if(diff > 0 && arrMS.length != 1){
          fill(red);
          text("Avg: " + floor(avg/1000) + ":" + nf(avg%1000,3,0) + " (+" + round(diff/1000, 3) + ")", width/2, (height/2) + TextSize*2 );
        }
        else{
          fill(green);
          text("Avg: " + floor(avg/1000) + ":" + nf(avg%1000,3,0) + " (" + round(diff/1000, 3) + ")", width/2, (height/2) + TextSize*2 );
        }

      }
      else{
        text("Avg: -", width/2, (height/2) + TextSize*2);
      }

      //prev solves
      for(let i = 0; i < arrS.length ;  i++){
        textFont(font);
        fill(255, 255 - (i*fade));
        textSize(TextSize/2);
        if(arrS[i] == -1){
          fill(darkRed)
          text("DNF", width * 0.7, (i*TextSize) +  TextSize*3);
        }
        else{
          text(arrS[i] + " : " + nf(arrMS[i]%1000,3,0), width * 0.7, (i*TextSize) +  TextSize*3);
        }
      }

      //comments
      for(let i = 0; i < comments.length ;  i++){
        textFont(font);
        fill(170, 255 - (i*fade));
        textSize(TextSize/2);
        text(comments[i], (width * 0.83), (i*TextSize) +  TextSize*3);
      }

      //scramble
      textFont(font);
      fill(grey);
      textSize(TextSize/2);
      text("Next Scramble: ", width*0.25, height/2 );
      text(scramble, width*0.25, height/2 + TextSize);


      break;
    case 4:
      fill(darkRed);
      text("DNF", width/2, height/2);
      break;
    default:

  }

  if(state == 2 || state == 3){
    //time
    fill(white);
    textFont("monospace");
    textSize(TextSize);
    text(seconds + ":" + nf(ms%1000,3,0), width/2, height/2);

  }
}
