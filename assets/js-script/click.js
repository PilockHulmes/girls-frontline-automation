import utils from './utils.js'

const clickInterval = [30, 70]

// functinos that enable click
const mouseDown = (point) => {
  // mock mouse down
  console.log(`mouse down at ${point.x}, ${point.y}`)
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

module.exports = {

}
