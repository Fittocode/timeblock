import { useState } from 'react'
import { useRouter } from 'next/router'

export default function metricsForm({ formId, allMetricsForm }) {
  const router = useRouter()
  const contentType = 'application/json'

  const [errors, setErrors] = useState()

  const schema = {} 
  allMetricsForm.metrics.map((metric, index) => {
    schema[metric.name] = ''
  })

  const [createdForm, setCreatedForm] = useState(schema)
  console.log(schema)

    const postMetrics = async (createdForm) => {
      console.log('test')
      try {
        console.log('test')
        const res = await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(createdForm)
        })
        if (!res.ok) {
          throw new Error(res.status)
        }
        router.push('/')
      } catch(error) {
        console.log(error.message)
      }
    }

    const handleChange = (e) => {
      const target = e.target
      const value = target.value
      const name = target.name
      setCreatedForm({
        [name]: value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      postMetrics(createdForm)
    }

    // const formValidate = () => {
    //   let err = {}
    //   if (!form.date) err.date = 'Date is required'
    //   if (!form.walk) err.walk = 'Walk is required'
    //   if (!form.stoic_med) err.stoic_med = 'Stoic Meditation is required'
    //   if (!form.meditation) err.meditation = 'Meditation is required'
    //   if (!form.exercise) err.exercise = 'Exercise is required'
    //   if (!form.tranquility) err.tranquility = 'Tranquility is required'
    //   if (!form.deep_work) err.deep_work = 'Deep Work is required'
    //   if (!form.freedom_active) err.freedom_active = 'Freedom is required'
    //   if (!form.read) err.read = 'Reading session is required'
    //   return err
    // }

    console.log(allMetricsForm.metrics)

    return (
      <>
        <form id={formId} onSubmit={handleSubmit}>
          {(allMetricsForm.metrics.length > 0) ? 
            allMetricsForm.metrics.map((metric, index) => {
              return <div>
                {metric.name}{' '}
                {(metric.input.type === 'single') ? 
                <label htmlFor={metric.name}>
                  <input name={metric.name} onChange={handleChange} />
                </label>
            : '' }
            {(allMetricsForm.metrics) ? <button>Submit</button> : ''}
                </div>
            }) : ''
        }
        </form>
        <br />
        <div>
          {/* {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))} */}
        </div>
      </>
    )
}
