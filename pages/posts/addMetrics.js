import React from 'react'
import Link from 'next/link'
import AddMetric from '../../components/AddMetric'

export default function addMetrics() {
  
    return (
      <>
        <AddMetric addMetricForm="add-metric-form" />
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
      </>
    )
}
