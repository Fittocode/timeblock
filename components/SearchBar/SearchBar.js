import React, { useState } from 'react'

function SearchBar({entries}) {

    const [selectedMetric, setSelectedMetric ] = useState('')
    const [metricFilter, setMetricFilter] = useState({name: '', value: ''})

    // for input placeholder 
    const mapUnitToMetricName = (eventValue) => {
        let metrics = entries[0].metrics
        for (let i = 0; i < metrics.length; i++) {
            if (Object.keys(metrics[i])[0] === eventValue) {
                setSelectedMetric(metrics[i].units)
                return Object.keys(metrics[i])[0]
            }
        }
    }

    // filter entries based on metric input
    const filterEntries = (entries, metricState) => {
        let filteredEntries = entries.filter((entry) => entry.metrics.some(metric => {
            return metric[metricState.name] === metricState.value
        }))
        return filteredEntries
    }

    const handleSelectChange = (e) => {
        mapUnitToMetricName(e.target.value)
        let metricName = mapUnitToMetricName(e.target.value)
        setMetricFilter({...metricFilter, name: metricName})
    }

    const handleInputChange = (e) => {
        setMetricFilter({...metricFilter, value: e.target.value})
    }


  return (
    <div>
        <form>
            <label htmlFor="" />Search By Metric: {' '}
            <select name="metrics" onChange={handleSelectChange}>
                <option value=''></option>
                {entries[0].metrics.map(metric => {
                    let metricName = Object.keys(metric)[0]
                    return <option key={metricName} value={metricName}>{metricName}</option>
                })}
            </select>{' '}
            <input type="text" placeholder={selectedMetric} onChange={handleInputChange} />{' '}
        </form>
        {filterEntries(entries, metricFilter).map((entry) => {
            return <li key={entry.date}>{entry.date}</li>
        })}
    </div>
  )
}

export default SearchBar