import { useEffect, useState } from 'react'

import AddMetric from '../AddMetric/AddMetric'
import MetricsForm from '../MetricsForm/MetricsForm'

export default function parentForm ({ }) {
  
  const contentType = 'application/json'

  const [allMetrics, setAllMetrics] = useState([])

  const [valueData, setValueData] = useState([])

  const [metricsForm, setMetricsForm] = useState({
    date: Date.now,
    metrics: []
  })

  const valueArr = Object.values(valueData)

  const [newMetric, setNewMetric] = useState({
    name: '',
    options: [],
    units: '',
    required: false,
    unique: false
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/api/metrics', {
          method: 'GET',
          headers: {
            Accept: contentType,
            'Content-Type': contentType
          },
        })
        const json = await res.json()
        setAllMetrics(json.metrics)
        json.metrics.map((metric) => {
          setMetricsForm(prevState => ({
              ...prevState,
              metrics: [
                  ...prevState.metrics,
                  {
                      name: metric.name,
                      data_value: '',
                  }
              ]
          }))
          console.log(metricsForm)
        })
        console.log(json.metrics)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  }, [])
  
  // posts new metric to database
  const postMetric = async (newMetric) => {
      try {
          const res = await fetch('/api/metrics', {
              method: 'POST',
              headers: {
                  Accept: contentType,
                  'Content-Type': contentType
              },
              body: JSON.stringify(newMetric)
          })
      } catch(error) {
          console.log(error.message)
      }
  }
  
  // call function posting new metric to database, resets new metric values
  const handleMetricSubmit = (e) => {
    console.log('Metric Submit')
      e.preventDefault()
      postMetric(newMetric)
      setNewMetric(prevState => ({...prevState, name: '', options: []}))
  }

  return (
    <>
      <MetricsForm allMetrics={allMetrics} setValueData={setValueData} valueData={valueData} valueArr={valueArr} setMetricsForm={setMetricsForm}/>
      <AddMetric addMetricForm="add-metric-form" newMetric={newMetric} setNewMetric={setNewMetric} handleSubmit={handleMetricSubmit}/>
    </>
  )
}