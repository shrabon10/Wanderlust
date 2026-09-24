import React from 'react';
import BookingCard from '@/components/BookingCard';

const SERVER_URL = 'http://localhost:5000';

const MyBookings = async () => {
    // TODO: replace with real user email/session once auth is in place
    const email = null; // e.g. pull from cookies/session on the server later

    const url = email
        ? `${SERVER_URL}/bookings?email=${encodeURIComponent(email)}`
        : `${SERVER_URL}/bookings`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-default-500">
                <p>Failed to load your bookings.</p>
            </div>
        );
    }

    const bookings = await res.json();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-3xl font-black text-foreground mb-6">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-default-500 text-center py-20">
                    You haven&apos;t booked any destinations yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyBookings;