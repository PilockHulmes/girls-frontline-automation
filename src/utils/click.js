import utils from './utils.js'
import Bezier from 'bezier-js'

const clickInterval = [60, 130]
const middlePointAngle = [25, 65]
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

  const [mp1, mp2] = getMiddlePoints(src, dest)

  click(mp1)
  click(mp2)

  const curve = new Bezier(
    src.x, src.y,
    mp1.x, mp1.y,
    mp2.x, mp2.y,
    dest.x, dest.y
  )

  const length = curve.length()
  const step = Math.round(length * 0.8)
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

// point: a point in the line from src to dest
// -1/k = (dest.y - src.y) / (dest.x - src.x)
// => k = (src.x - dest.x) / (dest.y - src.y)
// line => y - point.y = k * (x - point.x)
// circle  (x - src.x)^2 + (y - src.y)^2 = r^2

// Formula:
// (x-a)^2 + (y-b)^2 = r^2
// y=kx+c
// so x = (2(a+b-c) ± (√Δ) ) / 2(1 + k^2)
// and delta = 4(c-b-a)^2 - 4(1+k^2)(c-b-a)

// c = k * point.x + point.y
// a = src.x or dest.x
// b = src.y or dest.y
// k = (src.x - dest.x) / (dest.y - src.y)
const getMiddlePoints = (src, dest) => {
  const lineLength = Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.y, 2))

  const radius = Math.round(lineLength / 6)

  const angle = utils.random(...middlePointAngle)

  const {srcPoint, destPoint} = getPoints(src, dest)

  const k = getPerpendicularSlope(src, dest)

  const mp1 = getOneIntersectionPoint(k, srcPoint, radius, src)
  const mp2 = getOneIntersectionPoint(k, destPoint, radius, dest)

  return [mp1, mp2]
}

const getPoints = (src, dest) => {
  const lineLength = Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.y, 2))

  const radius = Math.round(lineLength / 6)

  const length = utils.random(Math.round(radius / 5), radius)

  const ratio = length / lineLength // length ratio

  const srcPoint = {
    x: Math.round(src.x + (dest.x - src.x) * ratio),
    y: Math.round(src.y + (dest.y - src.y) * ratio)
  }

  const destPoint = {
    x: Math.round(dest.x + (src.x - dest.x) * ratio),
    y: Math.round(dest.y + (src.y - dest.y) * ratio)
  }

  return {srcPoint, destPoint}
}

// k = (src.x - dest.x) / (dest.y - src.y)
const getPerpendicularSlope = (src, dest) => {
  return (src.x - dest.x) / (dest.y - src.y)
}

// so x = (2(a+b-c) ± (√Δ) ) / 2(1 + k^2)
// and delta = 4(c-b-a)^2 - 4(1+k^2)(c-b-a)

// c = k * point.x + point.y
// a = src.x or dest.x
// b = src.y or dest.y
// k = (src.x - dest.x) / (dest.y - src.y)
const getOneIntersectionPoint = (k, linePoint, radius, circlePoint) => {
  const c = k * linePoint.x + linePoint.y
  const a = circlePoint.x
  const b = circlePoint.y
  const delta = getDelta(a, b, c, k)
  if (delta < 0) {
    throw('The circle and line has no intersection point.')
  }
  let coefficient
  if (utils.coinTossing()) {
    coefficient = 1
  } else {
    coefficient = -1
  }

  const x = (2 * (a + b - c) + coefficient * Math.sqrt(delta)) / 2 * (1 + k ^ 2)
  const y = k * x + c

  return {x, y}
}

// delta = 4(c-b-a)^2 - 4(1+k^2)(c-b-a)
const getDelta = (a, b, c, k) => {
  const firstPart = 4 * (c - a - b) ^ 2
  const secondPart = 4 * (1 + k ^ 2) * (c - a - b)
  return firstPart - secondPart
}

module.exports = {
  setCtx,
  mouseDown,
  mouseUp,
  click,
  drag,
}
