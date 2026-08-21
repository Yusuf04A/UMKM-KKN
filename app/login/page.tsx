'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setIsSuccess(false);

        // Menggunakan Magic Link Supabase
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                // Arahkan ke dashboard setelah login berhasil
                emailRedirectTo: `${window.location.origin}/dashboard`,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setIsSuccess(true);
            setMessage('Link ajaib telah dikirim! Cek kotak masuk email kamu.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 font-sans">
            {/* Tombol kembali ke Beranda */}
            <Link href="/" className="absolute top-6 left-6 text-gray-500 hover:text-blue-600 font-medium text-sm flex items-center gap-2">
                &larr; Kembali
            </Link>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Masuk ke PromoAI</h1>
                    <p className="text-gray-500 text-center mt-2 text-sm">
                        Masukkan email kamu. Kami akan mengirimkan tautan ajaib agar kamu bisa langsung masuk tanpa password.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                            Email Bisnismu
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                                placeholder="umkm@contoh.com"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Mengirim...' : 'Kirim Link Masuk'}
                        {!loading && <ArrowRight className="w-5 h-5" />}
                    </button>
                </form>

                {/* Notifikasi setelah submit */}
                {message && (
                    <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 text-sm font-medium ${isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {isSuccess && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}