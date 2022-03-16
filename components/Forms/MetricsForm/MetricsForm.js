
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function metricsForm({ allMetrics, setValueData, valueData, valueArr, setMetricsForm }) {
    const router = useRouter()
    const contentType = 'application/json'
  
    const postUserData = async (metricsForm) => {
        try {
            const res = await fetch('/api/userData', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType
                },
                body: JSON.stringify(metricsForm)
            })
        } catch(error) {
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setValueData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(allMetrics)
        allMetrics.map((metric, index) => {
            console.log(valueArr[index])
            setMetricsForm(prevState => ({
                ...prevState,
                metrics: [
                    ...prevState.metrics,
                    {
                        name: metric.name,
                        data_value: valueData[index],
                    }
                ]
            }))
            console.log(metricsForm)
          })
        postUserData(metricsForm)
    }

    return (
      <>
       <h2>Metrics</h2>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="date">Date: {' '}
                    <input type="date"/>
                </label> */}
                {allMetrics && allMetrics.map((metric) => {
                    return <div>
                        <p>{metric.name} : {(metric.options.length > 0) ? <select name={metric.name} onChange={handleChange}>
                            {metric.options.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>
                            })}
                        </select> : <input name={metric.name} onChange={handleChange}/>
                        } {(metric.units) ? metric.units : ''}{(metric.required) ? ' (Required)' : ''}
                        </p>
                    </div>
                    })
                }
                <button type="submit">Submit</button>
            </form>
      </>
    )
}
