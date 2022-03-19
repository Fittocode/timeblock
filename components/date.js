import { format} from 'date-fns'

export default function MetricsDate({ dateString }) {
  let date = new Date(dateString)
  let day = format(date, 'd')
  return <time dateTime={dateString}>{day}</time>
}