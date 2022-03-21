import Head from 'next/head'
import Link from 'next/link'
import OverviewMetrics from '../components/overviewMetrics/overviewMetrics'
import Calender from '../components/calender/Calender'
import connectDB from '../lib/mongodb' 
require('../models/Metric.models')

export default function Home({ entries }) {

  return (
    <div className="container">
      <Head>
        <title>Timeblock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Daily Metrics
        </h1>

        <p className="description">
          Track and Display your Metrics Over Time
        </p>
        <Link href='/posts/addMetrics'>
          <a>Add Metrics</a>
        </Link>
        <br />
        <Calender entries={entries}/>
          <br />
        {/* <OverviewMetrics allMetrics={allMetrics} /> */}
      </main>

      <footer>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        li {
          display: inline-block;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .entryBox {
          border: 1px solid black;
          padding: .75rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

/* Retrieves metrics data from mongodb database */
export async function getServerSideProps() {
  await connectDB()

  /* find all the data in our database */
  const dbData = await fetch('http://localhost:3000/api/userData')
  const data = await dbData.json()
  
  return { props: { entries: data.userData } }
}