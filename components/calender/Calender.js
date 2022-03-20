import { useState } from 'react'
import Link from 'next/link'
import { format} from 'date-fns'
import MetricsDate from '../Date'

export default function Calender({ entries }) {

    const currentDate = new Date()
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let calendarTemplateArr = []
    const calendarEntries = []
    
    const [month, setMonth] = useState(months[currentDate.getMonth()])
    const [year, setYear] = useState(2022)

    const monthNum = (months.indexOf(month) + 1)

    // buttons to change month and year
    const changePrevMonth = () => {
        if (month === 'January') {
            setMonth(months[11])
            setYear(year - 1)
        }
        else setMonth(months[months.indexOf(month) - 1])
    }

    const changeNextMonth = () => {
        if (month === 'December') {
            setMonth(months[0])
            setYear(year + 1)
        } 
        else setMonth(months[months.indexOf(month) + 1])
    }

    const convertDate = (entryDate) => {
        let date = new Date(entryDate)
        return format(date, 'MM-dd-yyyy')
    }

    const createCalendarTemplate = (monthNum, month, year) => {
        const daysInMonth = new Date(year, monthNum, 0).getDate()
        const daysInPreviousMonth = new Date(year, monthNum - 1, 0).getDate()
        const firstDayMonth = new Date(`${month} 1 ${year}`)
        const dayOfWeek = firstDayMonth.getDay()
        
        // add entirety of current month to arr
        for (let i = 1; i <= daysInMonth; i++) {
            calendarTemplateArr.push({date: convertDate(`${monthNum}-${i}-${year}`)})
        }
        // then fill beginning of calendar with end of last month
        for (let i = daysInPreviousMonth; i > (daysInPreviousMonth - dayOfWeek); i--) {
            if (monthNum === 1) calendarTemplateArr.unshift({date: convertDate(`${12}-${i}-${year}`)})
            else calendarTemplateArr.unshift({date: convertDate(`${monthNum - 1}-${i}-${year}`)})
        }
        // then fill end of calendar with beginning of next month
        const remainingSpaces = 42 - calendarTemplateArr.length
        for (let i = 1; i <= remainingSpaces; i++) {
            if (monthNum === 12) calendarTemplateArr.push({date: convertDate(`${1}-${i}-${year}`)})
            else calendarTemplateArr.push({date: convertDate(`${monthNum + 1}-${i}-${year}`)})
        }
    }
    createCalendarTemplate(monthNum, month, year)

    // get entries of current month
    // sort current month entries, beginning to end
    // get entries of previous month
    // sort previous month entries
    
    entries.map((entry) => {
        entry.date = new Date(entry.date)
        entry.date = format(entry.date, 'MM-dd-yyyy')
    })

    // const fullArr = entries.concat(calendarTemplateArr)
    
    entries.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    
    const mapEntriesToCalendar = (entries, calendarTemplateArr) => {
        calendarTemplateArr.map((box, index) => {
            // if (entries[index].date === box.date) {
            //     box.name = 'Yes!'
            // } else {
            //     box.name = 'nope'
            // }
            entries.map((entry) => {
                if (entry.date === box.date) {
                    box.metrics = entry.metrics
                    box._id = entry._id
                }
            })
        })
        return calendarTemplateArr
    }

    mapEntriesToCalendar(entries, calendarTemplateArr)
    console.log(calendarTemplateArr)

    const tranquilityExists = (entry) => {
        if (entry.hasOwnProperty('metrics')) return cardColorPicker(entry.metrics[4].Tranquility)
    }

    const cardColorPicker = (number) => {
        if (number > 8) return 'card-color-excellent'
        if (number <= 8 && number > 7) return 'card-color-good'
        if (number <= 7 && number >= 5.5) return 'card-color-fair'
        if (number < 5.5 && number >= 4) return 'card-color-poor'
        else return 'card-color-awful'
      }

    return (
        <div>
            <h2>{month} {year}</h2>
            <button onClick={() => changePrevMonth()}>prev month</button>{' '}
            <button onClick={() => changeNextMonth()}>next month</button>
            <br />
            <br />
            <div className="calender-box">
                {weekdays.map((day) => {
                    return <li className="day">{day}</li>
                })}
                    {calendarTemplateArr.map((entry) => (
                        <Link key={entry._id} href={{pathname: "/posts/[id]", query: {id: entry._id}}} as={`/posts/${entry._id}`}>
                        <a>
                            <li className={`card ${tranquilityExists(entry)}`}>
                                {entry.day || <MetricsDate dateString={entry.date} /> }
                            </li>
                        </a>
                        </Link>
                    ))}
            <style jsx>{`

            .day {
                padding: 2px;
                width: 100px;
                height: 40px;
                border: .5px solid black;
            }

            li {
            display: inline-block;
            }

            a {
            color: inherit;
            text-decoration: none;
            }

            .calender-box {
            width: 702px;
            height: 402px;
            border: 1px solid black;
            }

            .card {
            flex-basis: 45%;
            background: white;
            padding: .5rem;
            width: 100px;
            height: 60px;
            text-align: left;
            color: inherit;
            text-decoration: none;
            transition: color 0.15s ease, border-color 0.15s ease;
            border: .5px solid black
            }

            .card-color-excellent {
            background-color: rgba(0, 225, 134, 0.8)
            }

            .card-color-good {
            background-color: rgba(195, 255, 100, 0.8)
            }

            .card-color-fair {
            background-color: rgba(255, 235, 120, 0.8)
            }

            .card-color-poor {
            background-color: rgba(255, 138, 72, 0.8)
            }

            .card-color-awful {
            background-color: rgba(255, 104, 86, 0.8)
            }

            .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
            }

            .card p {
            margin: 0;
            font-size: 1rem;
            line-height: 1.5;
            }

        `}</style>
        </div>
    </div>
    )
}