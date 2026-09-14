
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { CgArrowTopRight } from 'react-icons/cg';
import DestinationCard from './DestinationCard';

const Featured = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`,)
    const destinations = await res.json()
    console.log(destinations);
    

    return (
        <div className='m-10 max-w-7xl mx-auto'>
            <div className='flex justify-between align-center mb-8  '>
                <div>
                <h2 className='text-4xl text-cyan-500 font-bold mb-4'>Featured Destinations</h2>
                <p className='text-gray-600 mb-8'>Explore our handpicked featured destinations for your next adventure.</p>
            </div>
            <Button>
                <Link href="/destinations" className='text-white border-none flex items-center gap-1.5 text-white'><span>View All Destinations</span> <CgArrowTopRight /> </Link>
            </Button>
            </div>
            <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {destinations.map((destination) => <DestinationCard key={destination._id} destination={destination} />)}
            </div>
        </div>
    );
};

export default Featured;