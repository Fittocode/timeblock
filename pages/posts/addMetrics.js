import React from 'react'
import Link from 'next/link'
import AddMetricsForm from '../../components/addMetricsForm/addMetricsForm'

export default function addMetrics() {
  
    return (
      <>
        <div>Add Day's Metrics</div>
        <br />
        <AddMetricsForm />
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
      </>
    )
}
