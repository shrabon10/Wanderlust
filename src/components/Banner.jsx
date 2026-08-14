"use client";

import React from "react";
import { Button, Input, Separator } from "@heroui/react";
import Link from "next/link";

export const Banner = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between items-center text-white bg-[url('/assets/banner.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      
      {/* Dark Gradient Overlay for optimal contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-12 text-center flex flex-col justify-center items-center gap-6 flex-1">
        
        {/* Subtitle Badge */}
        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide uppercase">
          Explore The World
        </span>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
          Discover Your <br className="hidden sm:inline" /> Next Adventure
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-2xl font-normal leading-relaxed drop-shadow">
          Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
  <Link href="/destinations">
    <Button
      color="primary"
      size="lg"
      radius="full"
      className="font-semibold px-8 uppercase tracking-wider text-sm shadow-lg shadow-primary/30"
    >
      Explore Now
    </Button>
  </Link>

          
        

          <Button
            variant="bordered"
            size="lg"
            radius="full"
            className="font-semibold px-8 uppercase tracking-wider text-sm border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            View Destinations
          </Button>
        </div>
      </div>

      {/* Interactive Bottom Search Bar */}
      <div className="relative z-10 w-full max-w-5xl px-4 pb-8 sm:pb-12">
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-full p-3 sm:p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Location Field */}
          <div className="flex-1 w-full px-3 py-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Location
            </label>
            <input
              type="text"
              placeholder="Address, City, or Zip"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-400 outline-none mt-0.5"
            />
          </div>

          <div className="hidden md:flex items-center h-8">
            <Separator orientation="vertical" className="bg-white/30" />
          </div>

          {/* Date / Duration Field */}
          <div className="flex-1 w-full px-3 py-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Date / Duration
            </label>
            <input
              type="text"
              placeholder="Anytime / 3 Days"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-400 outline-none mt-0.5"
            />
          </div>

          <div className="hidden md:flex items-center h-8">
            <Separator orientation="vertical" className="bg-white/30" />
          </div>

          {/* Budget Field */}
          <div className="flex-1 w-full px-3 py-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Budget
            </label>
            <input
              type="text"
              placeholder="$0 - $3,000"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-400 outline-none mt-0.5"
            />
          </div>

          <div className="hidden md:flex items-center h-8">
            <Separator orientation="vertical" className="bg-white/30" />
          </div>

          {/* Guests Field */}
          <div className="flex-1 w-full px-3 py-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Guests
            </label>
            <input
              type="text"
              placeholder="5-10 People"
              className="w-full bg-transparent text-sm text-white placeholder-neutral-400 outline-none mt-0.5"
            />
          </div>

          {/* Search Button */}
          <Button
            color="primary"
            size="lg"
            radius="full"
            className="w-full md:w-auto px-8 font-semibold shadow-md shadow-primary/20 shrink-0"
          >
            Search
          </Button>

        </div>
      </div>

    </section>
  );
};

export default Banner;