import { useState } from 'react'
import AddMetric from '../AddMetric/AddMetric'
import MetricsForm from '../MetricsForm/MetricsForm'

export default function parentForm () {

  const [allMetrics, setAllMetrics] = useState([])

  const [newMetric, setNewMetric] = useState({
    name: '',
    options: [],
    units: '',
    required: 'false',
    unique: 'false'
})
    
    const handleMetricSubmit = (e) => {
        e.preventDefault()
        if (newMetric.name !== '' && newMetric.name !== undefined) {
            setAllMetrics(prevState => {
                return [...prevState, newMetric] 
            })
        }
        setNewMetric(prevState => ({...prevState, name: '', options: []}))
    }

    return (
      <>
        <MetricsForm allMetrics={allMetrics} />
        <AddMetric addMetricForm="add-metric-form" newMetric={newMetric} setNewMetric={setNewMetric} handleSubmit={handleMetricSubmit}/>
      </>
    )
}
