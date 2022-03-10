import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DailyMetrics from '../../components/dailyMetrics/dailyMetrics'
import { setDate } from 'date-fns'

export default function DayMetrics() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(async () => {
      setLoading(true)
      const res = await fetch('../api/metrics')
      const data = await res.json()
      await setData(data)
      await setLoading(false)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No metrics data</p>

    const id = router.query.id
    let metrics = data.metrics.find(x => x._id === id)

    return (
      <>
        <Head>
          <title></title>
        </Head>
        <DailyMetrics {...metrics} />
      </>
    )
  }