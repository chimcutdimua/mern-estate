import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({
    listing
}) => {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link className='flex flex-col gap-4' to={`/listing/${listing._id}`}>
                <img
                    src={listing.imageUrls[0]}
                    alt="lisitng cover"
                    className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                />
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-600' />
                        <p className='text-sm text-gray-600 truncate'>{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                    <p className='text-slate-500 mt-22 font-semibold'>
                        $
                        {listing.regularPrice.toLocaleString('en-US')}
                        {listing.offer && ` - $${listing.discountedPrice.toLocaleString('en-US')} discount`}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {listing.bedRooms > 1 ? `${listing.bedRooms} beds ` : `${listing.bedRooms} bed `}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathRooms > 1 ? `${listing.bathRooms} baths ` : `${listing.bathRooms} bath `}
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default ListingItem