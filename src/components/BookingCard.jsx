'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Chip } from "@heroui/react";
import { Calendar, Clock, TrashBin } from '@gravity-ui/icons';

const SERVER_URL = 'http://localhost:5000';

export const BookingCard = ({ booking }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        _id,
        destinationName,
        title,
        imageUrl,
        price,
        duration,
        departureDate,
        status,
    } = booking;

    const handleCancel = async () => {
        if (!confirm('Cancel this booking?')) return;

        setLoading(true);
        try {
            const res = await fetch(`${SERVER_URL}/bookings/${_id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                alert('Failed to cancel booking');
                return;
            }

            router.refresh();
        } catch (err) {
            console.error(err);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-4 border border-divider shadow-md flex flex-col gap-3">
            <div className="relative h-40 rounded-xl overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title || destinationName}
                    className="w-full h-full object-cover"
                />
                <Chip
                    size="sm"
                    color={status === 'confirmed' ? 'success' : 'default'}
                    className="absolute top-2 right-2 capitalize"
                >
                    {status}
                </Chip>
            </div>

            <h3 className="font-bold text-foreground text-lg">
                {title || destinationName}
            </h3>

            <div className="flex items-center gap-4 text-default-500 text-sm">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{duration || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{departureDate || 'Flexible'}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-divider">
                <span className="text-xl font-black text-primary">${price}</span>
                <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                    startContent={<TrashBin className="w-4 h-4" />}
                    isLoading={loading}
                    onPress={handleCancel}
                >
                    Cancel
                </Button>
            </div>
        </Card>
    );
};

export default BookingCard;