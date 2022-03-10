import React from 'react'

export default function addMetricsForm() {
  
    return (
      <>
        <form action="">

          <label>Date: {' '}
            <input type="date" name="date" />
          </label>
          <br />
          <label>Walk: {' '}
            <input type="number" name="walk" />
          </label>
          <br />
          <label>Stoic Meditation: {' '}
            <input type="boolean" name="stoic" />
          </label>
          <br />
          <label>Mindfulness Meditation: {' '}
            <input type="number" name="meditation" />
          </label>
          <br />
          <label>Exercise: {' '}
            <input type="text" name="kind" placeholder='type'/> {' '}
            <input type="number" name="duration" placeholder='duration' />
          </label>
          <br />
          <label>Deep Work: {' '}
            <input type="number" name="deepWork" />
          </label>
          <br />
          <label>Freedom active: {' '}
            <input type="boolean" name="freedom" />
          </label>
          <br />
          <label>Read: {' '}
            <input type="number" name="read" />
          </label>
          <br />
          <label>Tranquility: {' '}
            <input type="number" name="tranquility" />
          </label>
          <br />
          <input type="submit" value="submit" />
        </form>
      </>
    )
}
