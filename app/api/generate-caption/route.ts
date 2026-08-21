import { NextRequest, NextResponse } from 'next/server';
import { genAI } from '@/lib/gemini';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('image') as File | null;
        const tone = formData.get('tone') as string | null;
        const platform = formData.get('platform') as string | 'Instagram';

        if (!file) {
            return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Data = buffer.toString('base64');

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };

        // Prompt dipertegas agar tidak pakai Markdown
        const prompt = `Kamu adalah social media marketing. Buat SATU caption KHUSUS untuk ${platform} berdasarkan foto produk ini. 
    Gaya bahasa: ${tone}. 
    Gunakan format markdown seperti **teks tebal** untuk penekanan hal penting. Berikan hashtag yang relevan. JANGAN buat caption untuk platform lain, fokus hanya pada ${platform}.`;
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

<<<<<<< HEAD
        // 4. Panggil model Gemini (pakai 2.5 Flash karena cepat dan support gambar)
        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
        const result = await model.generateContent([prompt, imagePart]);
        const text = result.response.text();
=======
        // Ganti jadi stream
        const result = await model.generateContentStream([prompt, imagePart]);
>>>>>>> b4473ea0c0f1d585d57b1861cb84183f3fc6274b

        // Setup response sebagai stream agar front-end bisa menerimanya sepotong-sepotong
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    controller.enqueue(new TextEncoder().encode(chunkText));
                }
                controller.close();
            }
        });

        return new Response(stream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Gagal menghasilkan caption' }, { status: 500 });
    }
}