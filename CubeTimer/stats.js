function bestOf(arr) {
  if(arr.length == 0){
    return -1;
  }
  let out = 100000000;
  for (var i = 0; i < arr.length; i++) {
    if(arr[i] < out && arr[i] != 0){
      out = arr[i];
    }
  }
  if(out < best){
    isBest = true;
  }
  else{
    isBest = false;
  }
  return out;
}


function avgOf(arr) {
  if(arr.length == 0){
    return -1;
  }
  let sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum+=arr[i]
  }
  return sum/arr.length;
}

function reCalculateStats(){
  best = bestOf(arrMS);
  prevAvg = avg;
  avg = avgOf(arrMS);
  diff = avg - prevAvg;
}
