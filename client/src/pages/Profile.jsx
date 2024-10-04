import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess
} from '../redux/user/userSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
    const fileRef = useRef(null)
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector(state => state.user)
    const [file, setFile] = useState(undefined)
    const [filePerc, setFilePerc] = useState(0)
    const [fileUploadError, setFileUploadError] = useState(false)
    const [formData, setFormData] = useState({})
    const [updatedSuccess, setUpdatedSuccess] = useState(false)


    const handlerUpload = useCallback((file) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setFilePerc(Math.round(progress))
        }, (error) => {
            console.log(error)
            setFileUploadError(true)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL })
                }
            )
        });
    }, [formData])

    useEffect(() => {
        if (file) {
            handlerUpload(file)
        }
    }, [file])

    const handlerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart())
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            const data = await res.json()

            if (data.success === false) {
                dispatch(updateUserFailure(data.message))
                return
            }
            dispatch(updateUserSuccess(data))
            setUpdatedSuccess(true)
        } catch (error) {
            dispatch(updateUserFailure(error.message))
        }
    }

    const handleDelete = async () => {
        try {
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message))
                return
            }
            dispatch(deleteUserSuccess(data))
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart())
            const res = await fetch(`/api/auth/signout`)
            const data = await res.json()
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message))
                return
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
    }

    // fisebase storage
    // allow read;
    // allow write: if
    // request.resource.size < 2 * 1024 * 1024 &&
    // request.resource.contentType.matches('image/.*')
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col object-cover gap-4'>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    accept='image/*'
                    ref={fileRef}
                    type="file"
                />
                <div className='relative self-center mt-2'>
                    <img
                        onClick={() => fileRef.current.click()}
                        className='rounded-full h-24 w-24 self-center cursor-pointer mt-2'
                        src={formData.avatar || currentUser?.avatar}
                        alt="avatar"
                    />
                    <FaCamera onClick={() => fileRef.current.click()} className='absolute bottom-0 right-1 cursor-pointer ' />
                </div>
                <p className='text-md self-center'>
                    {fileUploadError ? (
                        <span className='text-center text-red-600'>Error image upload (image must be less than 2mb)</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-center text-slate-700'>Uploading {filePerc}%</span>
                    ) : filePerc === 100 ? (
                        <span className='text-center text-green-600'>Image successfully uploaded!</span>
                    ) : ""
                    }
                </p>


                <input
                    className='rounded-lg p-3 border'
                    type="text"
                    placeholder='username'
                    id='username'
                    defaultValue={currentUser?.username}
                    onChange={handlerChange}
                />
                <input
                    className='rounded-lg p-3 border'
                    type="email"
                    placeholder='email'
                    id='email'
                    defaultValue={currentUser?.email}
                    onChange={handlerChange}
                />
                <input
                    className='rounded-lg p-3 border'
                    type="password"
                    placeholder='password'
                    id='password'
                    onChange={handlerChange}
                />
                <button disabled={loading} className='rounded-lg p-3 text-white bg-slate-700 uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
                <Link to={'/create-listing'} className='rounded-lg p-3 text-white bg-green-700 uppercase hover:opacity-95 text-center'>
                    create listing
                </Link>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDelete} className='text-red-600 cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign out</span>
            </div>
            <p className='text-red-600 mt-5 text-center'>{error ? error : ""}</p>
            <p className='text-green-600 mt-5 text-center'>{updatedSuccess ? "User is updated successfully!" : ""}</p>
        </div>
    )
}

export default Profile