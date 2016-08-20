import utils from './utils.js'

const clickInterval = [60, 130]

// functinos that enable click
const mouseDown = (point) => {
  // mock mouse down
  console.log(`mouse down at ${point.x}, ${point.y}`)
}

const mouseMove = (src, dest) => {
  // mock mosue move
  // maybe use Bézier curve to mock the path
  console.log(`mouse move from ${src.x}, ${src.y} to ${dest.x}, ${dest.y}`)
}

const mouseUp = (point) => {
  // mock mouse up
  console.log(`mouse up at ${point.x}, ${point.y}`)
}

const click = (point) => {
  mouseDown(point)

  const randomSec = utils.random(...clickInterval)

  // avoid script detection
  setTimeout(() => {
    mouseUp(point)
  }, randomSec)
}

const drag = (src, dest) => {
  mouseDown(src)

  // wait some time
  mouseMove(src, dest)

  // wait some time
  mouseUp(dest)
}

module.exports = {

}
