'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    IoAddCircleOutline,
    IoSearchOutline,
    IoPencilOutline,
    IoTrashOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
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

const ITEMS_PER_PAGE = 5;

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [foods, setFoods] = useState(MOCK_FOOD_DATA);

    const filteredFoods = foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredFoods.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentFoods = filteredFoods.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            setFoods(foods.filter((food) => food.id !== id));
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4 pt-12 text-white">
            <div className="w-full max-w-5xl rounded-2xl bg-white/20 p-8 shadow-xl backdrop-blur-sm md:p-12">
                {/* Header Section with Search and Add Food Button */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h1 className="text-4xl font-bold">
                        <span className="text-orange-400">Food</span> Dashboard
                    </h1>
                    <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search food by name..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full rounded-full border-2 border-transparent bg-white/40 p-3 pl-10 text-white placeholder-white/80 outline-none transition-colors duration-300 focus:border-white focus:bg-white/50"
                            />
                            <IoSearchOutline className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/80" />
                        </div>
                        <Link
                            href="/addfood"
                            className="flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-100"
                        >
                            <IoAddCircleOutline className="mr-2 h-5 w-5" />
                            Add Food
                        </Link>
                    </div>
                </div>

                {/* Food List Table */}
                <div className="mt-8 overflow-x-auto">
                    <table className="min-w-full table-auto rounded-lg bg-white/10 text-left text-sm md:text-base">
                        <thead>
                            <tr className="bg-white/20">
                                <th className="px-4 py-3 font-semibold">วันที่</th>
                                <th className="px-4 py-3 font-semibold">รูปอาหาร</th>
                                <th className="px-4 py-3 font-semibold">ชื่ออาหาร</th>
                                <th className="px-4 py-3 font-semibold">มื้ออาหาร</th>
                                <th className="px-4 py-3 font-semibold text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentFoods.length > 0 ? (
                                currentFoods.map((food) => (
                                    <tr key={food.id} className="border-t border-white/10 transition-colors hover:bg-white/20">
                                        <td className="px-4 py-4">{food.date}</td>
                                        <td className="px-4 py-4">
                                            <Image
                                                src={food.imageUrl}
                                                alt={food.name}
                                                width={64}
                                                height={64}
                                                className="h-16 w-16 rounded-lg object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-4">{food.name}</td>
                                        <td className="px-4 py-4">{food.meal}</td>
                                        <td className="flex justify-end gap-2 px-4 py-4">
                                            <Link
                                                href={`/updatefood/${food.id}`}
                                                className="rounded-full bg-blue-500 p-2 text-white transition-transform hover:scale-110"
                                                title="Edit"
                                            >
                                                <IoPencilOutline className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(food.id)}
                                                className="rounded-full bg-red-500 p-2 text-white transition-transform hover:scale-110"
                                                title="Delete"
                                            >
                                                <IoTrashOutline className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-white/70">
                                        No food items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredFoods.length > ITEMS_PER_PAGE && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 disabled:opacity-50"
                        >
                            <IoChevronBackOutline className="h-5 w-5" />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`h-8 w-8 rounded-full font-semibold transition-colors ${currentPage === index + 1 ? 'bg-white text-blue-600' : 'text-white/80 hover:bg-white/20'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/20 disabled:opacity-50"
                        >
                            <IoChevronForwardOutline className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}