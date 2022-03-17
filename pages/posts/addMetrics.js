import React from 'react'
import Link from 'next/link'
import ParentForm from '../../components/Forms/ParentForm/ParentForm'

export default function addMetrics() {
  
    return (
      <>
      <ParentForm />
        <br />
        <br />
        <Link href="/">
          <a>Home</a>
        </Link>
      </>
    )
}
