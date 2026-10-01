const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const MIN_OPTIONS = 4
const MAX_OPTIONS = 18

const MIN_HEIGHT = 7
const MAX_HEIGHT = 19
const HEIGHT_STEP = 2

let options = 7

let height = 19

let hoveredStart = null

function getBoardLayout() {
  const centerX = canvas.width / 2

  const boardWidth = Math.min(520, canvas.width - 80)

  const left = centerX - boardWidth / 2
  const right = centerX + boardWidth / 2

  const startY = 60

  const pinsTop = 150
  const resultsHeight = 60
  const resultsY = canvas.height - resultsHeight - 40

  const resultsGap = 30

  const pinsBottom = resultsY - resultsGap

  const rowSpacing = (pinsBottom - pinsTop) / (height - 1)

  return {
    centerX,
    boardWidth,
    left,
    right,
    startY,
    pinsTop,
    pinsBottom,
    rowSpacing,
    resultsY,
    resultsHeight,
  }
}

const optionsValue = document.getElementById('optionsValue')
const decreaseOptions = document.getElementById('decreaseOptions')
const increaseOptions = document.getElementById('increaseOptions')

const heightValue = document.getElementById('heightValue')
const decreaseHeight = document.getElementById('decreaseHeight')
const increaseHeight = document.getElementById('increaseHeight')

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  drawBoard()
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const layout = getBoardLayout()

  drawBoardBackground(layout)
  drawStartPositions(layout)
  drawPins(layout)
  drawResults(layout)

  // drawBall(3, 0, layout)
}

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect()

  const mouseX = (event.clientX - rect.left) * (canvas.width / rect.width)
  const mouseY = (event.clientY - rect.top) * (canvas.height / rect.height)

  const layout = getBoardLayout()

  const buttonWidth = layout.boardWidth / options
  const buttonHeight = 44
  const y = layout.startY

  let newHoveredStart = null

  if (mouseY >= y && mouseY <= y + buttonHeight) {
    for (let i = 0; i < options; i++) {
      const x = layout.left + i * buttonWidth

      if (mouseX >= x && mouseX <= x + buttonWidth) {
        newHoveredStart = i
        break
      }
    }
  }

  if (hoveredStart !== newHoveredStart) {
    hoveredStart = newHoveredStart
    drawBoard()
  }
})

canvas.addEventListener('mouseleave', () => {
  if (hoveredStart !== null) {
    hoveredStart = null
    drawBoard()
  }
})

function drawStartPositions(layout) {
  const buttonWidth = layout.boardWidth / options
  const buttonHeight = 44
  const y = layout.startY

  for (let i = 0; i < options; i++) {
    const x = layout.left + i * buttonWidth
    const isHovered = hoveredStart === i

    ctx.fillStyle = isHovered ? '#444' : '#222'
    ctx.fillRect(x + 2, y, buttonWidth - 4, buttonHeight)

    ctx.strokeStyle = isHovered ? '#fff' : '#666'
    ctx.lineWidth = isHovered ? 2 : 1
    ctx.strokeRect(x + 2, y, buttonWidth - 4, buttonHeight)

    ctx.fillStyle = '#fff'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(i + 1, x + buttonWidth / 2, y + buttonHeight / 2)
  }
}

function drawPins(layout) {
  for (let row = 0; row < height; row++) {
    const y = layout.pinsTop + row * layout.rowSpacing

    const pinCount = row % 2 === 0 ? options + 1 : options

    const spacing = layout.boardWidth / options

    const totalWidth = (pinCount - 1) * spacing

    const startX = layout.centerX - totalWidth / 2

    for (let i = 0; i < pinCount; i++) {
      const x = startX + i * spacing

      drawPin(x, y)
    }
  }
}

function drawPin(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 5, 0, Math.PI * 2)

  ctx.fillStyle = '#fff'
  ctx.fill()
}

function drawResults(layout) {
  const cellWidth = layout.boardWidth / options
  const cellHeight = layout.resultsHeight

  const y = layout.resultsY

  for (let i = 0; i < options; i++) {
    const x = layout.left + i * cellWidth

    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1

    ctx.strokeRect(x, y, cellWidth, cellHeight)

    ctx.fillStyle = '#fff'
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(i + 1, x + cellWidth / 2, y + cellHeight / 2)
  }
}

function drawBoardBackground(layout) {
  const top = 30
  const bottom = layout.resultsY + layout.resultsHeight + 30

  ctx.fillStyle = '#201f1f'

  ctx.fillRect(layout.left, top, layout.boardWidth, bottom - top)
}

function drawBall(choice, step, layout) {
  const position = getBallPosition(choice, step, layout)

  ctx.beginPath()
  ctx.arc(position.x, position.y, 7, 0, Math.PI * 2)

  ctx.fillStyle = '#c70d0d'
  ctx.fill()
}

function updateOptions() {
  optionsValue.textContent = options

  drawBoard()
}

decreaseOptions.addEventListener('click', () => {
  if (options > MIN_OPTIONS) {
    options--
    updateOptions()
  }
})

increaseOptions.addEventListener('click', () => {
  if (options < MAX_OPTIONS) {
    options++
    updateOptions()
  }
})

decreaseHeight.addEventListener('click', () => {
  if (height > MIN_HEIGHT) {
    height -= HEIGHT_STEP
    updateHeight()
  }
})

increaseHeight.addEventListener('click', () => {
  if (height < MAX_HEIGHT) {
    height += HEIGHT_STEP
    updateHeight()
  }
})

function updateHeight() {
  heightValue.textContent = height

  drawBoard()
}

function dropBall(startChoice) {
  let choice = startChoice

  const path = [choice]

  for (let i = 0; i < height - 1; i++) {
    if (choice === 1) {
      choice += 0.5
    } else if (choice === options) {
      choice -= 0.5
    } else {
      choice += Math.random() < 0.5 ? -0.5 : 0.5
    }

    path.push(choice)

    console.log(`Step ${i + 1}: ${choice}`)
  }

  return path
}

function animateBall(path) {
  let step = 0

  function animate() {
    drawBoard()

    const layout = getBoardLayout()

    drawBall(path[step], step, layout)

    step++

    if (step < path.length) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}

function getBallX(choice, layout) {
  const spacing = layout.boardWidth / options

  return layout.left + (choice - 0.5) * spacing
}

function getBallY(step, layout) {
  return layout.pinsTop + step * layout.rowSpacing
}

function getBallPosition(choice, step, layout) {
  return {
    x: getBallX(choice, layout),
    y: getBallY(step, layout),
  }
}

window.addEventListener('resize', resizeCanvas)

resizeCanvas()

console.log('Path:', dropBall(3))

animateBall(dropBall(3))
