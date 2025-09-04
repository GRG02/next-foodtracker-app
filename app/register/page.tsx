'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  IoArrowBackOutline,
  IoPersonOutline,
  IoMailOutline,
  IoLockClosedOutline,
  IoTransgenderOutline,
  IoImageOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

export default function Page() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    gender: 'male',
    profileImage: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, profileImage: null }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // TODO: Add logic to handle registration, e.g., API call
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 text-white">
      <div className="w-full max-w-xl rounded-2xl bg-white/20 p-8 shadow-xl backdrop-blur-sm md:p-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-white transition-colors hover:text-gray-200">
            <IoArrowBackOutline className="mr-1 h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">
            <span className="text-orange-400">Register</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <IoPersonOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <IoMailOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <IoLockClosedOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <IoTransgenderOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full appearance-none rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold">Profile Picture</h3>
            <div className="relative flex items-center justify-center rounded-xl border-2 border-dashed border-white/50 p-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="h-40 w-40 rounded-full object-cover shadow-lg" />
                  <button
                    onClick={handleRemoveImage}
                    type="button"
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-transform duration-300 hover:scale-110"
                    aria-label="Remove image"
                  >
                    <IoCloseCircleOutline className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center text-white/80 transition-transform duration-300 hover:scale-105">
                  <input type="file" onChange={handleFileChange} accept="image/*" className="hidden" />
                  <div className="flex flex-col items-center">
                    <IoImageOutline className="h-12 w-12" />
                    <span className="mt-2 font-semibold">Choose a profile picture</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full transform rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-white">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-orange-400 underline transition-colors hover:text-orange-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}