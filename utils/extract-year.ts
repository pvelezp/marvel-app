const extractYear = (text: string): { title: string; year: number } => {
  const yearRegex = /\((\d{4})\)/

  const match = text.match(yearRegex)

  if (match) {
    const year = match[1]
    const textWithoutYear = text.replace(yearRegex, '').trim()

    return { title: textWithoutYear, year: Number(year) }
  } else {
    // If no year is found, return the original text and 0 for the year
    return { title: text, year: 0 }
  }
}

export default extractYear
