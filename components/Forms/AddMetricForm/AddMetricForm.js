import {useState} from 'react'
import DailyMetric from '../../../models/DailyMetric.models'

export default function addMetricForm({newMetricFormId}) {

    const [form, setForm] = useState({
        name: '',
        type: '',
        input: {type: '', single: '', multiple: {number_options: 'okay', options: []}},
        required: 'true',
        unique: 'false'
    })

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        console.log(name)

        setForm({
            ...form,
            [name]: value
        })

      console.log(form.input)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            
          } else {
            console.log('error')
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

      console.log(form.input)

    return (
        <>
            <div>Add metric</div>
            <form id={newMetricFormId} onSubmit={handleSubmit}>
                <label htmlFor="name">Name: 
                    <input type="text" name="name" value={form.name} onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="data_type">Data Type: 
                <select name="data_type" value={form.type} onChange={handleChange}>
                        <option value="number">Number</option>
                        <option value="string">Text</option>
                        <option value="boolean">True/False</option>
                    </select>
                </label>
                <br />
                <label htmlFor="input">Input Type: 
                <select name="input" value={form.input.type} onChange={handleChange}>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </label>
                {(form.input.type === 'multiple') ? 
                    <>
                        <br />
                        <label htmlFor="">Number of Options
                            <input type="text" value={form.input.multiple.number_options}/>
                        </label>
                    </> : ''
            }
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
