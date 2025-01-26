import { format } from 'date-fns'

export const formatDate = (date?: string | Date) => {
  if (!date) return ''
  return format(new Date(date), 'd MMMM yyyy')
}
