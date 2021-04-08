const calcDist = <T extends [number, number]>([lat1, lon1]:T, [lat2, lon2]:T) => {
  if ([lat1, lon1] === [lat2, lon2]) {
    return 0
  } else {
    const 
      radlat1 = Math.PI * lat1/180,
      radlat2 = Math.PI * lat2/180,
      radtheta = Math.PI * (lon1-lon2)/180

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
  }
}

export default calcDist
