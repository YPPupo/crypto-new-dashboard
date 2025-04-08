/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FiBell, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [randomUser, setRandomUser] = useState<any>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => setRandomUser(data.results[0]));
  }, []);

  return (
    <header className="w-full bg-gray-900 border-b border-gray-700 h-16 px-6 sticky top-0 z-50">
      <div className="flex items-center justify-end h-full">
        {/* Parte derecha */}
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {randomUser && (
            <div className="flex items-center gap-3">
              <Image
                src={randomUser.picture.thumbnail}
                width={32}
                height={32}
                alt="User Avatar"
                className="rounded-full"
              />
              <span className="text-gray-300 text-sm hidden md:block">
                Admin
              </span>
              <FiChevronDown className="text-gray-400 w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
