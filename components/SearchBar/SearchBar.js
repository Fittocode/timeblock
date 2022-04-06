import React, { useState } from 'react'

function SearchBar({entries}) {
    const [selectedMetric, setSelectedMetric ] = useState(entries[0].metrics[0].units)

    const handleChange = (e) => {
        let metrics = entries[0].metrics
        for (let i = 0; i < metrics.length; i++) {
            if (Object.keys(metrics[i])[0] === e.target.value) {
                setSelectedMetric(metrics[i].units)
            }
        }
    }

  return (
    <div>
        <form>
            <label htmlFor="" />Search By Metric: {' '}
            <select name="metrics" onChange={handleChange}>
                {entries[0].metrics.map(metric => {
                    let metricName = Object.keys(metric)[0]
                    return <option key={metricName} value={metricName}>{metricName}</option>
                })}
            </select>{' '}
            <input type="text" placeholder={selectedMetric} />{' '}
        </form>
    </div>
  )
}

export default SearchBar