import React, { useContext } from 'react'
import './Notes.css'
import noteContext from '../context/NoteContext'
import Alert from '../Alert/Alert'

function Notes() {
    const context = useContext(noteContext)
    const { notes} = context
    return (
        <div>
            <Alert/>
            <div className='container text-center my-5'>
                <h2>Your Notes</h2>
            </div>
            <div className='container d-flex flex-wrap  gap-3'>
                {
                    notes.map((note,index) => {
                        return <div key={index}>
                            <div  className="card d-flex" style={{ width: '18rem' }}>
                                <div className="card-body">
                                    <div className='d-flex justify-content-between'>
                                        <h5 className="card-title">{note.title}</h5>
                                        <div className='d-flex gap-2'>
                                            <span><i className="fa-regular fa-pen-to-square curs-pointer"></i></span>
                                            <span><i className="fa-regular fa-trash-can curs-pointer"></i></span>
                                        </div>
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                                    <p className="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                    })

                }
            </div>
        </div >
    )
}

export default Notes