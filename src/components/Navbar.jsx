"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button, Dropdown, DropdownItem, DropdownSection, DropdownTrigger, Separator } from "@heroui/react";
import { LogIn, UserPlus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export const Navbar = () => {

    const { 
        data: session, 
        isPending, //loading state
        
    } = authClient.useSession() 

    const user = session?.user;
    console.log(user);


    const handleLogout = async () =>{
        await authClient.signOut();

        if(handleLogout){
            toast.success('Logged Out Successfully!', {
                position: "top-center",
                richColors: true,
              });
        }
    }
    



  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const leftNavLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Destinations", href: "/my-destinations" },
    { name: "Add Destination", href: "/add-destination" },
  ];

  const rightNavLinks = [{ name: "Profile", href: "/profile" }];

  const allLinks = [...leftNavLinks, ...rightNavLinks];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-md border-b border-default-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-default-600 hover:text-foreground focus:outline-none"
          aria-label="Toggle Navigation Menu"
          type="button"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Left Navigation Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-1 sm:gap-2">
          {leftNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-primary font-semibold bg-primary/10"
                      : "text-default-600 hover:text-foreground hover:bg-default-100/60"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Center Logo */}
        <Link href="/" className="relative group flex shrink-0 items-center">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 transition duration-500 blur-sm" />
          <Image
            src="/assets/Wanderlast.png"
            alt="Wanderlust Logo"
            width={140}
            height={40}
            priority
            className="relative object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Right Navigation & CTAs */}
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-2">
            {rightNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      isActive
                        ? "text-primary font-semibold bg-primary/10"
                        : "text-default-600 hover:text-foreground hover:bg-default-100/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Vertical Separator */}
          <div className="hidden md:flex items-center h-6">
            <Separator orientation="vertical" className="bg-default-200" />
          </div>

          {/* Auth Action Buttons — Link wraps Button instead of as={Link} */}
          <div className="flex items-center gap-3">

      {
        user ? <>
        <li>
            
                <Avatar>
        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user?.name.charAt(0)} 
            name={user?.name || 'User'}
        </Avatar.Fallback>
      </Avatar>     
        </li>
        <li>
        <Button onClick={handleLogout} variant="danger" className={'rounded-2xl'}>
            Log-Out
        </Button>
        </li>
        
        </>
        :
        <>
        <Link href="/login">
      <Button
        variant="bordered"
        size="md"
        radius="full"
        startContent={<LogIn className="w-4 h-4 text-primary transition-transform group-hover:translate-x-0.5" />}
        className="group font-semibold text-sm border-default-300 hover:border-primary text-default-800 hover:text-primary px-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      >
        Log In
      </Button>
    </Link>  
      <Link href="/signup">
        <Button
          color="primary"
          size="md"
          radius="full"
          endContent={<UserPlus className="w-4 h-4" />}
          className="font-medium text-sm px-5 bg-gradient-to-r from-primary to-primary-600 text-white shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Sign Up
        </Button>
      </Link>
        </>
      }
    </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-default-200/50 px-4 py-4 transition-all">
          <ul className="flex flex-col gap-2">
            {allLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-default-700 hover:bg-default-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="my-3">
            <Separator orientation="horizontal" className="bg-default-200" />
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="flat" color="default" fullWidth className="font-medium">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;