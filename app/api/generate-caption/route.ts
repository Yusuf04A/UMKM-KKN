import { NextRequest, NextResponse } from 'next/server';
import { genAI } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        // 1. Ambil data dari request frontend
        const formData = await req.formData();
        const file = formData.get('image') as File | null;
        const tone = formData.get('tone') as string | null;

        if (!file) {
            return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });
        }

        // 2. Ubah file gambar menjadi format Base64 yang bisa dibaca Gemini
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString('base64');

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };

        // 3. Siapkan Prompt / Perintah untuk AI
        const prompt = `Kamu adalah seorang ahli social media marketing yang kreatif. Buatkan caption Instagram dan TikTok untuk foto produk UMKM ini. 
    Gunakan gaya bahasa: ${tone}. 
    Buat paragraf yang menarik, sertakan ajakan bertindak (Call to Action), dan tambahkan hashtag yang relevan. Jangan terlalu panjang, pastikan pas untuk dibaca di HP.`;

        // 4. Panggil model Gemini (pakai 1.5 Flash karena cepat dan support gambar)
        const model = genAI.getGenerativeModel({ model: 'gemini-3.7-flash' });
        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();

        // 5. Kembalikan hasil teks ke frontend
        return NextResponse.json({ caption: text });

    } catch (error) {
        console.error('Error generating caption:', error);
        return NextResponse.json({ error: 'Gagal menghasilkan caption. Coba lagi ya!' }, { status: 500 });
    }
}