import { useState } from 'react'
import { useRouter } from 'next/router'

export default function metricsForm({ formId, allMetricsForm }) {
  const router = useRouter()
  const contentType = 'application/json'

  const [errors, setErrors] = useState()

  const [form, setForm] = useState({
    metrics: []
  })

    const postMetrics = async (form) => {
      try {
        const res = await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(form)
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
      setForm({
        metrics: allMetricsForm
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      postMetrics(form)
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

    console.log(allMetricsForm)

    return (
      <>
        <form id={formId} onSubmit={handleSubmit}>
          {allMetricsForm.metrics.map((metric, index) => {
            return <div>
              {metric.name}{' '}
              {(metric.input.type === 'single') ? 
              <label htmlFor="input">
                <input name="input" value={form.metrics[index]} onChange={handleChange} />
              </label>
           : '' }
              </div>
          })}
        </form>
        <button>Submit</button>
        <br />
        <div>
          {/* {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))} */}
        </div>
      </>
    )
}
