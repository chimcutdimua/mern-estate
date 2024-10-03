import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
            <form className='flex flex-col object-cover gap-4'>
                <img className='rounded-full h-24 w-24 self-center cursor-pointer mt-2' src={currentUser?.avatar} alt="avatar" />
                <input className='rounded-lg p-3 border' type="text" placeholder='username' id='username' />
                <input className='rounded-lg p-3 border' type="email" placeholder='email' id='email' />
                <input className='rounded-lg p-3 border' type="password" placeholder='password' id='password' />
                <button className='rounded-lg p-3 text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-green-700 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}

export default Profile