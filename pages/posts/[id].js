import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DaysMetricData from '../../components/DaysMetricData/DaysMetricData'

export default function DayMetrics() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(async () => {
      setLoading(true)
      const res = await fetch('../api/userData')
      const data = await res.json()
      await setData(data)
      await setLoading(false)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No metrics data</p>

    const id = router.query.id
    console.log(data.userData)

    let metrics = data.userData.find(x => x._id === id)

    console.log(metrics)

    return (
      <>
        <Head>
          <title></title>
        </Head>
        <DaysMetricData metrics={metrics}/>
      </>
    )
  }