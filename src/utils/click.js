import utils from './utils.js'
import Bezier from 'bezier-js'

const clickInterval = [60, 130]
let ctx

const setCtx = (context) =>{
  ctx = context
}

// functinos that enable click
const mouseDown = (point) => {
  // mock mouse down
  console.log(`mouse down at ${point.x}, ${point.y}`)
  ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
}

const mouseUp = (point) => {
  // mock mouse up
  console.log(`mouse up at ${point.x}, ${point.y}`)
  ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI)
  ctx.fill()
  ctx.stroke()
}

const click = (point) => {
  mouseDown(point)
  const randomSec = utils.random(...clickInterval)
  utils.sleep(randomSec)

  // avoid script detection
  mouseUp(point)
}

const mouseMove = (src, dest) => {
  // mock mosue move
  console.log(`mouse move from ${src.x}, ${src.y} to ${dest.x}, ${dest.y}`)
  ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(src.x, src.y)
  ctx.lineTo(dest.x, dest.y)
  ctx.stroke()
}

const drag = (src, dest) => {
  mouseDown(src)

  const mp1 = {x: 200, y: 0} // middle point 1
  const mp2 = {x: 0, y: 0} // middle point 2

  const curve = new Bezier(
    src.x, src.y,
    mp1.x, mp1.y,
    mp2.x, mp2.y,
    dest.x, dest.y
  )

  const length = curve.length()
  const step = Math.round(length * 0.5)
  console.log(step)
  const LUT = curve.getLUT(step) // get the lookup table for curve

  ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)'
  ctx.lineWidth = 3
  ctx.beginPath()

  ctx.moveTo(src.x, src.y)

  LUT.forEach((p) => {
    ctx.lineTo(p.x, p.y)
  })

  ctx.stroke()

  // // wait some time
  // mouseMove(src, dest)

  // wait some time
  mouseUp(dest)
}

module.exports = {
  setCtx,
  mouseDown,
  mouseUp,
  click,
  drag,
}
