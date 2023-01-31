import moment from 'moment'

export const formatTimezone = (date: Date): string => {
  return moment(date).startOf('date').fromNow()
}

export const formatDateTime = (date: Date) => {
  return moment(date).format('h:mm a - MMM DD, YYYY')
}

export const formatBirthday = (date: Date) => {
  return moment(date).format('MMM DD, YYYY')
}

export const formatJoinAccount = (date: Date) => {
  return moment(date).format('MMMM YYYY')
}
