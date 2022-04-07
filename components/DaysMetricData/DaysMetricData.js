import React from 'react'
import Link from 'next/link'
import MetricsDate from '../Date'

export default function daysMetricData({metrics, units}) {

    return (
        <>
            <br />
            <div>
                <h3><MetricsDate dateString={metrics.date} /></h3>
                {metrics.metrics.map((metric, index) => {
                    return <div>
                        <p key={metric.name}>{Object.keys(metric)[0]}: {Object.values(metric)[0]} {(Object.values(metric) == '') ? 'Null' : ((units.metrics[index].units) ? units.metrics[index].units : '')}</p>
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