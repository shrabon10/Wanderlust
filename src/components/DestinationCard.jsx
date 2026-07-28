import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { Pin, Calendar, Clock, ArrowRight } from '@gravity-ui/icons';
import Link from 'next/link';

const DestinationCard = ({ destination }) => {
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
    // Note: v3 removed props like `shadow` and `radius` from Card. 
    // We now apply them cleanly via Tailwind CSS.
    <div className=''>
        <Card className="w-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-background overflow-hidden">
      
      {/* Image & Category Overlay */}
      <Card.Header className="p-0 relative overflow-hidden block">
        <img
          alt={title || destinationName}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
          src={imageUrl}
        />
        {category && (
          <Chip 
            size="sm" 
            variant="flat" 
            color="primary" 
            className="absolute top-3 right-3 z-10 backdrop-blur-md bg-background/70 font-medium"
          >
            {category}
          </Chip>
        )}
      </Card.Header>

      {/* Main Content (CardBody is now Card.Content in v3) */}
      <Card.Content className="p-5 flex flex-col gap-3">
        {/* Location Badge */}
        <div className="flex items-center gap-1.5 text-default-500 text-xs font-semibold tracking-wider uppercase">
          <Pin className="w-3.5 h-3.5 text-primary" />
          <span>{destinationName}{country ? `, ${country}` : ''}</span>
        </div>

        {/* Title & Description using v3 semantic subcomponents */}
        <Card.Title className="text-xl font-bold text-foreground line-clamp-1">
          {title || destinationName}
        </Card.Title>

        <Card.Description className="text-default-500 text-sm line-clamp-2 leading-relaxed">
          {description}
        </Card.Description>

        {/* Tour Metadata (Duration & Date) */}
        <div className="flex items-center gap-4 text-xs text-default-400 mt-1 pt-2 border-t border-divider">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{duration}</span>
            </div>
          )}
          {departureDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{departureDate}</span>
            </div>
          )}
        </div>
      </Card.Content>

      {/* Footer / CTA */}
      <Card.Footer className="px-5 pb-5 pt-0 flex justify-between items-center">
        <div>
          <span className="text-xs text-default-400 block">From</span>
          <span className="text-2xl font-extrabold text-primary">${price}</span>
        </div>
        <Link href={`/destinations/${_id}`} 
          color="primary" 
          radius="full" 
          size="md"
          endContent={<ArrowRight className="w-4 h-4" />}
          className="font-semibold shadow-sm"
        >
          Book Now
        </Link>
      </Card.Footer>
    </Card>
    </div>
  );
};

export default DestinationCard;