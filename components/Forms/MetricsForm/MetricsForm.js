import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function metricsForm({ allMetrics}) {
    const router = useRouter()
    const contentType = 'application/json'

    
  
    // const postData = async (form) => {
    //     try {
    //         const res = await fetch('/api/metrics', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: contentType,
    //                 'Content-Type': contentType
    //             },
    //             body: JSON.stringify(form)
    //         })
    //     } catch(error) {
    //         console.log(error.message)
    //     }
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     postData(form)
    // }

    console.log(allMetrics)

    return (
      <>
       <h2>Metrics</h2>
            <form>
                {allMetrics && allMetrics.map((metric) => {
                    return <div>
                        <p>{metric.name} : {(metric.options.length > 0) ? <select>
                            {metric.options.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>
                            })}
                        </select> : <input name="name"/>
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
