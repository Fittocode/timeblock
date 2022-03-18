import React from 'react'
import Link from 'next/link'
import MetricsDate from '../Date'

export default function daysMetricData({metrics, units}) {

    console.log(metrics)
    console.log(units)

    return (
        <>
            <br />
            <div>
                <h3><MetricsDate dateString={metrics.date} /></h3>
                {metrics.metrics.map((metric, index) => {
                    console.log(Object.values(metric))
                    return <div>
                        <p>{Object.keys(metric)}: {Object.values(metric)} {(Object.values(metric) == '') ? 'Null' : ((units.metrics[index].units) ? units.metrics[index].units : '')}</p>
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