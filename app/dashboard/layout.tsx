'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Sparkles, LogOut, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header Dashboard */}
            <header className="w-full bg-white shadow-sm py-4 px-4 md:px-6 flex justify-between items-center sticky top-0 z-50">
                <Link href="/dashboard" className="font-bold text-lg md:text-xl text-blue-600 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                    PromoAI
                </Link>

                <div className="flex items-center gap-4">
                    {/* Placeholder Sisa Kuota (nanti kita fetch dari Supabase) */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                        <Zap className="w-4 h-4" />
                        <span>10 Kredit</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-red-500 transition flex items-center gap-1.5 text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Keluar</span>
                    </button>
                </div>
            </header>

            {/* Konten Utama */}
            <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
} 