import Head from 'next/head'
import Link from 'next/link'
import MetricsDate from '../components/Date'
import OverviewMetrics from '../components/overviewMetrics/overviewMetrics'
import connectDB from '../lib/mongodb' 
import userDataDB from '../models/UserMetrics.models'
require('../models/Metric.models')

export default function Home({ entries }) {

  // const deleteHandler = (index) => {
  //   entries.splice(1, index)
  // }

  const cardColorPicker = (number) => {
    if (number > 8) return 'card-color-excellent'
    if (number <= 8 && number > 7) return 'card-color-good'
    if (number <= 7 && number >= 5.5) return 'card-color-fair'
    if (number < 5.5 && number >= 4) return 'card-color-poor'
    else return 'card-color-awful'
  }

  entries.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date)
  }).reverse()
  
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
          {entries.map((entry, index) => (
            // 10-8.5, 8.4-7.1, 7-6, 5.9-4.5, 4.4-0 

              <div className={`card ${cardColorPicker(entry.metrics[4].Tranquility)}`}>
              <Link key={entry._id} href={{pathname: "/posts/[id]", query: {id: entry._id}}} as={`/posts/${entry._id}`}>
                <a>
                  <MetricsDate dateString={entry.date} /> 
                </a>
              </Link>
              <br />
              {/* <p>Tranquility: {entry.metrics[4].Tranquility}</p> */}
            </div>
          ))}
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

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: .1rem;
          flex-basis: 45%;
          background: white;
          padding: .5rem;
          width: 10rem;

          text-align: left;
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card-color-excellent {
          background-color: rgba(0, 225, 134, 0.8)
        }

        .card-color-good {
          background-color: rgba(195, 255, 100, 0.8)
        }

        .card-color-fair {
          background-color: rgba(255, 235, 120, 0.8)
        }

        .card-color-poor {
          background-color: rgba(255, 138, 72, 0.8)
        }

        .card-color-awful {
          background-color: rgba(255, 104, 86, 0.8)
        }

        /* .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        } */

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
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