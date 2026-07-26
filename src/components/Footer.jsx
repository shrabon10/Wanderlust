"use client";

import React from "react";
import Link from "next/link";
import { Input, Button, Separator } from "@heroui/react";

export const Footer = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/60 pt-16 pb-8 px-6 md:px-16 transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Hero Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-800/40">
          <div className="space-y-3">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              Wanderlust
            </h2>
            <p className="text-base text-neutral-400 max-w-md font-normal leading-relaxed">
              Your gateway to extraordinary travel experiences around the world.
            </p>
          </div>

          {/* Social Badges */}
          <div className="flex items-center gap-3 text-sm font-medium">
            <span className="text-neutral-500 hidden sm:inline">Follow us:</span>
            {["X", "Instagram", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href={`https://${platform.toLowerCase()}.com`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all text-xs"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
          
          {/* Newsletter Column */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Stay Inspired
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Subscribe for exclusive travel deals, local tips, and curated getaway guides directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm pt-1">
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Newsletter email address"
                variant="flat"
                radius="full"
                size="sm"
                className="bg-neutral-900 text-white border border-neutral-800 focus-within:border-primary/50"
              />
              <Button
                type="submit"
                color="primary"
                radius="full"
                size="sm"
                className="font-medium px-5 shadow-sm shadow-primary/20"
              >
                Join
              </Button>
            </form>
          </div>

          {/* Spacer Column */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/my-destinations" className="hover:text-white transition-colors duration-200 block py-0.5">
                  My Destinations
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/help" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200 block py-0.5">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-200 uppercase">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <a href="tel:+17869011622" className="hover:text-white transition-colors block py-0.5">
                  +1 (786) 901-1622
                </a>
              </li>
              <li>
                <a href="mailto:info@wanderlust.com" className="hover:text-white transition-colors block py-0.5 underline underline-offset-4 decoration-neutral-800 hover:decoration-white">
                  info@wanderlust.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="pt-4">
          <Separator orientation="horizontal" className="bg-neutral-800/80" />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Wanderlust Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-neutral-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;