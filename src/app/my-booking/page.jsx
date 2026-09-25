import React from 'react';
import BookingCard from '@/components/BookingCard';
import { CalendarX, WifiOff, PlaneTakeoff } from 'lucide-react';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';

async function getBookings(email) {
    const url = email
        ? `${SERVER_URL}/bookings?email=${encodeURIComponent(email)}`
        : `${SERVER_URL}/bookings`;

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            return { error: true, status: res.status, bookings: [] };
        }
        const bookings = await res.json();
        return { error: false, bookings };
    } catch (err) {
        // Network failure, server down, etc.
        return { error: true, status: null, bookings: [] };
    }
}

const MyBookings = async () => {
    // TODO: replace with real user email/session once auth is in place
    const email = null; // e.g. pull from cookies/session on the server later

    const { error, status, bookings } = await getBookings(email);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="font-bold text-3xl sm:text-4xl text-cyan-300 tracking-tight">
                    My Bookings
                </h1>
                <p className="mt-2 text-sm sm:text-base text-default-500">
                    {bookings.length > 0
                        ? `You have ${bookings.length} upcoming ${bookings.length === 1 ? 'trip' : 'trips'} booked.`
                        : 'Keep track of every destination you book with us.'}
                </p>
            </div>

            {/* Error state */}
            {error && (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-default-200 bg-default-50">
                    <WifiOff className="w-10 h-10 text-default-400 mb-4" aria-hidden="true" />
                    <p className="text-default-600 font-medium">
                        We couldn&apos;t load your bookings right now.
                    </p>
                    <p className="text-default-400 text-sm mt-1">
                        {status ? `Server responded with ${status}.` : 'Please check your connection and try again.'}
                    </p>
                </div>
            )}

            {/* Empty state */}
            {!error && bookings.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-default-200">
                    <PlaneTakeoff className="w-10 h-10 text-cyan-300 mb-4" aria-hidden="true" />
                    <p className="text-default-600 font-medium">
                        You haven&apos;t booked any destinations yet.
                    </p>
                    <p className="text-default-400 text-sm mt-1 max-w-sm">
                        Once you book a trip, it will show up here so you can track dates, details, and status.
                    </p>
                    <a
                        href="/destinations"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-cyan-950 hover:bg-cyan-200 transition-colors"
                    >
                        Explore destinations
                    </a>
                </div>
            )}

            {/* Bookings grid */}
            {!error && bookings.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="transition-transform duration-200 hover:-translate-y-1"
                        >
                            <BookingCard booking={booking} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default MyBookings;