import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async() => {
    const res = await fetch('http://localhost:5000/destinations')
    const destinations = await res.json()
    console.log(destinations);
    return (
        <div>
            <h2 className='font-bold text-4xl text-cyan-300 mx-auto text-center m-10 cursor-pointer '> All Destinations</h2>

            <div className='grid grid-cols-3 gap-6 p-4'>
                {
                    destinations.map(destination => <DestinationCard key={destination.id} destination={destination} />)
                }
            </div>
        </div>
    );
};

export default DestinationPage;