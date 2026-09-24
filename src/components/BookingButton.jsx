'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@heroui/react";
import { ArrowRight } from '@gravity-ui/icons';

const SERVER_URL = 'http://localhost:5000';

const BookingButton = ({ destination }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    let userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      userEmail = prompt('Enter your email to book this trip:');
      if (!userEmail) return;
      localStorage.setItem('userEmail', userEmail);
    }

    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: destination._id,
          destinationName: destination.destinationName,
          title: destination.title,
          imageUrl: destination.imageUrl,
          price: destination.price,
          duration: destination.duration,
          departureDate: destination.departureDate,
          userEmail,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Booking failed');
        return;
      }

      alert('Booked successfully!');
      router.push('/my-booking'); // matches your actual folder name
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="primary"
      size="lg"
      radius="full"
      endContent={<ArrowRight className="w-5 h-5" />}
      className="w-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
      isLoading={loading}
      onPress={handleBooking}
    >
      Book Destination
    </Button>
  );
};

export default BookingButton;