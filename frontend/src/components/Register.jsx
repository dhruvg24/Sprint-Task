import React from 'react'

const Register = () => {
  return (
    <>
    <input type='text' placeholder='name' required />
    <input type='email' placeholder='email' required />
    <input type='password' placeholder='password' required/>

    <button type='submit'>Register</button>
    </>
  )
}

export default Register