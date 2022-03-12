import React from 'react'

export default function newMetricForm() {

    return (
        <>
            <div>Add metric</div>
            <form>
                <label htmlFor="">Name: 
                    <input type="text" name="name" />
                </label>
                <br />
                <label htmlFor="">Type: 
                    <select name="" id="">
                        <option value="input">input</option>
                        <option value="options">options</option>
                    </select>
                </label>
                <p>if type === options, display form inputs for options (name and value for each option)</p>

            </form>
        </>
    )
}
