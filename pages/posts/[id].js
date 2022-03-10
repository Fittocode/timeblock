import Head from 'next/head'
import { useEffect, useState } from 'react'
import DailyMetrics from '../../components/dailyMetrics/dailyMetrics'

export default function DayMetrics() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect((req, res) => {
      setLoading(true)
      fetch('../api/metrics')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No metrics data</p>

    console.log(data.metrics)

    return (
      <>
        <Head>
          <title></title>
        </Head>
        <DailyMetrics {...data} />
      </>
    )
  }