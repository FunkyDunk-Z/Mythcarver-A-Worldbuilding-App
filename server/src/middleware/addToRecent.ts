const addToRecent = (recent: string[], docId: string) => {
  const docIndex = recent.indexOf(docId)
  if (docIndex !== -1) {
    recent.splice(docIndex, 1)
  } else if (recent.length === 5) {
    recent.pop()
  }

  recent.unshift(docId)
}

export default addToRecent
