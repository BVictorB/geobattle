const roundNum = (num, decimals) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

module.exports = roundNum
