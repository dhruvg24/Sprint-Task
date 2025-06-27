import React from 'react'

const Login = () => {
  return (
    <>
    <form>
        <input type='email' placeholder='abcd@email.com' required/>
        <input type='password' placeholder='password' required/>
        <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default Login