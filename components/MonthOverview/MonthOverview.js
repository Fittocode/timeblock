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
        return Math.round(((metric / allMetrics.length) + Number.EPSILON) * decimal) / decimal
    }

    let monthTotals = []

    if (monthArr.length > 0) {
        monthArr[0].metrics.map(() => {
            monthTotals.push(0)
        })
    }

    monthArr.map((entry) => {
        entry.metrics.map((metric, index) => {
            let value = Object.values(metric)[0]
            if (!isNaN(value)) monthTotals[index] += Number(value)
            else if (value !== undefined && value === 'True') monthTotals[index] += 1
        })
    })

    console.log(monthTotals)

    return (
        <div>
            <p>This month...</p>
            {(monthArr.length > 0) ? 
                monthArr[0].metrics.map((metric, index) => {
                    return <p>
                        {Object.keys(metric)[0]}: {
                            (Object.values(metric)[1] === 'Minutes') ? 
                                `${findRoundedTotal(monthTotals[index], 60, 10)} Hours` : `${findRoundedTotal(monthTotals[index], 1, 10)} ${(metric.units) ? metric.units : ''}`
                            }
                        </p>
                }) : ''
            }
        </div>
    )
}