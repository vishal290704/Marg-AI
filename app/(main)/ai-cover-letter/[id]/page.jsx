import React from 'react'

const CoverLetter =async ({params}) => {
    const {id} =await params;
  return (
    <div className='text-white bg-amber-800'>CoverLetter: {id}</div>
  )
}

export default CoverLetter