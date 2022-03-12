import {useState} from 'react'
import mongoose from 'mongoose'
const {Schema, model} = mongoose
import DailyMetric from '../../../models/DailyMetric.models'

export default function addMetricForm({newMetricFormId}) {

    const [form, setForm] = useState({
        name: '',
        type: '',
        required: 'true',
        unique: 'false'
    })

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            DailyMetric.add({[newMetric.name] : {
                type: [newMetric.type],
                required: [newMetric.required],
                unique: [newMetric.unique],
                }
            })
            mongoose.model('DailyMetric', DailyMetric)
          } else {

          }
      }

      const formValidate = () => {
        let err = {}

        if (!form.name) err.name = 'Name is required'
        if (!form.type) err.type = 'Type is required'
        if (!form.required) err.required = 'Required is required'
        if (!form.unique) err.unique = 'Unqiue is required'
        return err
      }

    return (
        <>
            <div>Add metric</div>
            <form id={newMetricFormId} onSubmit={handleSubmit}>
                <label htmlFor="name">Name: 
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="type">Data Type: 
                <select name="type" value={form.type} onChange={handleChange}>
                        <option value="number">Quantitative</option>
                        <option value="string">Non-Quantitative</option>
                        <option value="boolean">True/False</option>
                    </select>
                </label>
                <br />
                <label htmlFor="required">Required: 
                    <select name="required" value={form.required} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <br />
                <label htmlFor="unique">Unique: 
                    <select name="unique" value={form.unique} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <br />
                <button type='submit'>Submit</button>
                <p>if type === options, display form inputs for options (name and value for each option)</p>

            </form>
        </>
    )
}
