'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Sparkles, LogOut, Zap, Crown, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [credits, setCredits] = useState<number | null>(null);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('profiles')
                    .select('free_credits, is_premium')
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setCredits(data.free_credits);
                    setIsPremium(data.is_premium);
                }
            } else {
                router.push('/login');
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <header className="w-full bg-white shadow-sm py-4 px-4 md:px-6 flex justify-between items-center sticky top-0 z-50">

                {/* Logo dan Tombol Home */}
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="font-bold text-lg md:text-xl text-blue-600 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                        PromoAI
                    </Link>

                    <Link href="/" className="hidden sm:flex text-gray-500 hover:text-blue-600 items-center gap-1.5 text-sm font-medium transition">
                        <Home className="w-4 h-4" /> Beranda
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* Indikator Kuota */}
                    {isPremium ? (
                        <div className="hidden sm:flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-yellow-200">
                            <Crown className="w-4 h-4" />
                            <span>Premium</span>
                        </div>
                    ) : (
                        credits !== null && (
                            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${credits > 0 ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                <Zap className="w-4 h-4" />
                                <span>{credits} Kredit</span>
                            </div>
                        )
                    )}

                    <button
                        onClick={handleLogout}
                        className="text-gray-500 hover:text-red-500 transition flex items-center gap-1.5 text-sm font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Keluar</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}