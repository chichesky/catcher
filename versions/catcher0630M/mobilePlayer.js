const main = document.getElementsByTagName("main")[0];
let firstTouch = [];
let endTouch = [];
main.addEventListener("touchstart", function(e) {
  firstTouch[0] = e.changedTouches[0].pageX;
  firstTouch[1] = e.changedTouches[0].pageY;
})

main.addEventListener("touchend", function(e) {
  endTouch[0] = e.changedTouches[0].pageX;
  endTouch[1] = e.changedTouches[0].pageY;
  let swipe = [firstTouch[0]-endTouch[0],firstTouch[1]-endTouch[1]];
  console.log(swipe);
  if (swipe[0] < 0 && Math.abs(swipe[1]) < Math.abs(swipe[0])) {
    controlPlayerMovement("horizontal",1,"player")
  } else if (swipe[0] > 0 && Math.abs(swipe[1]) < Math.abs(swipe[0])) {
    controlPlayerMovement("horizontal",-1,"player")
  } else if (swipe[1] > 0 && Math.abs(swipe[0]) < Math.abs(swipe[1])) {
    controlPlayerMovement("vertical",-1,"player")
  } else if (swipe[1] < 0 && Math.abs(swipe[0]) < Math.abs(swipe[1])) {
    controlPlayerMovement("vertical",+1,"player")
  }
})
/*

controlPlayerMovement("vertical",-1,"player")
controlPlayerMovement("horizontal",1,"player")
*/
