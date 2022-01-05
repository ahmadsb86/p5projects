function keyPressed() {
  if(typing && keyCode == BACKSPACE && key != ' '){
    comment = comment.substring(0,comment.length-1);
  }
  else if(typing == false && keyCode == BACKSPACE && state == 3){
    arrS.shift();
    arrMS.shift();
    comments.shift();

    let diff = -1;
    reCalculateStats();

  }
  if(keyCode === ENTER && typing == true){
    typing = false;

    let splitted = comment.substring(0,18)
    if(comment == splitted){
      comments[0] = comment;
    }
    else{
      comments[0] = splitted + " ...";
    }
    comment = "";
  }
  if (key == ' ' && (state == 1)) {
    holdingSpace = true;
    spaceHitFrame = frameCount;
  }
}


function keyReleased(){
  if (key == ' ' && state == 1 && holdingSpace == true) {
    holdingSpace = false;
    if(frameCount > spaceHitFrame + holdFrames){
      cubingStartMilliSecond  = millis();
      inspectionTimer = 15;
      state = 2;
    }
  }
}

function keyTyped() {
  if(typing && key != ENTER){
    comment += key;
  }
  else {
    if(state == 0 && key != ' '){
      inspectionStartFrame = frameCount;
      state = 1;
    }
    if(state == 3 && key != ' ' && keyCode != ENTER){
      typing = true;
      comment += key;
    }
    if(key == ' '){
      switch (state) {
        case 0:
          inspectionStartFrame = frameCount;
          state = 1;
          break;

        case 2:

          comments.unshift("");
          arrS.unshift(seconds);
          arrMS.unshift(ms);


          reCalculateStats();

          scramble = genRandomScramble();
          state = 3;
          break;
        case 3:
          ms = 0;
          seconds = 0;
          inspectionStartFrame = frameCount;
          inspectionTimer = inspectionTimerMax;
          state = 1;
          break;
        case 4:
          ms = 0;
          seconds = 0;
          inspectionStartFrame = frameCount;
          inspectionTimer = inspectionTimerMax;
          state = 1;
          break;
        default:

      }
    }
  }
}
