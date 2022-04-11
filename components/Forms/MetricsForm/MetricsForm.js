
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function metricsForm({ allMetrics }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm()
    const [userData, setUserData] = useState({
        date: '',
        metrics: []
    })
    const contentType = 'application/json'
  
    const postUserData = async (userData) => {
        try {
            const res = await fetch('/api/userEntries', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType
                },
                body: JSON.stringify(userData)
            })
            router.push('/')
        } catch(error) {
            console.log(error.message)
        }
    }

    
    // push data object properties into array of property objects
    const createDataArr = (formData, allMetrics) => {
        let formDataArr = []
        // loop through formData push to formDataArr
        for (let metric in formData) {
            if (metric === 'date') {
                setUserData(prevState => ({
                    ...prevState,
                    date: formData[metric]
                }))
                continue;
            }
            formDataArr.push({[metric]: formData[metric] })
        }
        // loop through length of allMetrics, push formData and allMetrics units to new arr
        let dataArr = []
        for (let i = 0; i < allMetrics.length; i++) {
            dataArr.push({[Object.keys(formDataArr[i])]: Object.values(formDataArr[i])[0], units: allMetrics[i].units})
        }
        return dataArr
    }
    
    const onSubmit = (formData) => {
        let dataArr = createDataArr(formData, allMetrics)
        setUserData(prevState => ({
            ...prevState,
            metrics: dataArr
        }))
    }
    
    if (userData.metrics.length > 0) {
        console.log(userData)
        postUserData(userData)
    }


    return (
      <>
       <h2>Metrics</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="date">Date: {' '}
                    <input type="text" {...register('date')} placeholder='MM-DD-YYYY' required />
                </label>
                {allMetrics && allMetrics.map((metric) => {
                    return <div>
                        <p>{metric.name} : {(metric.options.length > 0) ? <select {...register(metric.name)} >
                            {metric.options.map((option) => {
                                return <option key={option.name} value={option.name}>{option.name}</option>
                            })}
                        </select> : (metric.required === 'true') ? <input {...register(metric.name)} required /> : <input {...register(metric.name)} />
                        } {(metric.units) ? metric.units : ''}
                        </p>
                    </div>
                    })
                }
                <button type="submit">Submit</button>
            </form>
      </>
    )
}
