import React from 'react'

const NotFoundScreen = () => {
  return (
    <div className='h-100-vh bg-404 w-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className='p-0 m-0 display-1'>Greška 404!</h1>
      <h4 className='p-0 m-0'>Nažalost, nismo pronašli ono što tražite...</h4>
    </div>
  )
}

export default NotFoundScreen