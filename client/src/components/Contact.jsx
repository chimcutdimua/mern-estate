import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({
    listing
}) => {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                if (data.success === false) {
                    console.log(data.message)
                    return
                }
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlord()

    }, [listing?.userRef])

    console.log(landlord)

    return (

        <>
            {landlord && (
                <div className='flex flex-col gap-2'>
                    <p>
                        Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        className='w-full border p-3 rounded-lg'
                        onChange={onChange}
                        value={message}
                        name="message"
                        id="message"
                        placeholder='Type your message here...'
                        rows={2}
                    >
                    </textarea>
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
                    >
                        Send message
                    </Link>
                </div>
            )}
        </>
    )
}

export default Contact