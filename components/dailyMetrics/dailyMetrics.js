import React from 'react'

export default function metricData({ metricData }) {
    return (
        <>
            <div>Metrics</div>
            <p>{metricData.walk}</p>
        </>
    )
}