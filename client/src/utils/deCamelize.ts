const deCamelize = (str: string) => {
  const spacedWords = str.replace(/([A-Z])/g,' $1')
  return spacedWords.charAt(0).toUpperCase()+spacedWords.slice(1)
}

export default deCamelize
