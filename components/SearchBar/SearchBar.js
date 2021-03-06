import React, { useState } from 'react'
import Calender from '../Calender/Calender'

function SearchBar({entries, metrics}) {

    const [metricFilter, setMetricFilter] = useState({name: '', value: '', units: '', condition: 'at least'})

    // for input placeholder 
    const mapUnitToMetricName = (eventValue) => {
        if (entries.length > 0) {
            let metrics = entries[0].metrics
            for (let i = 0; i < metrics.length; i++) {
                if (Object.keys(metrics[i])[0] === eventValue) {
                    setMetricFilter({...metricFilter, units: metrics[i].units})
                    return Object.keys(metrics[i])[0]
                }
            }
        }
    }

    const handleSelectChange = (e) => {
        mapUnitToMetricName(e.target.value)
        let metricName = mapUnitToMetricName(e.target.value)
        setMetricFilter(prevState => ({...prevState, name: metricName}))
    }

    const handleInputChange = (e, key) => {
        setMetricFilter(prevState => ({...prevState, [key]: e.target.value}))

        if (e.target.value === 'at least') {
            if (metricFilter.condition === 'at least') setMetricFilter(prevState => ({...prevState, condition: ''}))
            else setMetricFilter(prevState => ({...prevState, condition: 'at least'}))
        }
        if (e.target.value === 'less than') {
            if (metricFilter.condition === 'less than') setMetricFilter(prevState => ({...prevState, condition: ''}))
            else setMetricFilter(prevState => ({...prevState, condition: 'less than'}))
        }
    }

  return (
    <div>
        <form>
            <label />Find Days by Metric: {' '}
            <select name="metrics" onChange={handleSelectChange}>
                <option value=''></option>
                {(metrics) ? metrics.map(metric => {
                    let metricName = metric.name
                    return <option key={metricName} value={metricName}>{metricName}</option>
                }) : ''}
            </select>{' '}
            <input type="text" placeholder={metricFilter.units} onChange={(e) => handleInputChange(e, 'value')} />{' '}
            <input type="checkbox" id="at-least" name="at least" value="at least" checked={metricFilter.condition === 'at least'} onChange={(e) => handleInputChange(e, 'condition')} />
            <label for="at-least">at least</label>{' '}
            <input type="checkbox" id="less-than" name="less than" value="less than" checked={metricFilter.condition === 'less than'} onChange={(e) => handleInputChange(e, 'condition')} />
            <label for="less-than">less than</label>
        </form>
        <Calender entries={filterEntries(entries, metricFilter)} metricFilter={metricFilter}/>
    </div>
  )
}

export default SearchBar


const convertToLowerCase = (value) => {
    if (value !== undefined) {
        if (!isNaN(value)) return value
        else {
            for (let i = 0; i < value.length; i++) {
                if (isNaN(value[0])) return value.toLowerCase()
            }
        }
    }
    else return undefined
}

// filter entries based on metric input
const filterEntries = (entries, metricState) => {
    let filteredEntries = entries.filter((entry) => entry.metrics.some(metric => {
        // consider checkbox conditions for number values
        let metricValue = convertToLowerCase(metric[metricState.name])
        let inputValue = convertToLowerCase(metricState.value)
        for (let i = 0; i < metricState.value.length; i++) {
            if (metricState.condition === 'at least' && !isNaN(inputValue)) return metricValue >= inputValue
            if (metricState.condition === 'less than' && !isNaN(inputValue)) return metricValue < inputValue
            if (metricValue !== undefined && metricValue[i] === inputValue[i]) return metricValue.indexOf(inputValue) !== -1
        }
    }))
    if (!metricState.value) return entries
    else return filteredEntries
}