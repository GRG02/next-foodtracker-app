// src/app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import food_banner from './images/food_banner.jpg';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-24 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Welcome to <span className="text-orange-400">Food Tracker</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl md:text-3xl">
          Track your meal!!!
        </p>
      </div>

      <div className="my-10">
        <Image
          src={food_banner}
          alt="Food Tracker Logo"
          width={400}
          height={400}
          className="rounded-full shadow-lg"
        />
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <Link href="/register">
          <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white ring-2 ring-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
            Login
          </button>
        </Link>
      </div>

      <p className="absolute bottom-4 text-sm text-gray-300 md:text-base">
        Created by ©RachtipongC | DTI SAU 2025
      </p><p className="absolute bottom-4 text-sm text-gray-300 md:text-base">
      </p>
    </main>
  );
}