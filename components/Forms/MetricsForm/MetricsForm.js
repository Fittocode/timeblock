
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

export default function metricsForm({ allMetrics }) {
    const router = useRouter()
    const { register, handleSubmit } = useForm()
    const [formData, setFormData] = useState('')
    const [userData, setUserData] = useState({
        date: '',
        metrics: []
    })
    const contentType = 'application/json'
  
    const postUserData = async (userData) => {
        try {
            const res = await fetch('/api/userData', {
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
    const createDataArr = (formData) => {
        let dataArr = []
        for (let metric in formData) {
            if (metric === 'date') {
                console.log(formData[metric])
                setUserData(prevState => ({
                    ...prevState,
                    date: formData[metric]
                }))
                continue
            }
            dataArr.push({[metric]: formData[metric]})
        }
        return dataArr
    }
    
    const onSubmit = (formData) => {
        setFormData(formData)
        let dataArr = createDataArr(formData)
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
                    <input type="text" {...register('date')} required />
                </label> (MM-DD-YYY)
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
