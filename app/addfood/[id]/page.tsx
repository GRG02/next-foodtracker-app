'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import {
  IoArrowBackOutline,
  IoFastFoodOutline,
  IoCalendarOutline,
  IoImageOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';

type Food = {
  foodname: string;
  meal: string;
  fooddate_at: string;
  foodImage: File | null;
  user_id: string;
};

export default function Page() {

  const param = useParams();
  const user_id = param.id as string;
  const router = useRouter();

  const [formData, setFormData] = useState<Food>({
    foodname: '',
    meal: 'breakfast',
    fooddate_at: new Date().toISOString().split('T')[0],
    foodImage: null as File | null,
    user_id: user_id,
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
      setFormData((prev) => ({ ...prev, foodImage: file }));
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, foodImage: null }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = '';
    
        if (
          formData.foodname === '' ||
          formData.meal === '' ||
          formData.fooddate_at === '' ||
          !formData.foodImage
        ) {
          alert("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }
    
        try {
          // แก้ชื่อรูป
          const newFileName = `${Date.now()}-${formData.foodImage.name}`;
    
          // อัปโหลดรูปไป Supabase Storage
          const { error: uploadError } = await supabase
            .storage
            .from('food_bk')
            .upload(newFileName, formData.foodImage);
    
          if (uploadError) {
            alert(uploadError.message);
            return;
          }
    
          // ได้ public URL ของรูปที่ supabase เจนให้
          const { data: newUrl } = supabase
            .storage
            .from('food_bk')
            .getPublicUrl(newFileName);
    
          imageUrl = newUrl.publicUrl;
    
          // บันทึก food ลงตาราง
          const { data: resData, error } = await supabase
            .from('food_tb')
            .insert([
              {
                foodname: formData.foodname,
                meal: formData.meal,
                fooddate_at: formData.fooddate_at,
                food_image_url: imageUrl,
                user_id: user_id
              }
            ])
            .select();
    
          if (error) {
            console.error("Try Error:", error);
            alert("เพิ่มไม่สำเร็จ: " + error.message);
          } else {
            console.log("Registered successfully:", resData);
            alert("เพิ่มสำเร็จ");
            router.push(`/dashboard/${user_id}`);
          }
        } catch (err) {
          console.error("Other Error:", err);
          alert("เพิ่มไม่สำเร็จ: " + err);
        }
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
            <span className="text-orange-400">Add</span> Food
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <IoFastFoodOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
            <input
              type="text"
              name="foodname"
              value={formData.foodname}
              onChange={handleChange}
              placeholder="Food Name"
              required
              className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
            />
          </div>
          <div className="relative">
            <select
              name="meal"
              value={formData.meal}
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
              name="fooddate_at"
              value={formData.fooddate_at}
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
              Save Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}