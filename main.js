const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const MIN_OPTIONS = 4
const MAX_OPTIONS = 18

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

  ctx.fillStyle = '#151515'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
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

window.addEventListener('resize', resizeCanvas)

resizeCanvas()
