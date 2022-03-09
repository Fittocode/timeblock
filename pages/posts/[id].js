import Head from 'next/head'
import DailyMetrics from '../../components/dailyMetrics/dailyMetrics'

export async function getServerSideProps(context) {
    const res = await fetch(`/posts/${context.id}`)
    const metricsData = await res.json()
    return {
      props: {
        metricsData
      }
    }
  }

export default function DayMetrics({ metricsData }) {
    return (
      <>
        <Head>
          <title></title>
        </Head>
        <DailyMetrics metricsData={metricsData} />
      </>
    )
  }