import React from 'react'
import "./css/TitleMenu.css"

const TitleMenu = (props) => {
  return (
    <>
      <div class="rectangle"> 
        <h2>{props.name}</h2>
      </div>
    </>
  )
}

export default TitleMenu