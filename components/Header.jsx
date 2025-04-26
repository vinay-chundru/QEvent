"use client";

import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";
import { TfiTicket } from "react-icons/tfi";

const Header = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b border-slate-200 bg-slate-100 h-24 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent">
          <Image
            src="/images/logo.png"
            alt="logo"
            height={90}
            width={90}
            className="max-w-[90px] max-h-[90px] py-2"
          />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6 font-semibold">
        <Link href="/" className="flex items-center gap-2 hover:text-primary hover:scale-105 transition-all">
          <HomeIcon />
          <p>Home</p>
        </Link>

        <Link href="/events" className="flex items-center gap-2 hover:text-primary hover:scale-105 transition-all">
          <CgProfile />
          <p>Events</p>
        </Link>

        <Link href="/artists" className="flex items-center gap-2 hover:text-primary hover:scale-105 transition-all">
          <PersonIcon />
          <p>Artists</p>
        </Link>

        <Link href="/tags" className="flex items-center gap-2 hover:text-primary hover:scale-105 transition-all">
          <TfiTicket />
          <p>Tags</p>
        </Link>

        {session?.user && (
          <Link href="/create-event" className="hover:text-orange-500">
            Create Event
          </Link>
        )}

        {session?.user ? (
          <button onClick={() => signOut()} className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md hover:opacity-70">
            Logout
          </button>
        ) : (
          <button onClick={() => signIn("google")} className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md hover:opacity-70">
            Log in
          </button>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute top-24 left-0 w-full bg-slate-100 shadow-md px-6 py-4 flex flex-col gap-5 font-semibold md:hidden z-40">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-2">
            <HomeIcon />
            <p>Home</p>
          </Link>

          <Link href="/events" onClick={toggleMenu} className="flex items-center gap-2">
            <CgProfile />
            <p>Events</p>
          </Link>

          <Link href="/artists" onClick={toggleMenu} className="flex items-center gap-2">
            <PersonIcon />
            <p>Artists</p>
          </Link>

          <Link href="/tags" onClick={toggleMenu} className="flex items-center gap-2">
            <TfiTicket />
            <p>Tags</p>
          </Link>

          {session?.user && (
            <Link href="/create-event" onClick={toggleMenu} className="hover:text-orange-500">
              Create Event
            </Link>
          )}

          {session?.user ? (
            <button onClick={() => { toggleMenu(); signOut(); }} className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          ) : (
            <button onClick={() => { toggleMenu(); signIn("google"); }} className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md">
              Log in
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
