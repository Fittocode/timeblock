import React, { useState } from 'react'
import Calender from '../Calender/Calender'

function SearchBar({entries}) {

    const [metricFilter, setMetricFilter] = useState({name: '', value: '', units: '', condition: ''})

    // for input placeholder 
    const mapUnitToMetricName = (eventValue) => {
        let metrics = entries[0].metrics
        for (let i = 0; i < metrics.length; i++) {
            if (Object.keys(metrics[i])[0] === eventValue) {
                setMetricFilter({...metricFilter, units: metrics[i].units})
                return Object.keys(metrics[i])[0]
            }
        }
    }

    const handleSelectChange = (e) => {
        mapUnitToMetricName(e.target.value)
        let metricName = mapUnitToMetricName(e.target.value)
        setMetricFilter(prevState => ({...prevState, name: metricName}))
    }

    const handleInputChange = (e, key) => {
        if (metricFilter.condition === 'at least' || metricFilter.condition === 'less than') {
            setMetricFilter(prevState => ({...prevState, [key]: ''}))
        } else {
            setMetricFilter(prevState => ({...prevState, [key]: e.target.value}))
        }
    }


  return (
    <div>
        <form>
            <label htmlFor="" />Find Days by Metric: {' '}
            <select name="metrics" onChange={handleSelectChange}>
                <option value=''></option>
                {entries[0].metrics.map(metric => {
                    let metricName = Object.keys(metric)[0]
                    return <option key={metricName} value={metricName}>{metricName}</option>
                })}
            </select>{' '}
            <input type="text" placeholder={metricFilter.units} onChange={(e) => handleInputChange(e, 'value')} />{' '}
            <input type="checkbox" id="at-least" name="at least" value="at least" onChange={(e) => handleInputChange(e, 'condition')} />
            <label for="at-least">at least</label>{' '}
            <input type="checkbox" id="less-than" name="less than" value="less than" onChange={(e) => handleInputChange(e, 'condition')} />
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