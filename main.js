const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const MIN_OPTIONS = 4
const MAX_OPTIONS = 18

const MIN_HEIGHT = 7
const MAX_HEIGHT = 19
const HEIGHT_STEP = 2

let options = 7

let height = 19

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

  drawStartPositions(layout)
  drawPins(layout)
  drawResults(layout)
}

function drawStartPositions(layout) {
  const buttonWidth = layout.boardWidth / options
  const buttonHeight = 44

  const y = layout.startY

  for (let i = 0; i < options; i++) {
    const x = layout.left + i * buttonWidth

    ctx.fillStyle = '#222'
    ctx.fillRect(x + 2, y, buttonWidth - 4, buttonHeight)

    ctx.strokeStyle = '#666'
    ctx.lineWidth = 1
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

  for (let i = 0; i < height; i++) {
    if (choice === 1) {
      choice += 0.5
    } else if (choice === options) {
      choice -= 0.5
    } else {
      choice += Math.random() < 0.5 ? -0.5 : 0.5
    }

    console.log(`Step ${i + 1}: ${choice}`)
  }

  return choice
}

window.addEventListener('resize', resizeCanvas)

resizeCanvas()

console.log('Result:', dropBall(3))
