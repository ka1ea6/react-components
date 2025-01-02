export const formatDateTime = (timestamp: string): string => {
  const now = new Date()
  let date = now
  if (timestamp) date = new Date(timestamp)
  const months = date.getMonth()
  const days = date.getDate()
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  const MM = months + 1 < 10 ? `0${months + 1}` : months + 1
  const DD = days < 10 ? `0${days}` : days
  const YYYY = date.getFullYear()
  // const AMPM = hours < 12 ? 'AM' : 'PM';
  // const HH = hours > 12 ? hours - 12 : hours;
  // const MinMin = (minutes < 10) ? `0${minutes}` : minutes;
  // const SS = (seconds < 10) ? `0${seconds}` : seconds;

  return `${DD}/${MM}/${YYYY}`
}

export const formatDateTimeString = (timestamp: string): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const day = date.getDate()
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const year = date.getFullYear()

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  return `${dayOfWeek} ${day}${getOrdinalSuffix(day)} ${month} ${year}`
}

export const formatDateTimeStringShort = (timestamp: string): string => {
  const date = timestamp ? new Date(timestamp) : new Date()

  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
  const day = date.getDate()
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
  // const year = date.getFullYear()

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  return `${dayOfWeek} ${day}${getOrdinalSuffix(day)} ${month}`
}