import { useState } from 'react'
import Link from 'next/link'
import { format} from 'date-fns'
import MetricsDate from '../Date'

export default function Calender({ entries }) {

    // get entries of current month
    // sort current month entries, beginning to end
    // get entries of previous month
    // sort previous month entries

    const currentDate = new Date()
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const calendarTemplateArr = []
    
    const [month, setMonth] = useState(months[currentDate.getMonth()])
    const [year, setYear] = useState(2022)
    
    const monthNum = (months.indexOf(month) + 1)

    entries.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })

    let findMonthEntries = (month) => entries.filter(entry => {
        const [eYear, eMonth, eDay] = entry.date.split('-')
        if (eMonth === month) return entry
    })

    const currentMonthEntries = findMonthEntries('03')
    const lastMonthEntries = findMonthEntries('02')

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

    const createCalendarTemplate = (monthNum, month, year) => {
        const daysInMonth = new Date(year, monthNum, 0).getDate()
        const daysInPreviousMonth = new Date(year, monthNum - 1, 0).getDate()
        const firstDayMonth = new Date(`${month} 1 ${year}`)
        const dayOfWeek = firstDayMonth.getDay()
        
        // add entirety of current month to arr
        for (let i = 1; i <= daysInMonth; i++) {
            calendarTemplateArr.push({month: months[monthNum - 1], day: i})
        }
        // then fill beginning of calendar with end of last month
        for (let i = daysInPreviousMonth; i > (daysInPreviousMonth - dayOfWeek); i--) {
            calendarTemplateArr.unshift({month: months[monthNum - 2], day: i})
        }
        // then fill end of calendar with beginning of next month
        const remainingSpaces = 42 - calendarTemplateArr.length
        for (let i = 1; i <= remainingSpaces; i++) {
            if (monthNum === 12) calendarTemplateArr.push({month: months[0], day: i})
            else calendarTemplateArr.push({month: monthNum + 1, day: i})
        }
    }
    console.log(months.indexOf(month))

    createCalendarTemplate(monthNum, month, year)

    const mapEntries = () => {
        
    }

    
    // const addPreviousMonthEntries = (previousMonthEntries, daysInMonth, dayOfWeek) => {
    //     const reversedMonthEntries = previousMonthEntries.reverse()
    
    //     for (let i = 0; i < dayOfWeek; i++) {
    //         currentMonthEntries.unshift(reversedMonthEntries[i])
    //     }
    //     const num = currentMonthEntries.length - 1
    //     for (let i = num, j = num; i < 41; i++, j++) {
    //         if (j === daysInMonth + 1) {
    //             j = 1
    //         }
    //         currentMonthEntries.push({date: new Date(`${currentYear}-${currentMonth}-${j}`)})
    //     }
    //     return currentMonthEntries
    // }

    // const calenderArr = addPreviousMonthEntries(lastMonthEntries, daysInMonth, dayOfWeek)

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
            {calendarTemplateArr.map((entry) => {
                return <li className="card">{entry.day}</li>
            })}
            {/* {calenderArr.map((entry) => (
                <Link key={entry._id} href={{pathname: "/posts/[id]", query: {id: entry._id}}} as={`/posts/${entry._id}`}>
                <a>
                    <li className={`card ${tranquilityExists(entry)}`}>
                        <MetricsDate dateString={entry.date} /> 
                    </li>
                </a>
                </Link>
            ))} */}
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
            height: 401px;
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