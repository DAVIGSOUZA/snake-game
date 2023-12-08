import { EXPANSION_RATE, BOARD_SIZE } from "./constants.js"
import { snakeEat, expandSnake } from "./snake.js"

let food = {x: 10, y: 13}

export function updateFood() {
  if (snakeEat(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}

export function drawFood(board) {
    const foodElement = document.createElement('div')
    
    foodElement.style.gridRowStart = food.y
    
    foodElement.style.gridColumnStart = food.x
    
    foodElement.classList.add('food')
    
    board.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  
  while (newFoodPosition == null || snakeEat(newFoodPosition)) {
    newFoodPosition = {
      x: Math.floor(Math.random() * BOARD_SIZE) + 1,
      y: Math.floor(Math.random() * BOARD_SIZE) + 1,
    }
  }

  return newFoodPosition
}

