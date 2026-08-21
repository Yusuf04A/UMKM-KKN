import Link from 'next/link';
import { Sparkles, Image as ImageIcon, MessageSquare, Zap, CheckCircle, ChevronRight, HelpCircle, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans scroll-smooth">
      {/* Navbar Lengkap */}
      <header className="w-full bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
        <div className="font-bold text-xl text-blue-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          PromoAI
        </div>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#fitur" className="hover:text-blue-600 transition">Fitur</a>
          <a href="#cara-kerja" className="hover:text-blue-600 transition">Cara Kerja</a>
          <a href="#testimoni" className="hover:text-blue-600 transition">Testimoni</a>
          <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-blue-600 transition">
            Masuk
          </Link>
          {/* Tombol ini arahnya ke dashboard. Kalau belum login, middleware layout akan melempar ke /login */}
          <Link href="/dashboard" className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
            Coba Gratis
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="w-full flex flex-col items-center text-center px-6 py-20 md:py-32 max-w-5xl mx-auto">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6 uppercase">
            Bantu UMKM Go Digital 🚀
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Bikin Caption Jualan <br className="hidden md:block" />
            <span className="text-blue-600 bg-blue-50 px-2 rounded-lg">Lebih Menarik & Cepat!</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
            Tinggalkan kebingungan merangkai kata. Upload foto produk UMKM kamu, AI kami akan buatkan caption Instagram & TikTok yang asik, formal, atau gaul dalam hitungan detik.
          </p>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Mulai Buat Caption <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-gray-500 font-medium">🎁 Gratis 10x generate untuk pengguna baru.</p>
        </section>

        {/* Fitur Utama Section */}
        <section id="fitur" className="w-full bg-white py-20 px-6 border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kenapa Memilih PromoAI?</h2>
              <p className="text-gray-500">Dirancang khusus untuk kebutuhan cepat para pelaku usaha mikro.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Super Cepat</h3>
                <p className="text-gray-600 leading-relaxed">Tidak perlu mikir berjam-jam. Dapatkan teks promosi yang menarik kurang dari 10 detik.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Spesifik Platform</h3>
                <p className="text-gray-600 leading-relaxed">Caption untuk Instagram berbeda dengan TikTok. Kami menyesuaikan format dan gaya bahasanya.</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Harga Terjangkau</h3>
                <p className="text-gray-600 leading-relaxed">Coba gratis 10x, lalu cukup bayar Rp 16.000/tahun untuk akses tanpa batas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cara Kerja Section */}
        <section id="cara-kerja" className="w-full py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">3 Langkah Mudah</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl font-black">1</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Upload Foto</h3>
                <p className="text-gray-600">Pilih foto produk terbaikmu dari galeri HP.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl font-black">2</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Pilih Tone</h3>
                <p className="text-gray-600">Mau asik, lucu, atau formal? Tinggal sesuaikan.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl font-black">3</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Copy & Posting</h3>
                <p className="text-gray-600">Teks lengkap dengan hashtag siap diposting!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimoni Dummy */}
        <section id="testimoni" className="w-full bg-white py-20 px-6 border-y border-gray-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Kata Mereka yang Sudah Pakai</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl">
                <div className="flex text-yellow-400 mb-4"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                <p className="italic text-gray-700 mb-4">"Awalnya bingung tiap mau upload foto gorengan di IG harus nulis apa. Semenjak pake ini, tinggal klik, caption lucu langsung jadi. Jualan makin laris!"</p>
                <div className="font-bold text-sm text-gray-900">- Bu Siti, Warung Makan Marem</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl">
                <div className="flex text-yellow-400 mb-4"><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /></div>
                <p className="italic text-gray-700 mb-4">"Sangat ngebantu buat bikin konten TikTok harian. Gaya bahasa asiknya pas banget buat target pasar anak muda di toko kopi saya."</p>
                <div className="font-bold text-sm text-gray-900">- Andi, Owner Kedai Kopi Senja</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-20 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-10">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900">Tanya Jawab</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Apakah aplikasi ini benar-benar gratis?</h4>
                <p className="text-gray-600 text-sm">Ya, kamu mendapatkan 10 kredit (10x generate) secara gratis setelah mendaftar. Jika habis, kamu bisa berlangganan akun Premium.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Berapa harga langganan Premium?</h4>
                <p className="text-gray-600 text-sm">Hanya Rp 16.000 per tahun. Dengan itu, kamu bisa menggunakan AI kami tanpa batasan kuota setiap harinya.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Apakah foto produk saya disimpan?</h4>
                <p className="text-gray-600 text-sm">Tidak. Foto yang kamu upload langsung diproses oleh AI dan tidak disimpan permanen di server kami demi menjaga privasi UMKM.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Penawaran Premium (CTA Bawah) */}
        <section className="w-full py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-10 text-white shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>

            <div className="mb-8 md:mb-0 relative z-10">
              <h2 className="text-3xl font-bold mb-3">Siap Tingkatkan Penjualan?</h2>
              <p className="text-blue-100 mb-6 font-medium">Bikin caption menarik tanpa pusing, mulai dari Rp 16.000/tahun.</p>
              <div className="text-4xl font-extrabold">
                Rp 16.000 <span className="text-lg font-normal text-blue-200">/ tahun</span>
              </div>
            </div>

            <Link href="/dashboard" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition w-full md:w-auto text-center relative z-10 whitespace-nowrap">
              Coba Sekarang
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 bg-gray-900 text-gray-400 text-sm text-center border-t border-gray-800 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <Sparkles className="w-5 h-5 text-blue-500" /> PromoAI
          </div>
          <p>© {new Date().getFullYear()} KKN Program - Dirancang khusus untuk kemajuan UMKM.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition">Bantuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}