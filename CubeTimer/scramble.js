let moves = ["U", "D", "F", "B", "R", "L"];
let dirs = ["", "'", "2"];
let scrambleArr = [];
let scrambleLen = 10;
let scramble = "";

function genRandomScramble(){
  let out = "";
  for (var i = 0; i < scrambleLen; i++) {
    do {
      move = chooseFrom(moves);
      dir = chooseFrom(dirs);
      scrambleArr[i] = [move, dir]
    } while (!valid(i));
  }
  for (var i = 0; i < scrambleArr.length; i++) {
    out += scrambleArr[i][0] + scrambleArr[i][1] + " ";
  }
  return out;
}

function valid(index){
  if (index == 0){
   return true;
  }
  if(index >= 1 && (scrambleArr[index-1][0] == scrambleArr[index][0]) ){
    return false;
  }
  // TODO: finish validation
  return true ;
}
