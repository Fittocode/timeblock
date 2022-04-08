import { useState } from 'react'
import Link from 'next/link'
import { format} from 'date-fns'
import MonthOverview from '../MonthOverview/MonthOverview'
import MetricsDate from '../Date'

export default function Calender({ entries, metricFilter }) {

    const currentDate = new Date()
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let calenderArr = []
    
    const [month, setMonth] = useState(months[currentDate.getMonth()])
    const [year, setYear] = useState(2022)
    const [hover, setHover] = useState(false)

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
            calenderArr.push({date: convertDate(`${monthNum}-${i}-${year}`)})
        }
        // then fill beginning of calendar with end of last month
        for (let i = daysInPreviousMonth; i > (daysInPreviousMonth - dayOfWeek); i--) {
            if (monthNum === 1) calenderArr.unshift({date: convertDate(`${12}-${i}-${year}`)})
            else calenderArr.unshift({date: convertDate(`${monthNum - 1}-${i}-${year}`)})
        }
        // then fill end of calendar with beginning of next month
        const remainingSpaces = 42 - calenderArr.length
        for (let i = 1; i <= remainingSpaces; i++) {
            if (monthNum === 12) calenderArr.push({date: convertDate(`${1}-${i}-${year}`)})
            else calenderArr.push({date: convertDate(`${monthNum + 1}-${i}-${year}`)})
        }
    }
    createCalendarTemplate(monthNum, month, year)
    
    // format dates to MM-dd-yyyy
    entries.map((entry) => {
        entry.date = new Date(entry.date)
        entry.date = format(entry.date, 'MM-dd-yyyy')
    })
    
    entries.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date)
    })
    
    const mapEntriesToCalendarArr = (entries, calenderArr) => {
        calenderArr.map((box) => {
            entries.map((entry) => {
                if (entry.date === box.date) {
                    box.metrics = entry.metrics
                    box._id = entry._id
                }
            })
        })
        return calenderArr
    }

    mapEntriesToCalendarArr(entries, calenderArr)
    
    const colorBasedOnTranquility = (metrics) => {
        let value = 0
        if (metrics) {
            metrics.map((metric) => {
                if (metric.hasOwnProperty('Tranquility')) {
                    value = Number(metric.Tranquility)
                }
            })
            return cardColorPicker(value)
        } else {
            return ''
        }
    }

    const notCurrentMonth = (date, monthNum) => {
        for (let i = 0; i < date.length; i++) {
            if (date[1] !== monthNum.toString()) return 'not-in-month'
        }
    }

    const cardColorPicker = (number) => {
        if (number >= 8.5) return 'card-color-excellent'
        if (number < 8.5 && number > 7) return 'card-color-good'
        if (number <= 7 && number >= 5.5) return 'card-color-fair'
        if (number < 5.5 && number > 4) return 'card-color-poor'
        else return 'card-color-awful'
      }

    const toggleHover = (index) => {
        setHover(index)
    }

    const highlightEntry = (index, notCurrentMonth, date, month) => {
        let notInMonth = notCurrentMonth(date, month)
        if (hover === index && !notInMonth) return 'hoverCurrentMonth'
        else if (hover === index) return 'hoverOtherMonth'
    }

    return (
        <div>
            <h2>{month} {year}</h2>
            <button onClick={() => changePrevMonth()}>prev month</button>{' '}
            <button onClick={() => changeNextMonth()}>next month</button>
            <div className="month-container">
                <div className="month-overview-box">
                    <MonthOverview currentMonth={month} currentYear={year} calenderArr={calenderArr} months={months} metricFilter={metricFilter} entries={entries}/>
                </div>
                <div className="calender-box">
                    {weekdays.map((day) => {
                        return <li key={day} className="day">{day}</li>
                    })}
                        {calenderArr.map((entry, i) => (
                            (entry._id !== undefined) ?
                            <Link href={{pathname: "/posts/[id]", query: {id: entry._id}}} as={`/posts/${entry._id}`}>
                            <a>
                                <li 
                                    key={entry._id} 
                                    className={`card ${colorBasedOnTranquility(entry.metrics)} ${notCurrentMonth(entry.date, monthNum)} ${highlightEntry(i, notCurrentMonth, entry.date, monthNum)}`} 
                                    onMouseEnter={() => toggleHover(i)} 
                                    onMouseLeave={toggleHover} 
                                >
                                    {entry.day || <MetricsDate dateString={entry.date} /> }
                                </li>
                            </a>
                            </Link> : <li 
                                    key={entry._id} 
                                    className={`card ${colorBasedOnTranquility(entry.metrics)} ${notCurrentMonth(entry.date, monthNum)} ${highlightEntry(i, notCurrentMonth, entry.date, monthNum)}`} 
                                    onMouseEnter={() => toggleHover(i)} 
                                    onMouseLeave={toggleHover} 
                                >
                                    {entry.day || <MetricsDate dateString={entry.date} /> }
                                </li>
                        ))}
                </div>
            </div>
        <style jsx>{`
            .month-container {
                display: flex;
                flex-direction: row;
            }

            .month-overview-box {
                min-width: 19rem;
                margin-right: 1rem;
            }

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

            .not-in-month {
                opacity: 0.7;
                filter: brightness(60%)
            }

            .card-color-excellent {
            background-color: rgb(0, 225, 134)
            }

            .card-color-good {
            background-color: rgb(195, 255, 100)
            }

            .card-color-fair {
            background-color: rgb(255, 235, 120)
            }

            .card-color-poor {
            background-color: rgb(255, 138, 72)
            }

            .card-color-awful {
            background-color: rgb(255, 104, 86)
            }

            .hoverCurrentMonth {
                opacity: 0.8;
                filter: brightness(100%)
            }

            .hoverOtherMonth {
                opacity: 0.8;
                filter: brightness(70%)
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
    )
}