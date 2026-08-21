import { NextRequest, NextResponse } from 'next/server';
import { genAI } from '@/lib/gemini';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
    try {
        // 1. Ambil Token Autentikasi dari Header
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Tidak ada akses' }, { status: 401 });
        }

        // 2. Inisialisasi Supabase khusus untuk user ini
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey, {
            global: { headers: { Authorization: authHeader } }
        });

        // 3. Verifikasi User
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'User tidak valid' }, { status: 401 });

        // 4. Ambil data profil
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('free_credits, is_premium')
            .eq('id', user.id)
            .single();

        // PENGECEKAN BARU: Pastikan profil benar-benar ditemukan
        if (profileError || !profile) {
            return NextResponse.json({ error: 'Profil tidak ditemukan. Cobalah untuk logout dan login kembali.' }, { status: 400 });
        }

        // 5. Cek Sisa Kuota
        if (!profile.is_premium && profile.free_credits <= 0) {
            return NextResponse.json({ error: 'KUOTA_HABIS' }, { status: 403 });
        }

        // 6. Proses Form Data
        const formData = await req.formData();
        const file = formData.get('image') as File | null;
        const tone = formData.get('tone') as string | null;
        const platform = formData.get('platform') as string | 'Instagram';

        if (!file) return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });

        const bytes = await file.arrayBuffer();
        const base64Data = Buffer.from(bytes).toString('base64');
        const imagePart = { inlineData: { data: base64Data, mimeType: file.type } };

        // 7. Potong Kuota di Supabase (sekarang aman karena profile pasti ada)
        if (!profile.is_premium) {
            await supabase
                .from('profiles')
                .update({ free_credits: profile.free_credits - 1 })
                .eq('id', user.id);
        }

        // 8. Jalankan AI Gemini
        const prompt = `Kamu adalah social media marketing. Buat SATU caption KHUSUS untuk ${platform} berdasarkan foto produk ini. 
    Gaya bahasa: ${tone}. 
    Gunakan format markdown seperti **teks tebal** untuk penekanan hal penting. Berikan hashtag relevan. JANGAN buat caption untuk platform lain.`;

        const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
        const result = await model.generateContentStream([prompt, imagePart]);

        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    controller.enqueue(new TextEncoder().encode(chunk.text()));
                }
                controller.close();
            }
        });

        return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Gagal menghasilkan caption' }, { status: 500 });
    }
}