
export default function MonthOverview({calenderArr, currentMonth, months}) {

    let monthTotals = []
    
    const monthArr = getCurrentMonthEntries(calenderArr, currentMonth, months)

    sortMonthArr(monthArr)

    calculateMonthTotals(monthArr, monthTotals)

    return (
        <div>
            <p>This month...</p>
            {(monthArr.length > 0) ? 
                monthArr[monthArr.length-1].metrics.map((metric, index) => {
                    return <p key={metric.date}>
                        {Object.keys(metric)[0]}: {
                            (Object.values(metric)[1] === 'Minutes' && Object.values(metric)[0] < 60) ? 
                                `${findRoundedTotal(monthTotals[index], 60, 10)} Hours` : 
                                    `${(Object.keys(metric)[0] === 'Tranquility') ? 
                                        `${findRoundedAvg(monthTotals[index], monthArr, 10)} (Average)` : findRoundedTotal(monthTotals[index], 1, 100)} ${(metric.units) ? metric.units : ''}`
                            }
                        </p>
                }) : ''
            }
        </div>
    )
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