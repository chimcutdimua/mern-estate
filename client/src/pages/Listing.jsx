import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Listing = () => {
    SwiperCore.use([Navigation, Pagination]);
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                setError(false)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if (data.success === false) {
                    setError(true)
                    setLoading(false)
                    return
                }
                setListing(data)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }

        }
        fetchListing()
    }, [params.listingId])
    return (
        <div>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
            {listing && !loading && !error && (
                <Swiper navigation>
                    {listing.imageUrls.map((image) => (
                        <SwiperSlide key={image}>
                            <div style={{ background: `url(${image}) center no-repeat`, backgroundSize: "cover" }} className='h-[500px]'>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

export default Listing