let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

export function getInputDirection() {
  lastInputDirection = inputDirection
  return inputDirection
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': 
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: -1}
      break
      case 'ArrowDown': 
      if (lastInputDirection.y !== 0) break
      inputDirection = { x: 0, y: 1}
      break
      case 'ArrowLeft': 
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: -1, y: 0}
      break
      case 'ArrowRight': 
      if (lastInputDirection.x !== 0) break
      inputDirection = { x: 1, y: 0}
      break
  }
})

// swipe
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

function handleGesture(touchstartX, touchstartY, touchendX, touchendY) {
  const delx = touchendX - touchstartX;
  const dely = touchendY - touchstartY;

  if(Math.abs(delx) > Math.abs(dely)) {
    // swipe right
    if(delx > 0) {
      if (lastInputDirection.x !== 0) return
      inputDirection = { x: 1, y: 0}
      return
    }
    // swipe left
    else {
      if (lastInputDirection.x !== 0) return
      inputDirection = { x: -1, y: 0}
      return
    }
  }
  else if(Math.abs(delx) < Math.abs(dely)) {
    // swipe down
    if(dely > 0) {
      if (lastInputDirection.y !== 0) return
      inputDirection = { x: 0, y: 1}
      return
    }
    // swipe up
    else {
      if (lastInputDirection.y !== 0) return
      inputDirection = { x: 0, y: -1}
      return
    }
  }
}

const gestureZone = document.getElementById('board');

gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    (handleGesture(touchstartX, touchstartY, touchendX, touchendY))
}, false); 