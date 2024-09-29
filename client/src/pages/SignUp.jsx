import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-3xl font-bold text-center my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' />
                <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' />
                <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
                <button className='bg-stone-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
                    Sign Up
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link className='text-blue-700' to={"/log-in"}>
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default SignUp