import { useState } from 'react'

export default function AddMetric({ addMetricForm, newMetric, setNewMetric, handleSubmit }) {

    const [addMetric, setAddMetric] = useState(false)
    const [metricOption, setMetricOption] = useState({
        name: ''
    })

    const toggle = () => {
        setAddMetric(!addMetric)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if (name === 'options') setMetricOption({...metricOption, name: value})
        else setNewMetric(prevState => ({...prevState, [name]: value }))
    }
    
    const handleAdd = (e) => {
        e.preventDefault()
        setNewMetric(prevState => ({
            ...prevState,
            options: [...prevState.options, metricOption] 
        }))
        setMetricOption({name: ''})
    }

    const handleRemove = (e) => {
        e.preventDefault()
        const name = e.target.name
        setNewMetric(prevState => ({...prevState, options: newMetric.options.filter(option => option.name !== name)}))
    }

    return (
        <>
        <button onClick={() => toggle()}>Add Metric</button>
        {
            addMetric ? 
            <div>
            <h4>Add Metric</h4>
            <form id={addMetricForm} onSubmit={handleSubmit}>
                <label>Name: {' '}
                    <input type="text" name="name" placeholder="Exercise" value={newMetric.name} onChange={handleChange} />
                </label>
                {' '}
                <br />
                <br />
                <label htmlFor="options">Select from Options: {' '}
                    <input type="text" name="options" placeholder="Jump Rope, Run, Swim" value={metricOption.name} onChange={handleChange}/>{' '}
                    <button onClick={handleAdd}>Add</button>{' '}(Leave blank to use input form)
                </label>
                    {(newMetric.options.length > 0) ? 
                        <div>
                            {newMetric.options.map((option, index) => {
                                return <>
                                    <li key={index}>{option.name} <button name={option.name} onClick={handleRemove}>x</button></li>
                                </>
                            })}
                        </div>
                    : ''}
                {' '}
                <br />
                <br />
                <label htmlFor="units">Unit of Measure: {' '}
                        <input type="text" name="units" placeholder="Hours, Miles, Days" value={newMetric.units} onChange={handleChange}/>
                </label> (Optional)
                <br />
                <br />
                <label htmlFor="required">Required: {' '}
                    <select name="required" onChange={handleChange}>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>
                <br />
                <br />
                <label htmlFor="unique">Unique: {' '}
                    <select name="unique" onChange={handleChange}>
                        <option value={false}>False</option>
                        <option value={true}>True</option>
                    </select>
                </label>
                <br />
                <br />
                <button type="submit" value="submit">Submit</button>
            </form>
        </div>
            : ''
        }
        </>
    )
}