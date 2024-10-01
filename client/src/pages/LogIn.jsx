import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LogIn = () => {
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
        const { email, password } = formData;
        if (!email || !password) {
            setError("All fields are required");
            setLoading(false);
            return;
        }
        try {
            const res = await fetch('/api/auth/signin', {
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
            if (data.message === "Invalid credentials") {
                setError("Invalid credentials")
                setLoading(false)
                return
            }
            setLoading(false)
            setFormData({})
            setError(null)
            navigate('/')
        } catch (err) {
            setLoading(false)
            setError(err.message)
        }
    }
    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='text-3xl font-bold text-center my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input className='border p-3 rounded-lg' type="email" placeholder='email' id='email' onChange={handleChange} />
                <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-stone-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don&apos;t have an account?</p>
                <Link className='text-blue-700' to={"/sign-up"}>
                    Sign Up
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
    )
}

export default LogIn