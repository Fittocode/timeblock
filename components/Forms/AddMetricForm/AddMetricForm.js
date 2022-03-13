import {useState} from 'react'
import CustomForm from '../../../models/CustomForm.models'

export default function addMetricForm({newMetricFormId, metricsArray, addMetric, setAllMetricsForm}) {

    const [addMetricForm, setAddMetricForm] = useState({
        name: '',
        type: 'Number',
        input: {type: 'single', multiple: {number_options: '', options: []}},
        required: 'true',
        unique: 'false'
    })

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        // set state nested 1 level deep
        if (name === 'input') {
            setAddMetricForm(prevForm => ({
                ...prevForm,
                input: {
                    ...prevForm.input, 
                    type: value 
                }
            }))
            // set state nested 2 levels deep
        } else if (addMetricForm.input.type === 'multiple' && name === 'noOptions') {
            setAddMetricForm(prevForm => ({
                ...prevForm,
                input: {
                    ...prevForm.input,
                    multiple: { 
                        ...prevForm.multiple,
                        number_options: value 
                    }
                }
            }))
        } else {
            setAddMetricForm(prevForm => ({
                ...prevForm,
                [name]: value
            }))
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addMetric(metricsArray, addMetricForm, setAllMetricsForm)
        // const errs = formValidate()
        // if (Object.keys(errs).length === 0) {
        //   } else {
        //     console.log('error')
        //   }
      }

      const formValidate = () => {
        let err = {}

        if (!addMetricForm.name) err.name = 'Name is required'
        if (!addMetricForm.type) err.type = 'Type is required'
        if (!addMetricForm.required) err.required = 'Required is required'
        if (!addMetricForm.unique) err.unique = 'Unqiue is required'
        return err
      }

    function repeatInputs(number_options) {
        let array = []
        for (let i = 1; i <= Number(number_options); i++) {
            array.push(i)
        }
        return array
    }

    const inputArray = repeatInputs(addMetricForm.input.multiple.number_options)

    return (
        <>
            <div>Add metric</div>
            <form id={newMetricFormId} onSubmit={handleSubmit}>
                <label htmlFor="name">Name: 
                    <input type="text" name="name" value={addMetricForm.name} onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="type">Data Type: 
                <select name="type" value={addMetricForm.type} onChange={handleChange}>
                        <option value="number">Number</option>
                        <option value="string">Text</option>
                        <option value="boolean">True/False</option>
                    </select>
                </label>
                <br />
                <label htmlFor="input">Input Type: 
                <select name="input" value={addMetricForm.input.type} onChange={handleChange}>
                        <option value="single">Single</option>
                        <option value="multiple">Multiple</option>
                    </select>
                </label>
                {(addMetricForm.input.type === 'multiple') ? 
                    <>
                        <br />
                        <label htmlFor="noOptions">Number of Options
                            <input type="text" name="noOptions" value={addMetricForm.input.multiple.number_options} onChange={handleChange}/>
                        </label>
                    </> : ''
                }
                {(addMetricForm.input.multiple.number_options > 1 && addMetricForm.input.multiple.number_options <= 10) ? 
                <>
                    <ul>
                        {inputArray.map((number) => {
                            return <label htmlFor="optionInputs">
                                <br />
                                {`Option ${number}`} <input type="text" key={`option${number}`} name='optionInputs'/>
                            </label>
                            })
                        }
                    </ul>
                </> : ''
                }
                <br />
                <label htmlFor="required">Required: 
                    <select name="required" value={addMetricForm.required} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <br />
                <label htmlFor="unique">Unique: 
                    <select name="unique" value={addMetricForm.unique} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <br />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}
