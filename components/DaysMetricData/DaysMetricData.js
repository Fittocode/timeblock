import React from 'react'
import Link from 'next/link'
import MetricsDate from '../Date'

export default function daysMetricData({...metrics}) {

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
                    <p>Exercise: {metrics.exercise}</p>
                    <p>Deep Work: {metrics.deep_work} hours</p>
                    <p>Freedom active: {metrics.freedom_active.toString()}</p>
                    <p>Read: {metrics.read} minutes</p>
                    <p>Junk food: {(metrics.junk_food) ? metrics.junk_food.toString() : 'false'}</p>
                    <p>Seizure: {(metrics.seizure) ? metrics.seizure.toString() : 'false'}</p>
                </div>
            <Link href="/">
                <a>Home</a>
            </Link>
        </>
    )
}