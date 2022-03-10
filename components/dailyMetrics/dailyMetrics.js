import React from 'react'
import MetricsDate from '../../components/date'

export default function metricData({...data}) {
    let metrics = data.metrics
    console.log(data.metrics)
    return (
        <>
            <div>Metrics</div>
            <br />
            <div>{metrics.map((metric) => (
                <div>
                    <MetricsDate dateString={metric.date} />
                    <p>Tranquility: {metric.tranquility}</p>
                    <p>Walk: {metric.walk} miles</p>
                    <p>Stoic Meditation: {metric.stoic_med.toString()}</p>
                    <p>Meditation: {metric.meditation} minutes</p>
                    <p>Exercise: {metric.exercise[0].kind} for {metric.exercise[0].duration} minutes</p>
                    <p>Deep Work: {metric.deep_work} hours</p>
                    <p>Freedom active? {metric.freedom_active.toString()}</p>
                    <p>Read: {metric.read} minutes</p>
                </div>
            ))}</div>
        </>
    )
}