const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const MIN_OPTIONS = 4
const MAX_OPTIONS = 18

const DROP_STEPS = 20

let options = 7

const optionsValue = document.getElementById('optionsValue')
const decreaseOptions = document.getElementById('decreaseOptions')
const increaseOptions = document.getElementById('increaseOptions')

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect()

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  drawBoard()
}

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawStartPositions()
  drawPins()
  drawResults()
}

function drawStartPositions() {
  const count = 7

  const centerX = canvas.width / 2
  const y = 60

  const spacing = 70

  for (let i = 0; i < count; i++) {
    const x = centerX + (i - (count - 1) / 2) * spacing

    ctx.beginPath()
    ctx.arc(x, y, 18, 0, Math.PI * 2)

    ctx.fillStyle = '#222'
    ctx.fill()

    ctx.strokeStyle = '#777'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = '#fff'
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(i + 1, x, y)
  }
}

function drawPins() {
  const rows = 7

  const centerX = canvas.width / 2

  const startY = 180
  const endY = canvas.height - 140

  const rowSpacing = (endY - startY) / (rows - 1)

  const pinSpacing = 55

  for (let row = 0; row < rows; row++) {
    const y = startY + row * rowSpacing

    const pinCount = row % 2 === 0 ? 8 : 7

    const totalWidth = (pinCount - 1) * pinSpacing

    const startX = centerX - totalWidth / 2

    for (let i = 0; i < pinCount; i++) {
      const x = startX + i * pinSpacing

      drawPin(x, y)
    }
  }
}

function drawPin(x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 7, 0, Math.PI * 2)

  ctx.fillStyle = '#fff'
  ctx.fill()
}

function drawResults() {
  const count = 7

  const width = 70
  const height = 60

  const totalWidth = count * width

  const startX = (canvas.width - totalWidth) / 2
  const y = canvas.height - height - 40

  ctx.strokeStyle = '#777'
  ctx.lineWidth = 2

  for (let i = 0; i < count; i++) {
    const x = startX + i * width

    ctx.strokeRect(x, y, width, height)

    ctx.fillStyle = '#fff'
    ctx.font = '20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.fillText(i + 1, x + width / 2, y + height / 2)
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

function dropBall(startChoice) {
  let choice = startChoice

  for (let i = 0; i < DROP_STEPS; i++) {
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
