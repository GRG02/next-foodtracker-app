'use client';

import { useState, useEffect, use } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  IoArrowBackOutline,
  IoFastFoodOutline,
  IoCalendarOutline,
  IoImageOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

// Mock Data สำหรับทดสอบ
const MOCK_FOOD_DATA = [
    { id: 1, date: '2025-09-01', name: 'ข้าวผัดกะเพรา', meal: 'มื้อกลางวัน', imageUrl: 'https://cdn.pixabay.com/photo/2023/05/30/16/57/taco-8029161_640.png' },
    { id: 2, date: '2025-09-01', name: 'สเต็กปลาแซลมอน', meal: 'มื้อเย็น', imageUrl: 'https://cdn.pixabay.com/photo/2017/03/10/13/57/cooking-2132874_1280.jpg' },
    { id: 3, date: '2025-09-02', name: 'สลัดผักอกไก่', meal: 'มื้อเช้า', imageUrl: 'https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_640.jpg' },
    { id: 4, date: '2025-09-02', name: 'แกงเขียวหวานไก่', meal: 'มื้อกลางวัน', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 5, date: '2025-09-03', name: 'ข้าวไข่เจียว', meal: 'มื้อเช้า', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 6, date: '2025-09-03', name: 'ก๋วยเตี๋ยวเรือ', meal: 'มื้อกลางวัน', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 7, date: '2025-09-04', name: 'ซุปเห็ด', meal: 'มื้อเย็น', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 8, date: '2025-09-04', name: 'ข้าวมันไก่', meal: 'มื้อกลางวัน', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 9, date: '2025-09-05', name: 'ต้มยำกุ้ง', meal: 'มื้อเย็น', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 10, date: '2025-09-05', name: 'ผัดไทย', meal: 'มื้อกลางวัน', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 11, date: '2025-09-06', name: 'ข้าวผัด', meal: 'มื้อเช้า', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
    { id: 12, date: '2025-09-06', name: 'พิซซ่า', meal: 'มื้อเย็น', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_640.jpg' },
];

export default function Page({params}:{params:Promise<{id:string}>}) {
  const { id } = use(params);
  const foodId = parseInt(id as string);

  const [formData, setFormData] = useState({
    foodName: '',
    mealType: '',
    foodDate: '',
    foodImage: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // ในการใช้งานจริง: ดึงข้อมูลจาก API ด้วย foodId
    const existingFood = MOCK_FOOD_DATA.find((food) => food.id === foodId);
    
    if (existingFood) {
      setFormData({
        foodName: existingFood.name,
        mealType: existingFood.meal,
        foodDate: existingFood.date,
        foodImage: null, // ไม่มีข้อมูลไฟล์รูปภาพจาก API
      });
      setPreviewUrl(existingFood.imageUrl);
    } else {
      // หากไม่พบข้อมูล ให้แสดงหน้า 404
      notFound();
    }
  }, [foodId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({ ...prev, foodImage: file }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, foodImage: null }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Updating food item with ID ${foodId}:`, formData);
    // TODO: Add logic to update food data via API
    // Redirect to dashboard after successful update
    // router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 text-white">
      <div className="w-full max-w-xl rounded-2xl bg-white/20 p-8 shadow-xl backdrop-blur-sm md:p-12">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center text-white transition-colors hover:text-gray-200">
            <IoArrowBackOutline className="mr-1 h-5 w-5" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold md:text-4xl">
            <span className="text-orange-400">Edit</span> Food
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <IoFastFoodOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="Food Name"
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 text-white outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div className="relative">
            <IoCalendarOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="date"
              name="foodDate"
              value={formData.foodDate}
              onChange={handleChange}
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-semibold">Food Image</h3>
            <div className="relative flex items-center justify-center rounded-xl border-2 border-dashed border-white/50 p-4">
              {previewUrl ? (
                <div className="relative">
                  <img src={previewUrl} alt="Preview" className="h-40 w-40 rounded-lg object-cover shadow-lg" />
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
                    <span className="mt-2 font-semibold">Choose a food image</span>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full transform rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}