import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DaysMetricData from '../../components/DaysMetricData/DaysMetricData'

export default function DayMetrics() {

    const [data, setData] = useState(null)
    const [units, setUnits] = useState()
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(async () => {
      setLoading(true)
      const resA = await fetch('../api/userEntries')
      const resB = await fetch('../api/metrics')
      const data = await resA.json()
      const units = await resB.json()
      await setData(data)
      await setUnits(units)
      await setLoading(false)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No metrics data</p>

    const id = router.query.id

    let metrics = data.userEntries.find(x => x._id === id)

    console.log(metrics)

    return (
      <>
        <Head>
          <title></title>
        </Head>
        <DaysMetricData metrics={metrics} units={units}/>
      </>
    )
  }