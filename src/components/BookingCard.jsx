'use client';

import { Calendar, Clock, TrashBin, TriangleExclamationFill } from '@gravity-ui/icons';
import { Button, Card, Chip } from "@heroui/react";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || '';

const STATUS_STYLES = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'default',
    completed: 'primary',
};

const FALLBACK_IMAGE =
    'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="240"%3E%3Crect width="100%25" height="100%25" fill="%23e4e4e7"/%3E%3C/svg%3E';

const formatPrice = (price) => {
    if (price === null || price === undefined || isNaN(price)) return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(price);
};

const formatDate = (dateStr) => {
    if (!dateStr) return 'Flexible';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // already formatted / not parseable
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const BookingCard = ({ booking }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [error, setError] = useState(null);
    const [imgSrc, setImgSrc] = useState(booking?.imageUrl || FALLBACK_IMAGE);

    const {
        _id,
        destinationName,
        title,
        price,
        duration,
        departureDate,
        status,
    } = booking;

    const isCancelled = status === 'cancelled';
    const displayName = title || destinationName || 'Untitled trip';

    const handleCancel = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${SERVER_URL}/bookings/${_id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                setError('Failed to cancel booking. Please try again.');
                return;
            }

            router.refresh();
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Check your connection.');
        } finally {
            setLoading(false);
            setConfirming(false);
        }
    };

    return (
        <Card className="p-4 border border-divider shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col gap-3">
            <div className="relative h-40 rounded-xl overflow-hidden bg-default-100">
                <img
                    src={imgSrc}
                    alt={displayName}
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <Chip
                    size="sm"
                    color={STATUS_STYLES[status] || 'default'}
                    className="absolute top-2 right-2 capitalize"
                >
                    {status || 'unknown'}
                </Chip>
            </div>

            <h3 className="font-bold text-foreground text-lg leading-tight line-clamp-1">
                {displayName}
            </h3>

            <div className="flex items-center gap-4 text-default-500 text-sm">
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{duration || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(departureDate)}</span>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-1.5 text-danger text-xs bg-danger-50 rounded-lg px-2.5 py-1.5">
                    <TriangleExclamationFill className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-divider">
                <span className="text-xl font-black text-primary">{formatPrice(price)}</span>

                {isCancelled ? (
                    <span className="text-xs text-default-400 italic">Cancelled</span>
                ) : confirming ? (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="light"
                            size="sm"
                            isDisabled={loading}
                            onPress={() => setConfirming(false)}
                        >
                            Keep it
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            isLoading={loading}
                            onPress={handleCancel}
                        >
                            Confirm cancel
                        </Button>
                    </div>
                ) : (
                    <Button
                        color="danger"
                        variant="flat"
                        size="sm"
                        startContent={<TrashBin className="w-4 h-4" />}
                        onPress={() => setConfirming(true)}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default BookingCard;