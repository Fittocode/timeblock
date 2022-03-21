import { useState } from 'react'
import { format} from 'date-fns'
import MetricsDate from '../Date'

export default function MonthOverview({calenderArr, currentMonth, months}) {
    
    const getCurrentMonthEntries = (calenderArr, month, months) => {
        let arr = []
        calenderArr.map((entry) => {
            let date = new Date(entry.date)
            if (date.getMonth() === (months.indexOf(currentMonth)) && entry.metrics) arr.push(entry)
        })
        return arr
    }

    const monthArr = getCurrentMonthEntries(calenderArr, currentMonth, months)
    console.log(monthArr)

    const findRoundedTotal = (metric, converter, decimal) => {
        return Math.round(((metric + Number.EPSILON) / converter) * decimal) / decimal
    }

    const findRoundedAvg = (metric, decimal) => {
        return Math.round(((metric / allMetrics.length) + Number.EPSILON) * decimal) / decimal
    }

    let totalWalk = 0
    let totalSM = 0
    let totalMed = 0

    monthArr.map((entry) => {
        entry.metrics.map((metric) => {
            // if (Object.keys())
            if (metric['Walk']) totalWalk += Number(metric.Walk) 
            if (metric['Stoic Meditation']) totalSM += 1
            if (metric['Meditation']) totalMed += Number(metric.Meditation)
        })
    })

    return (
        <div>
            This month...
                {monthArr[0].metrics.map((metric) => {
                    console.log(Object.keys(metric))
                    return <p>{Object.keys(metric)}: {findRoundedTotal(totalWalk, 1, 10)}</p>
                })}
        </div>
    )
}