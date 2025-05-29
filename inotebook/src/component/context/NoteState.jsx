import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
  const allNotes = [
    {
      "_id": "6819c4e40b1e3e7e9410e60a1",
      "user": "68186db0bbc7e6025944e06c",
      "title": "science1",
      "description": "this is science notes - aa",
      "tag": "school",
      "date": "2025-05-06T08:14:28.182Z",
      "__v": 0
    },
    
  ]

  const [notes,setNotes] = useState(allNotes)

  const addNotes = (title,tag,description) =>{
    console.log("adding new note")
    const note = {
      "_id": "6819c5c6c37bf42744417d768",
      "user": "68186db0bbc7e6025944e06c",
      "name": "model",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2025-05-06T08:18:14.442Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  const editNotes = () =>{

  }

  const deleteNotes = () => {
    
  }
  return (
    <NoteContext.Provider value={{notes , setNotes , addNotes,editNotes,deleteNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState