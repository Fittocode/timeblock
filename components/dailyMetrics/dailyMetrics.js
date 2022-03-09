import React from 'react'

export default function metricData({ metricsData }) {
    return (
        <>
            <div>Metrics</div>
            <p>{metricsData.walk}</p>
        </>
    )
}