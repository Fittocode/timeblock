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

    allMetrics.map((entry) => {
        totalWalkMiles += Number(entry.walk)
        totalMedMinutes += Number(entry.meditation)
        totalDeepWorkHours += Number(entry.deep_work)
        totalReadMinutes += Number(entry.read)
        avgTranquility += Number(entry.tranquility)
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
    let avgDailyMed = findRoundedAvg(totalMedMinutes, 1)
    let avgDailyReading = findRoundedAvg(totalReadMinutes, 1)
    let avgDailyWalkMiles = findRoundedAvg(totalWalkMiles, 10)
    let avgDailyDW = findRoundedAvg(totalDeepWorkHours, 10)
    avgTranquility = findRoundedAvg(avgTranquility, 10)

    // find all valid exercise days
    let calcCompletionRate = (data, metric, value1, value2, completionNo) => {
        data.map((entry) => {
            if (entry[metric] !== value1 && entry[metric] !== value2) completionNo++
            console.log(entry.freedom_active)
        })
        return Math.round((completionNo / allMetrics.length) * 100) / 100
    }
    
    let exerciseCompletionPercent = calcCompletionRate(allMetrics, 'exercise', 'None', 'Incomplete', exerciseCompletionNo)
    let smCompletionPercent = calcCompletionRate(allMetrics, 'stoic_med', 'false', '', smCompletionNo)
    let freedomActivePercent = calcCompletionRate(allMetrics, 'freedom_active', 'false', '', freedomCompletionNo)
    let medCompletionPercent = calcCompletionRate(allMetrics, 'meditation', '0', '', medCompletionNo)

    console.log(smCompletionPercent)
    console.log(exerciseCompletionPercent)
    console.log(freedomActivePercent)

    // convert from decimal (0.92) to percentage (92)
    const convertToPercentage= (metric) => {
        let percentage
        if (metric == '1') return '100'
        else percentage = metric.toString().split('').splice(2, 2).join('')
        if (percentage.split('').length === 1) percentage += 0
        return percentage
    }

    return (
        <>
            <div>Metrics Overview</div>
            <p>Total Walking Distance: {totalWalkMiles} miles </p>
            <p>Average Daily Walking Distance: {avgDailyWalkMiles} miles</p>
            <p>Daily Stoic Med Completion: {convertToPercentage(smCompletionPercent)}%</p>
            <p>Total Meditation: {totalMedHours} hours</p>
            <p>Daily Meditation Completion: {convertToPercentage(medCompletionPercent)}%</p>
            <p>Daily Exercise Completion: {convertToPercentage(exerciseCompletionPercent)}%</p>
            <p>Total Deep Work: {totalDeepWorkHours} hours</p>
            <p>Average Daily Deep Work: {avgDailyDW} hours</p>
            <p>Daily Active Freedom Rate: {convertToPercentage(freedomActivePercent)}%</p>
            <p>Total Reading: {totalReadHours} Hours</p>
            <p>Average Daily Reading: {avgDailyReading} Minutes</p>
            <p>Average Tranquility: {avgTranquility}</p>
        </>
    )
}