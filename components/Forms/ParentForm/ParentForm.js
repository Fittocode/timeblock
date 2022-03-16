import { useState } from 'react'
import AddMetricForm from '../AddMetricForm/AddMetricForm'
import MetricsForm from '../MetricsForm/MetricsForm'

export default function parentForm ({ metricsArray }) {

    const [allMetricsForm, setAllMetricsForm] = useState({
      metrics: []
    })
   
    const addMetric = (metricsArray, addMetricForm, setAllMetricsForm) => {
      metricsArray.push(addMetricForm)
      setAllMetricsForm({
        metrics: metricsArray
      })
      return metricsArray
    }
    
    console.log(allMetricsForm)

    return (
      <>
        <MetricsForm formId="form-id" metricFormId="add-metrics-form" allMetricsForm={allMetricsForm}/>
      </>
    )
}
