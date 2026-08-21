'use client';

import { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Send, Copy, CheckCircle2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/lib/supabase'; // INI YANG BIKIN ERROR TADI (Sekarang sudah ditambahkan)

export default function DashboardPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tone, setTone] = useState('asik');
    const [platform, setPlatform] = useState('Instagram');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleGenerate = async () => {
        if (!imageFile) return;

        setIsGenerating(true);
        setResult('');

        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('tone', tone);
            formData.append('platform', platform);

            // Ambil token untuk dikirim ke backend
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            const response = await fetch('/api/generate-caption', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                if (errorData.error === 'KUOTA_HABIS') {
                    throw new Error('Kuota gratis kamu sudah habis! Yuk berlangganan untuk akses tanpa batas.');
                }
                throw new Error(errorData.error || 'Terjadi kesalahan dari server');
            }

            if (!response.body) throw new Error('Tidak ada response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let streamedResult = '';

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                if (value) {
                    const chunkValue = decoder.decode(value);
                    streamedResult += chunkValue;
                    setResult(streamedResult);
                }
            }

        } catch (error: any) {
            setResult(`Maaf, ada kendala: ${error.message}\n\nCoba beberapa saat lagi ya!`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Buat Caption Baru</h1>
                <p className="text-gray-500 mt-2 text-sm md:text-base">Upload foto produk dan biarkan AI merangkai kata-kata manis untuk promosi kamu.</p>
            </div>

            <div className="bg-white p-5 md:p-7 rounded-3xl shadow-sm border border-gray-100">

                {/* Upload Gambar */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Foto Produk</label>
                    {!imagePreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                                <p className="mb-2 text-sm text-gray-500 font-medium">Klik untuk upload foto</p>
                                <p className="text-xs text-gray-400">PNG, JPG atau WEBP (Maks. 4MB)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                        </label>
                    ) : (
                        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-200">
                            <Image src={imagePreview} alt="Preview Produk" fill className="object-contain bg-gray-100" />
                            <button
                                onClick={clearImage}
                                className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-700 hover:text-red-600 hover:bg-white transition shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Target Platform */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Platform</label>
                    <div className="relative">
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="block w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3.5 px-4 pr-8 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
                        >
                            <option value="Instagram">📸 Instagram (Fokus visual & hashtag)</option>
                            <option value="TikTok">🎵 TikTok (Singkat, fyp, & engaging)</option>
                            <option value="Twitter">🐦 Twitter / X (Cocok untuk thread & viral)</option>
                            <option value="Facebook">📘 Facebook (Lebih detail & kekeluargaan)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Gaya Bahasa */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gaya Bahasa Promosi</label>
                    <div className="relative">
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="block w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-3.5 px-4 pr-8 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent font-medium"
                        >
                            <option value="asik">😎 Asik & Gaul (Cocok buat anak muda)</option>
                            <option value="storytelling">📖 Storytelling (Bercerita & Emosional)</option>
                            <option value="hardsell">🔥 Hard Selling (Fokus ke Diskon & Promosi)</option>
                            <option value="formal">👔 Formal & Profesional (Cocok buat jasa/B2B)</option>
                            <option value="lucu">😂 Lucu & Menghibur (Mancing interaksi)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={!imageFile || isGenerating}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGenerating ? <span className="animate-pulse">AI Sedang Berpikir... 🧠</span> : <>Generate Caption <Send className="w-5 h-5" /></>}
                </button>
            </div>

            {result && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8 rounded-3xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-4 border-b border-blue-200 pb-4">
                        <h3 className="font-bold text-blue-900 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" /> Hasil Caption {platform}
                        </h3>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1.5 text-sm font-semibold text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition shadow-sm"
                        >
                            {isCopied ? <><CheckCircle2 className="w-4 h-4 text-green-600" /> Dicopy!</> : <><Copy className="w-4 h-4" /> Copy</>}
                        </button>
                    </div>
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => <span className="font-extrabold text-gray-900" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />
                            }}
                        >
                            {result}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}