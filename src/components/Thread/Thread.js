/* LIBRAIRIES */ 
import React from 'react'

/* CSS */
import './Thread.css'

//fil conducteur
function Thread(props) {
    
  return (
      <div className='container'>
        { props.posts.map((post, index) => {
            return (
                <div key={index} className='containerThread'>
                    {post}
                </div>
            )
        })   
        }
      </div>
    
  )
}

export default Thread