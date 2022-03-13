import { useState } from 'react'
import { useRouter } from 'next/router'
import AddMetricForm from '../AddMetricForm/AddMetricForm'

export default function metricsForm({ formId }) {
  const router = useRouter()
  const contentType = 'application/json'

  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    date: '',
    walk: 0,
    stoic_med: true,
    meditation: '0',
    exercise: 'None',
    tranquility: 0,
    deep_work: '',
    freedom_active: true,
    read: '',
    junk_food: false,
    seizure: false,
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
        ...form,
        [name]: value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const errs = formValidate()
      if (Object.keys(errs).length === 0) {
        postMetrics(form)
      } else {
        setErrors({errs})
      }
    }

    const formValidate = () => {
      let err = {}
      if (!form.date) err.date = 'Date is required'
      if (!form.walk) err.walk = 'Walk is required'
      if (!form.stoic_med) err.stoic_med = 'Stoic Meditation is required'
      if (!form.meditation) err.meditation = 'Meditation is required'
      if (!form.exercise) err.exercise = 'Exercise is required'
      if (!form.tranquility) err.tranquility = 'Tranquility is required'
      if (!form.deep_work) err.deep_work = 'Deep Work is required'
      if (!form.freedom_active) err.freedom_active = 'Freedom is required'
      if (!form.read) err.read = 'Reading session is required'
      return err
    }

    return (
      <>
        <form id={formId} onSubmit={handleSubmit}>
            
        </form>
        <br />
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </>
    )
}
