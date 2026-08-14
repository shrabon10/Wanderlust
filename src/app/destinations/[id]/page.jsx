import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { ModalEdit } from '@/components/ModalEdit';

import { 
  Pin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Star, 
  Heart, 
  ArrowUpRightFromSquare, 
  Check, 
  ShieldCheck 
} from '@gravity-ui/icons';
import { DeletDestinations } from '@/components/DeletDestinations';

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const SERVER_URL ='http://localhost:5000';

  const res = await fetch(`${SERVER_URL}/destinations/${id}`, {
    next: { revalidate: 60 },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-default-500">
        <p>Failed to load destination details.</p>
      </div>
    );
  }

  const destination = await res.json();
  const {
    title,
    destinationName,
    country,
    category,
    price,
    duration,
    departureDate,
    imageUrl,
    description,
    _id
  } = destination;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className='flex gap-5 justify-end'>
        <ModalEdit destination={destination} key={departureDate._id} /> 
      <DeletDestinations destination={destination} key={departureDate._id}/> 
        </div> 
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            <Pin className="w-4 h-4" />
            <span>{destinationName}{country ? `, ${country}` : ''}</span>
            {category && (
              <>
                <span className="text-default-300">•</span>
                <Chip size="sm" variant="flat" color="primary">{category}</Chip>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            {title || destinationName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button isIconOnly variant="flat" radius="full" aria-label="Share">
            <ArrowUpRightFromSquare className="w-4 h-4" />
          </Button>
          <Button isIconOnly variant="flat" radius="full" color="danger" aria-label="Save to Wishlist">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[380px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8 group">
        <img
          src={imageUrl}
          alt={title || destinationName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        
        <div className="absolute bottom-6 left-6 backdrop-blur-md bg-background/80 px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/20">
          <Star className="w-5 h-5 text-warning fill-warning" />
          <span className="font-bold text-foreground text-sm">4.9</span>
          <span className="text-default-400 text-xs">(128 reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-content2/50 border border-divider">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Clock className="w-5 h-5"/>
              </div>
              <div>
                <span className="text-xs text-default-400 block">Duration</span>
                <span className="font-semibold text-foreground text-sm">{duration || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-default-400 block">Departure</span>
                <span className="font-semibold text-foreground text-sm">{departureDate || 'Flexible'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-default-400 block">Guarantee</span>
                <span className="font-semibold text-foreground text-sm">Instant Confirmation</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">About this Experience</h2>
            <p className="text-default-600 leading-relaxed text-base whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-divider">
            <h3 className="text-lg font-bold text-foreground">What's Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Professional Guided Tour',
                'All Transportation Included',
                'Free Cancellation up to 48h',
                'Meals & Local Refreshments'
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-default-600 text-sm">
                  <div className="p-1 rounded-full bg-success/20 text-success">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6 p-6 border-none shadow-xl bg-background border border-divider flex flex-col gap-6">
            <div className="flex justify-between items-baseline border-b border-divider pb-4">
              <div>
                <span className="text-xs text-default-400 uppercase tracking-wider block">Total Price</span>
                <span className="text-3xl font-black text-primary">${price}</span>
                <span className="text-xs text-default-400"> / person</span>
              </div>
              <Chip color="success" variant="flat" size="sm" className="font-semibold">
                Available
              </Chip>
            </div>

            <div className="space-y-3 text-sm text-default-500">
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="font-semibold text-foreground">{destinationName}</span>
              </div>
              <div className="flex justify-between">
                <span>Departure:</span>
                <span className="font-semibold text-foreground">{departureDate || 'Daily'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tour ID:</span>
                <span className="font-mono text-xs text-default-400">{_id?.slice(-6)}</span>
              </div>
            </div>

            <Button 
              color="primary" 
              size="lg" 
              radius="full"
              endContent={<ArrowRight className="w-5 h-5" />}
              className="w-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] transition-transform"
            >
              Book Destination
            </Button>

            <p className="text-center text-xs text-default-400">
              🔒 256-bit Secure Checkout • No hidden fees
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;