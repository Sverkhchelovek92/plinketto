const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const START_OPTIONS = 3
const RESULT_OPTIONS = 7
const ROWS = 5

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  drawBoard()
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawStartPoints()
  drawRows()
  drawResults()
}

function drawStartPoints() {
  const spacing = canvas.width / (START_OPTIONS + 1)
  const y = 100

  for (let i = 0; i < START_OPTIONS; i++) {
    const x = spacing * (i + 1)

    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }
}

function drawRows() {
  const startY = 180
  const rowSpacing = 90

  const spacing = canvas.width / (START_OPTIONS + 1)

  for (let row = 0; row < ROWS; row++) {
    const y = startY + row * rowSpacing

    for (let i = 0; i < START_OPTIONS + row; i++) {
      const x = canvas.width / 2 + (i - (START_OPTIONS + row - 1) / 2) * spacing

      drawPin(x, y)
    }
  }
}

function drawPin(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 6, 0, Math.PI * 2)

  ctx.fillStyle = '#fff'
  ctx.fill()
}

function drawResults() {
  const cellWidth = canvas.width / RESULT_OPTIONS
  const cellHeight = 70
  const y = canvas.height - cellHeight

  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2

  for (let i = 0; i < RESULT_OPTIONS; i++) {
    const x = i * cellWidth

    ctx.strokeRect(x, y, cellWidth, cellHeight)

    ctx.fillStyle = '#fff'
    ctx.font = '24px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(i + 1, x + cellWidth / 2, y + cellHeight / 2)
  }
}

window.addEventListener('resize', resizeCanvas)

resizeCanvas()
