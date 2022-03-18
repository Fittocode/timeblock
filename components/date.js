import { format} from 'date-fns'

export default function MetricsDate({ dateString }) {
  let date = new Date(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}