import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { currentUser } = useSelector(state => state.user)
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "",
        parking: false,
        furnished: false,
        offer: false,
        bedRooms: 1,
        bathRooms: 1,
        regularPrice: 50,
        discountedPrice: 0
    })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId
            const res = await fetch(`/api/listing/get/${listingId}`)
            const data = await res.json()
            setFormData(data)
            if (data.success === false) {
                console.log(data.message)
                return
            }
        }
        fetchListing()
    }, [])

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length <= 7) {
            setUploading(true)
            setImageUploadError(false)
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageUrls: formData.imageUrls.concat(urls)
                })
                setImageUploadError(false)
                setUploading(false)
            }).catch(() => {
                setImageUploadError('Image upload failed')
                setUploading(false)

            })
        } else {
            setImageUploadError('You can only upload up to 6 images')
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )

        })
    }
    const handleImageDelete = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.imageUrls.length === 0) return setError('Please upload at least one image')
            if (+formData.regularPrice < +formData.discountedPrice) return setError('Discounted price must be less than regular price')
            setLoading(true)
            setError(false)
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id
                })
            })
            const data = await res.json()
            if (data.success === false) {
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Update a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type="text"
                        placeholder='Name'
                        id='name'
                        className='border p-3 rounded-lg'
                        maxLength={62}
                        minLength={10}
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        placeholder='Description'
                        id='description'
                        className='border p-3 rounded-lg'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        placeholder='Address'
                        id='address'
                        className='border p-3 rounded-lg'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex gap-2'>
                            <input className='w-5' type="checkbox" id='sale' onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5' type="checkbox" id='rent' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5' type="checkbox" id='parking' onChange={handleChange} checked={formData.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5' type="checkbox" id='furnished' onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5' type="checkbox" id='offer' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className='flex gap-2 items-center'>
                            <input
                                type="number"
                                id='bedRooms'
                                min={1}
                                max={10}
                                required
                                className='p-3 bordered rounded-lg border-gray-300'
                                onChange={handleChange}
                                value={formData.bedRooms}
                            />
                            <p>Beds</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="number"
                                id='bathRooms'
                                min={1}
                                max={10}
                                required
                                className='p-3 bordered rounded-lg border-gray-300'
                                onChange={handleChange}
                                value={formData.bathRooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input
                                type="number"
                                id='regularPrice'
                                min={50}
                                required
                                className='p-3 bordered rounded-lg border-gray-300'
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                {formData.type === 'sale'
                                    ? <span className='text-xs'>($)</span>
                                    : <span className='text-xs'>($ / month)</span>}
                            </div>

                        </div>
                        {formData.offer && (
                            <div className='flex gap-2 items-center'>
                                <input
                                    type="number"
                                    id='discountedPrice'
                                    min={0}
                                    required
                                    className='p-3 bordered rounded-lg border-gray-300'
                                    onChange={handleChange}
                                    value={formData.discountedPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted price</p>
                                    {formData.type === 'sale'
                                        ? <span className='text-xs'>($)</span>
                                        : <span className='text-xs'>($ / month)</span>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Image:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className='p-3 border border-gray-300 rounded w-full'
                            type="file"
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            onClick={handleImageSubmit}
                            type='button'
                            className='p-3 border text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                    {formData.imageUrls.length > 0 && formData.imageUrls
                        .map((url, index) => (
                            <div key={index} className='flex justify-between p-3 border items-center'>
                                <img
                                    className='w-20 h-20 object-contain rounded-lg'
                                    src={url}
                                    alt="listing image"
                                />
                                <button
                                    type='button'
                                    onClick={() => handleImageDelete(index)}
                                    className='p-3 text-red-700 hover:opacity-75 rounded-lg uppercase '>
                                    Delete
                                </button>
                            </div>
                        ))
                    }
                    <button disabled={loading || uploading} className='p-3 rounded-lg bg-gray-700 text-white uppercase hover:opacity-95 disabled:opacity-80'>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </div>
    )
}

export default UpdateListing