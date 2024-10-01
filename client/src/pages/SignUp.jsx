import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (data.success === false) {
                setError(data.message)
                setLoading(false)
                return
            }
            if (data.message === "Username or email already exists") {
                setError(data.message)
                setLoading(false)
                return;
            }
            setLoading(false)
            navigate('/log-in', { replace: true })
            setFormData({})
            setError(null)
        } catch (err) {
            setLoading(false)
            setError(err.message)
        }
    }
    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-3xl font-bold text-center my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' onChange={handleChange} />
                <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' onChange={handleChange} />
                <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-stone-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link className='text-blue-700' to={"/log-in"}>
                    Sign in
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default SignUp