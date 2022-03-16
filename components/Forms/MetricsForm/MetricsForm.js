import { useState } from 'react'

export default function metricsForm({ allMetrics }) {
  
    const handleFormSubmit = () => {
        
    }

    return (
      <>
       <h2>Metrics</h2>
            <form onSubmit={handleFormSubmit}>
                {allMetrics.map((metric) => {
                    return <div key={metric.name}>
                                <p>{metric.name}: {(metric.options.length > 0) ? <select>
                                    {metric.options.map((option) => {
                                        return <option key={option.name} value={option.name}>{option.name}</option>
                                    })}
                                </select> : <input name="name"/>
                                } {(metric.units) ? metric.units : ''} 
                                </p>
                            </div>
                })}
                <button type="submit">Submit</button>
            </form>
      </>
    )
}
