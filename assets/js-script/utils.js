const random = (start, end) => {
  if (start <= end) {
    throw(`End(${end}) must be greater than start(${start})`)
  }
  const rate = end - start
  return Math.round(Math.random() * rate + start)
}

module.exports = {
  random,
}
