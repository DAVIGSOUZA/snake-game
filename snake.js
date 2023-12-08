import { BOARD_SIZE } from "./constants.js"
import { getInputDirection } from "./input.js"


const snakeBody = [{x: 21, y: 21}]

let newSnakeSegment = 0

export function updateSnake() {
  addSnakeSegment()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i+1] = {...snakeBody[i]}
  }

  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function drawSnake(board) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    
    snakeElement.style.gridRowStart = segment.y
    
    snakeElement.style.gridColumnStart = segment.x
    
    snakeElement.classList.add('snake')
    
    board.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSnakeSegment += amount
}

export function snakeEat(foodPosition, eatingItself = false) {
  return snakeBody.some((snakePosition, index) => {
    if (eatingItself && index === 0) {
      return false
    }

    return (
      snakePosition.x === foodPosition.x && 
      snakePosition.y === foodPosition.y
    )
  })
}

function addSnakeSegment() {
  for (let i = 0; i < newSnakeSegment; i++) {
    snakeBody.push({...snakeBody[snakeBody.length - 1]})
  }

  newSnakeSegment = 0
}

export function snakeIntersection() {
  return snakeEat(snakeBody[0], true)
}

export function hitBoardWall() {
  return (
    snakeBody[0].x < 1 || snakeBody[0].x > BOARD_SIZE ||
    snakeBody[0].y < 1 || snakeBody[0].y > BOARD_SIZE
  )
}