import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from 'react-router-dom'

function WorkDiary() {
  const {imagestore}=useSelector((state) => state.imageReducer)

  return (
    <div>
      workk
      {imagestore.map((itm,j)=>(
        <div key={`images${j}`}>
          <img src={itm.arg}/>
          <p>{itm.dateTime}</p>
        </div>
      ))}
     
      <button>
      
        <Link to='/'>Back</Link>
      </button>
    </div>
  )
}

export default WorkDiary
