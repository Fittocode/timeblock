
export default function MonthOverview({calenderArr, currentMonth, months, metricFilter}) {

    let monthTotals = []
    
    const monthArr = getCurrentMonthEntries(calenderArr, currentMonth, months)

    sortMonthArr(monthArr)

    calculateMonthTotals(monthArr, monthTotals)

    return (
        <div className='month-overview-container'>
            {constructText(metricFilter)}
            {(metricFilter.value) ? constructMetricsOverview(monthArr, monthTotals, findRoundedAvg, 'Minutes', monthArr, 60) : constructMetricsOverview(monthArr, monthTotals, findRoundedTotal, 'Hours', 1, 60)}

            <style jsx>{`

            .month-overview-container {
                max-width: 15rem;
            }

            `}</style>
        </div>
        
    )
}

const constructText = (metricFilter) => {
    let text = (metricFilter.value) ? <p>On a typical day this month when the value of <strong>{metricFilter.name}</strong> is {(!isNaN(metricFilter.value)) ? (metricFilter.condition) ? `${metricFilter.condition} ` : '' : ''}<strong>{metricFilter.value}{(!isNaN(metricFilter.value)) ? ` ${metricFilter.units}` : ''}</strong>, your other metrics average...</p> : <p>This month...</p>
    return <div>{text}</div>
}

const constructMetricsOverview = (monthArr, monthTotals, roundedFigures, unit, divider, timeDivider) => {
    // to make sure it includes most recent metrics
    let mostRecentEntry = monthArr[monthArr.length-1]

    if (monthArr.length > 0) { 
        return mostRecentEntry.metrics.map((metric, index) => {
            let metricName = Object.keys(metric)[0]
            let metricValue = Object.values(metric)[0]
            let metricUnit = Object.values(metric)[1]
            if (metricName) {
                if (metricName === 'Tranquility') {
                    return <p key={metric.date}> {metricName}: {findRoundedAvg(monthTotals[index], monthArr, 10)} Average</p>
                } else return <p key={metric.date}> {metricName}: {roundedFigures(monthTotals[index], divider, 100)} {metric.units}</p>
            }
            if (metric.units) return metric.units
        })
    }
}

// return <p key={metric.date}>
//     {metricName}: {
//         (metricUnit === 'Minutes' && metricValue < 60) ? 
//             `${roundedFigures(monthTotals[index], timeDivider, 10)} ${unit}` : 
//                 `${(metricName === 'Tranquility') ? 
//                     `${findRoundedAvg(monthTotals[index], monthArr, 10)} (Average)` : roundedFigures(monthTotals[index], divider, 100)} ${(metric.units) ? metric.units : ''}`
//         }
//     </p>
// })

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

const getCurrentMonthEntries = (calenderArr, currentMonth, months) => {
    let arr = []
    calenderArr.map((entry) => {
        let date = new Date(entry.date)
        if (date.getMonth() === (months.indexOf(currentMonth)) && entry.metrics) arr.push(entry)
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