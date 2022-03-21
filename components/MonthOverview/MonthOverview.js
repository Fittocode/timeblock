import { useState } from 'react'
import { format} from 'date-fns'
import MetricsDate from '../Date'

export default function MonthOverview({calenderArr, currentMonth, months}) {

    console.log(calenderArr)
    
    const getCurrentMonthEntries = (calenderArr, month, months) => {
        let arr = []
        calenderArr.map((entry) => {
            let date = new Date(entry.date)
            if (date.getMonth() === (months.indexOf(currentMonth)) && entry.metrics) arr.push(entry)
        })
        return arr
    }

    const monthArr = getCurrentMonthEntries(calenderArr, currentMonth, months)

    const findRoundedTotal = (metric, converter, decimal) => {
        return Math.round(((metric + Number.EPSILON) / converter) * decimal) / decimal
    }

    const findRoundedAvg = (metric, decimal) => {
        return Math.round(((metric / monthArr.length) + Number.EPSILON) * decimal) / decimal
    }

    let monthTotals = []

    monthArr.sort(function(a, b) {
        return a.metrics.length - b.metrics.length
    })

    if (monthArr.length > 0) {
        monthArr[monthArr.length-1].metrics.map(() => {
            monthTotals.push(0)
        })
    }

    monthArr.map((entry) => {
        entry.metrics.map((metric, index) => {
            console.log(metric)
            let value = Object.values(metric)[0]
            if (!isNaN(value)) monthTotals[index] += Number(value)
            else if (value !== undefined && value !== 'False' && value !== 'No Data') monthTotals[index] += 1
        })
    })

    console.log(monthArr)

    return (
        <div>
            <p>This month...</p>
            {(monthArr.length > 0) ? 
                monthArr[monthArr.length-1].metrics.map((metric, index) => {
                    return <p>
                        {Object.keys(metric)[0]}: {
                            (Object.values(metric)[1] === 'Minutes' && Object.values(metric)[0] < 60) ? 
                                `${findRoundedTotal(monthTotals[index], 60, 10)} Hours` : 
                                    `${(Object.keys(metric)[0] === 'Tranquility') ? 
                                        `${findRoundedAvg(monthTotals[index], 10)} (Average)` : findRoundedTotal(monthTotals[index], 1, 10)} ${(metric.units) ? metric.units : ''}`
                            }
                        </p>
                }) : ''
            }
        </div>
    )
}