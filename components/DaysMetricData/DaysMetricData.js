import React from 'react'
import Link from 'next/link'
import MetricsDate from '../Date'

export default function daysMetricData({metrics}) {

    console.log(metrics)

    return (
        <>
            <br />
            <div>
                <h3><MetricsDate dateString={metrics.date} /></h3>
                {metrics.metrics.map((metric) => {
                    return <div>
                        {Object.keys(metric)}: {Object.values(metric)}
                    </div>
                })}
            </div>
            <br />
            <Link href="/">
                <a>Home</a>
            </Link>
        </>
    )
}