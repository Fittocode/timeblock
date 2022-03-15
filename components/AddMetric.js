import {useState} from 'react'


export default function AddMetric({ addMetricForm }) {

    const [allMetrics, setAllMetrics] = useState([])

    const [newMetric, setNewMetric] = useState({
        name: '',
        options: [],
        units: '',
        required: 'false',
        unique: 'false'
    })

    const [metricOption, setMetricOption] = useState({
        name: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name)
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
        const name = e.target.name
        e.preventDefault()
        setNewMetric(prevState => ({...prevState, options: newMetric.options.filter(option => option.name !== name)}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setAllMetrics(prevState => {
            return [...prevState, newMetric] 
        })
        setNewMetric({options: []})
    }

    console.log(metricOption)
    console.log(newMetric)

    return (
        <>
        <h2>Metrics</h2>
            {allMetrics.map((metric) => {
                return <div key={metric.name}>
                            <p>{metric.name}: {(metric.options.length > 0) ? <select>
                                {metric.options.map((option) => {
                                    return <option key={option.name} value={option.name}>{option.name}</option>
                                })}
                            </select> : <input name="name"/>
                            } {(metric.units) ? metric.units : ''}</p>
                        </div>
            })}
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
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </label>
                <br />
                <br />
                <button type="submit" value="submit">Submit</button>
            </form>
        </>
    )
}