import React from 'react'
import Link from 'next/link'
import MetricsDate from '../../components/date'

export default function metricData({...metrics}) {

    return (
        <>
            <div>Metrics</div>
            <br />
                <div>
                    <MetricsDate dateString={metrics.date} />
                    <p>Tranquility: {metrics.tranquility}</p>
                    <p>Walk: {metrics.walk} miles</p>
                    <p>Stoic Meditation: {metrics.stoic_med.toString()}</p>
                    <p>Meditation: {metrics.meditation} minutes</p>
                    <p>Exercise: {metrics.exercise[0].kind} for {metrics.exercise[0].duration} minutes</p>
                    <p>Deep Work: {metrics.deep_work} hours</p>
                    <p>Freedom active? {metrics.freedom_active.toString()}</p>
                    <p>Read: {metrics.read} minutes</p>
                </div>
            <Link href="/">
                <a>Home</a>
            </Link>
        </>
    )
}