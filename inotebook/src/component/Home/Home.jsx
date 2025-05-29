import { useContext, useState } from "react"
import noteContext from "../context/NoteContext"

function Home() {
  const [data , setData] = useState({
    title:"",
    tag:"",
    description:""
  })
  const context = useContext(noteContext)
  const {addNotes} = context

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setData(data =>({...data , [name]:value}))
  }

  const handelSubmit = (e) =>{
    e.preventDefault()
    addNotes(data.title,data.tag,data.description)
  }
  return (
    <div>
      <div className='container d-flex justify-content-center'>
        <div className="w-50 my-5">
          <h2 className="text-center mb-4">Add Notes</h2>
          <form className="row g-3 d-flex flex-column">
            <div className="col">
              <label htmlFor="Title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name="title"  onChange={handleChange}/>
            </div>
            <div className="mb-3 col">
              <label htmlFor="Tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name="tag"  rows={3} onChange={handleChange}/>
            </div>
            <div className="mb-3 col">
              <label htmlFor="Description" className="form-label">Description</label>
              <textarea className="form-control" id="description" name="description"  rows={3} onChange={handleChange}/>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Check me out
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-secondary" onClick={handelSubmit}>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home