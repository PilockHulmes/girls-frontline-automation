const sleep = (time) => {
  // use c++ to implement sleep
  console.log(`slept ${time}ms`)
}

const random = (start, end) => {
  if (start > end) {
    throw(`End(${end}) must be greater than start(${start})`)
  }
  const rate = end - start
  return Math.round(Math.random() * rate + start)
}

const run = (func, sleep, bounce) => {
  bounce = bounce ? bounce : 0
  const sleepTime = random(sleep - bounce, sleep + bounce)
  func()
  sleep(sleepTime)
  return util
}

const wrapper = (...params) => {
  const func = params.shift()
  return () => {
    func(...params)
  }
}

const util = {
  random,
  sleep,
  run,
  wrapper,
}

module.exports = util
