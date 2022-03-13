import React from 'react'
import Link from 'next/link'
import ParentForm from '../../components/Forms/ParentForm/ParentForm'

export default function addMetrics() {
    let metricsArray = []
  
    return (
      <>
        <div>Add Day's Metrics</div>
        <br />
        <ParentForm metricsArray={metricsArray} />
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
      </>
    )
}
