import { useState } from 'react'

export default function MonthOverview({calenderArr, currentMonth, months, metricFilter, entries}) {

    let currentMonthTotals = []
    let lastMonthTotals = []
    
    // get current month entries
    const currentMonthEntries = getMonthEntries(calenderArr, 0, currentMonth, months)
    // get previous month entries
    const prevMonthEntries = getMonthEntries(entries, 1, currentMonth, months)

    sortMonthArr(currentMonthEntries)

    // calculate current month metrics
    calculateMonthTotals(currentMonthEntries, currentMonthTotals)
    // caculate previous month entries
    calculateMonthTotals(prevMonthEntries, lastMonthTotals)

    const arrows = compareMonthTotals(currentMonthTotals, lastMonthTotals, currentMonthEntries, prevMonthEntries)

    return (
        <div className='month-overview-container'>
            {renderIntro(metricFilter)}
            {(metricFilter.value) ? renderMetricsOverview(currentMonthEntries, currentMonthTotals, findRoundedAvg, currentMonthEntries, arrows) : renderMetricsOverview(currentMonthEntries, currentMonthTotals, findRoundedTotal, 1, arrows)}

            <style jsx>{`

            .month-overview-container {
                max-width: 19rem;
            }

            `}</style>
        </div>
        
    )
}

// functions

const compareMonthTotals = (currentMonthTotals, lastMonthTotals, currentMonthEntries, prevMonthEntries) => {
    let arr = []
    const arrow = (arrowColor, arrowDir, i) => {
        return <span style={{color: arrowColor}}>{arrowDir} ({findRoundedAvg(currentMonthTotals[i], currentMonthEntries, 10)})</span>
    }

    for (let i = 0; i < currentMonthTotals.length; i++) {
        if ((currentMonthTotals[i] / currentMonthEntries.length) > (lastMonthTotals[i] / prevMonthEntries.length)) {
            arr.push(arrow('rgb(0, 195, 117)', '⬆', i))
        } else if ((currentMonthTotals[i] / currentMonthEntries.length) == (lastMonthTotals[i] / prevMonthEntries.length)) {
            arr.push(arrow('rgb(0, 0, 0)', '=', i))
        } else {
            arr.push(arrow('rgb(237, 31, 9)', '⬇', i))
        }
    }
    return arr
}

const renderIntro = (metricFilter) => {
    let text = (metricFilter.value) ? <p>On a typical day this month when the value of <strong>{metricFilter.name}</strong> is {(!isNaN(metricFilter.value)) ? (metricFilter.condition) ? `${metricFilter.condition} ` : '' : ''}<strong>{metricFilter.value}{(!isNaN(metricFilter.value)) ? ` ${metricFilter.units}` : ''}</strong>, your other metrics average...</p> : <p>This month...</p>
    return <div>{text}</div>
}

const renderMetricsOverview = (monthArr, monthTotals, roundedFigures, divider, arrows) => {
    // to make sure it includes most recent metrics
    let mostRecentEntry = monthArr[monthArr.length-1]

    if (monthArr.length > 0) { 
        return mostRecentEntry.metrics.map((metric, index) => {
            let metricName = Object.keys(metric)[0]
            if (metricName) {
                if (metricName === 'Tranquility') {
                    return <p key={metric.date}> {metricName}: {findRoundedAvg(monthTotals[index], monthArr, 10)} Average {arrows[index]}</p>
                } else return <p key={metric.date}> {metricName}: {roundedFigures(monthTotals[index], divider, 100)} {metric.units} {arrows[index]}</p>
            }
            if (metric.units) return metric.units
        })
    }
}

const roundNum = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const findRoundedTotal = (metric, converter, decimal) => {
    return Math.round(((metric + Number.EPSILON) / converter) * decimal) / decimal
}

const findRoundedAvg = (metric, monthArr, decimal) => {
    return Math.round(((metric / monthArr.length) + Number.EPSILON) * decimal) / decimal
}

const sortMonthArr = (monthArr) => {
    monthArr.sort(function(a, b) {
        return a.metrics.length - b.metrics.length
    })
}

const getMonthEntries = (entries, minusValue, currentMonth, months) => {
    let arr = []
    entries.map((entry) => {
        let date = new Date(entry.date)
        if (date.getMonth() === (months.indexOf(currentMonth) - minusValue) && entry.metrics) arr.push(entry)
    })
    return arr
}

const calculateMonthTotals = (monthArr, monthTotals) => {

    if (monthArr.length > 0) {
        monthArr[monthArr.length-1].metrics.map(() => {
            monthTotals.push(0)
        })
    }

    monthArr.map((entry) => {
        entry.metrics.map((metric, index) => {
            let value = Object.values(metric)[0]
            if (!isNaN(value)) monthTotals[index] += Number(value)
            else if (value !== undefined && value !== 'False' && value !== 'No Data') monthTotals[index] += 1
        })
    })

    return monthTotals
}