import { useState } from 'react'
import { useRouter } from 'next/router'
import NewMetricForm from '../newMetricForm/newMetricForm'

export default function addMetricsForm({ formId }) {
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

          <label htmlFor='date'>Date: {' '}
            <input type="text" name="date" value={form.date} placeholder='m/dd/yy' onChange={handleChange} required/>
          </label>
          <br />
          <label htmlFor='walk'>Walk: {' '}
            <input type="number" name="walk" value={form.walk} placeholder='Miles' onChange={handleChange} required/>
          </label>
          <br />
          <label htmlFor='stoic_med'>Stoic Meditation: {' '}
            <select value={form.stoic_med} name="stoic_med" onChange={handleChange} required>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          <br />
          <label htmlFor='meditation'>Mindfulness Meditation: {' '}
            <select value={form.meditation} name="meditation" onChange={handleChange} required>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
          <br />
          <label htmlFor='exercise'>Exercise: {' '}
            <select name="exercise" value={form.exercise} onChange={handleChange} required>
              <option value="None">None</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Simple and Sinister">Simple and Sinister</option>
              <option value="Sprints">Sprints</option>
              <option value="Climb">Climb</option>
              <option value="Z2 Run">Z2 Run</option>
              <option value="Jump Rope">Jump Rope</option>
              <option value="Calisthenics">Calisthenics</option>
            </select>

          </label>
          <br />
          <label htmlFor='deep_work'>Deep Work: {' '}
            <input type="number" name="deep_work" value={form.deep_work} onChange={handleChange} required/>
          </label>
          <br />
          <label htmlFor='freedom_active'>Freedom active: {' '}
            <select value={form.freedom_active} name="freedom_active" onChange={handleChange} required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <br />
          <label htmlFor='read'>Read: {' '}
            <input type="number" name="read" value={form.read} placeholder='Minutes' onChange={handleChange} required/>
          </label>
          <br />
          <label htmlFor='junk_food'>Junk Food: {' '}
            <select value={form.junk_food} name="junk_food" onChange={handleChange} required>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          <br />
          <label htmlFor='seizure'>Seizure: {' '}
            <select value={form.seizure} name="seizure" onChange={handleChange} required>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>
          <br />
          <label htmlFor='tranquility'>Tranquility: {' '}
            <input type="number" name="tranquility" value={form.tranquility} onChange={handleChange} required/>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <br />
          <NewMetricForm />
        <div>
          {Object.keys(errors).map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </div>
      </>
    )
}
