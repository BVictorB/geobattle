const camelize = (str: string) => (
  str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => (
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  )).replace(/\s+/g, '')
)

export default camelize
