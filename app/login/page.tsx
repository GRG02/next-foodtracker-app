'use client';

import { useState } from 'react';   
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  IoArrowBackOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from 'react-icons/io5';

export default function Page() {

    const router = useRouter();

    const handleLoginClick = (e: React.FormEvent) => {
      e.preventDefault();
      //เอา email/password ไปตรวจสอบ
      //เปิดไปหน้า /dashboard
      router.push('/dashboard');
    }

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('Login data submitted:', formData);
//     // TODO: Add login logic, e.g., API call
//   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 text-white">
      <div className="w-full max-w-md rounded-2xl bg-white/20 p-8 shadow-xl backdrop-blur-sm md:p-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-white transition-colors hover:text-gray-200">
            <IoArrowBackOutline className="mr-1 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">
            <span className="text-orange-400">Login</span>
          </h1>
        </div>

        <form onSubmit={handleLoginClick} className="mt-8 space-y-4">
          <div className="relative">
            <IoMailOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="email"
              name="email"
            //   value={formData.email}
            //   onChange={handleChange}
              placeholder="Email"
            //   required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <IoLockClosedOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="password"
              name="password"
            //   value={formData.password}
            //   onChange={handleChange}
              placeholder="Password"
            //   required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full transform rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-white">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-orange-400 underline transition-colors hover:text-orange-300">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}