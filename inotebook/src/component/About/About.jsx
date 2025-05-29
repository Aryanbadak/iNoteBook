import React, { useContext } from 'react'
import noteContext from '../context/NoteContext'

function About() {
  const context = useContext(noteContext)
  return (
    <div>
        <h1>this is about {context.type}</h1>
    </div>
  )
}

export default About