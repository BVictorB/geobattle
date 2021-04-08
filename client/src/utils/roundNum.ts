const roundNum = (num: number, decimals: number) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export default roundNum
