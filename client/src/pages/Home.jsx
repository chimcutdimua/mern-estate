import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ListingItem from '../components/ListingItem';

const Home = () => {
    SwiperCore.use([Navigation, Pagination]);
    const [offerListings, setOfferListings] = useState([])
    const [saleListings, setSaleListings] = useState([])
    const [rentListings, setRentListings] = useState([])

    useEffect(() => {
        const fetchRentListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4')
                const data = await res.json()
                setRentListings(data)
            } catch (error) {
                console.error(error)
            }
        }
        const fetchSaleListings = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4')
                const data = await res.json()
                setSaleListings(data)
                fetchRentListings()
            } catch (error) {
                console.error(error)
            }
        }
        const fetchOfferListings = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4')
                const data = await res.json()
                setOfferListings(data)
                fetchSaleListings()
            } catch (error) {
                console.error(error)
            }
        }
        fetchOfferListings()
    }, [])
    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                    Find your next <span className='text-slate-500'>perfect</span><br />place with ease
                </h1>
                <div className='text-gray-400 text-xs sm:text-sm'>
                    Premier estate is the best place to find your next home.
                    <br />
                    We have a wide range of properties available for you to choose from.
                    <br />
                    Whether you are looking for a house, an apartment, or a condo, we have it all.
                </div>
                <Link className='text-xs sm:text-sm text-blue-800 font-bold hover:underline' to={"/search"}>
                    Let&apos;s get started...
                </Link>
            </div>
            {/* swiper */}
            <Swiper navigation>
                {offerListings && offerListings.length > 0 &&
                    offerListings.map((offerList) => (
                        <SwiperSlide key={offerList._id}>
                            <div
                                style={{ background: `url(${offerList.imageUrls[0]}) center no-repeat`, backgroundSize: "cover" }}
                                className='h-[500px]'
                            ></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {offerListings && offerListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent offer</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                                Show more offer
                            </Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {
                                offerListings.map((listing) => (
                                    <ListingItem key={listing._id} listing={listing} />
                                ))
                            }
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                                Show more places for rent
                            </Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {
                                rentListings.map((listing) => (
                                    <ListingItem key={listing._id} listing={listing} />
                                ))
                            }
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                                Show more places for sale
                            </Link>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {
                                saleListings.map((listing) => (
                                    <ListingItem key={listing._id} listing={listing} />
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home