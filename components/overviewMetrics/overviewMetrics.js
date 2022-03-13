import React from 'react'

export default function overviewMetrics({ allMetrics }) {
    
    let totalWalkMiles = 0
    let totalMedMinutes = 0
    let totalDeepWorkHours = 0
    let totalReadMinutes = 0
    let avgTranquility = 0
    let exerciseCompletionNo = 0
    let smCompletionNo = 0
    let freedomCompletionNo = 0
    let medCompletionNo = 0
    let totalJunkDays = 0
    let totalSeizures = 0

    allMetrics.map((entry) => {
        totalWalkMiles += Number(entry.walk)
        totalMedMinutes += Number(entry.meditation)
        totalDeepWorkHours += Number(entry.deep_work)
        totalReadMinutes += Number(entry.read)
        avgTranquility += Number(entry.tranquility)
        if (entry.seizure === 'true') totalSeizures++
    })
    
    const findRoundedTotal = (metric, converter, decimal) => {
        return Math.round(((metric + Number.EPSILON) / converter) * decimal) / decimal
    }

    const findRoundedAvg = (metric, decimal) => {
        return Math.round(((metric / allMetrics.length) + Number.EPSILON) * decimal) / decimal
    }

    // find rounded total
    let totalMedHours = findRoundedTotal(totalMedMinutes, 60, 10)
    let totalReadHours = findRoundedTotal(totalReadMinutes, 60, 10)
    totalWalkMiles = findRoundedTotal(totalWalkMiles, 1, 10)

    // find rounded avg
    let avgDailyReading = findRoundedAvg(totalReadMinutes, 1)
    let avgDailyWalkMiles = findRoundedAvg(totalWalkMiles, 10)
    let avgDailyDW = findRoundedAvg(totalDeepWorkHours, 10)
    avgTranquility = findRoundedAvg(avgTranquility, 10)

    // find percentage of days where metric completed/valid
    let calcCompletionRate = (data, metric, value1, value2, completionNo) => {
        let possibleEntries = 0
        completionNo = 0
        data.map((entry) => {
            if (entry[metric] !== value1 && entry[metric] !== value2) completionNo++
            if (entry[metric] !== undefined) possibleEntries++
        })
        return Math.round((completionNo / possibleEntries) * 100) / 100
    }
    
    let exerciseCompletionPercent = calcCompletionRate(allMetrics, 'exercise', 'None', 'Incomplete', exerciseCompletionNo)
    let smCompletionPercent = calcCompletionRate(allMetrics, 'stoic_med', 'false', '', smCompletionNo)
    let freedomActivePercent = calcCompletionRate(allMetrics, 'freedom_active', 'false', '', freedomCompletionNo)
    let medCompletionPercent = calcCompletionRate(allMetrics, 'meditation', '0', '', medCompletionNo)
    let junkFoodCompletionPercent = calcCompletionRate(allMetrics, 'junk_food', 'true', undefined, totalJunkDays)

    // convert from decimal (0.92) to percentage (92)
    const convertToPercentage = (metric) => {
        let percentage = 0
        if (metric == '1') return '100'
        else percentage = metric.toString().split('').splice(2, 2).join('')
        if (percentage.split('').length === 1) percentage += 0
        return percentage
    }

    return (
        <>
            {/* <div>Metrics Overview</div>
            <p>You rate your daily tranquility a {avgTranquility} out of 10 on average</p>
            <p>You have walked {totalWalkMiles} miles in total for an average of {avgDailyWalkMiles} miles per day</p>
            <p>You have completed {totalDeepWorkHours} hours of deep work in total for an average of {avgDailyDW} hours per day</p>
            <p>You have spent {totalReadHours} hours in total reading books for an average of {avgDailyReading} minutes per day</p>
            <p>You meditate on {convertToPercentage(medCompletionPercent)}% of days, totaling {totalMedHours} hours</p>
            <p>You complete a stoic meditation on {convertToPercentage(smCompletionPercent)}% of days</p>
            <p>You complete your exercise on {convertToPercentage(exerciseCompletionPercent)}% of days</p>
            <p>You keep Freedom active on {convertToPercentage(freedomActivePercent)}% of days</p>
            <p>You abstain from junk food (chips, sweets) on {convertToPercentage(junkFoodCompletionPercent)}% of days.</p>
            <p>You've had {totalSeizures} seizure.</p> */}
        </>
    )
}