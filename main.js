const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

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
  if (options > 2) {
    options--
    updateOptions()
  }
})

increaseOptions.addEventListener('click', () => {
  if (options < 15) {
    options++
    updateOptions()
  }
})

window.addEventListener('resize', resizeCanvas)

resizeCanvas()
