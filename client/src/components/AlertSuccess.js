import React from 'react'

const AlertSuccess = props => {
  return (
    <>
      <br />
      <div className='container'>
        <div className={!props.show ? `alert alert-${props.type} d-none` : `alert alert-${props.type}`} role="alert">
          {props.functionDone}
        </div>
      </div>
    </>
  )
}

export default AlertSuccess