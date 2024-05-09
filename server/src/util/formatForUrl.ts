export const formatForUrl = (string: string) => {
  return string.replace(/ /g, '-').toLowerCase()
}
