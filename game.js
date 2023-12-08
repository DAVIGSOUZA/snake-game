import { SNAKE_SPEED, RESTART_PATH } from "./constants.js"
import { 
  updateSnake,
  drawSnake,
  hitBoardWall,
  snakeIntersection 
} from "./snake.js"
import { updateFood, drawFood } from "./food.js"

let lastRenderTime = 0

let gameOver = false

const board = document.getElementById('board')

function gameLoop(currentTime) {
  if (gameOver) {
    if (confirm('GAME OVER  😢')) {
      window.location = RESTART_PATH
    }

    return
  }

  window.requestAnimationFrame(gameLoop)

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    return
  }
  
  lastRenderTime = currentTime


  update()

  draw()
}

window.requestAnimationFrame(gameLoop)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  board.innerHTML = ''
  drawSnake(board)
  drawFood(board)
}

function checkDeath() {
  gameOver = hitBoardWall() || snakeIntersection()
}