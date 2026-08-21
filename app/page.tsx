import Link from 'next/link';
import { Sparkles, Image as ImageIcon, MessageSquare, Zap, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar Minimalis */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="font-bold text-xl text-blue-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          PromoAI
        </div>
        <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">
          Masuk
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center text-center px-6 py-12 md:py-20">
        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
          Bantu UMKM Go Digital 🚀
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          Bikin Caption Jualan <br className="hidden md:block" />
          <span className="text-blue-600">Lebih Menarik & Cepat!</span>
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Tinggal upload foto produk UMKM kamu, AI kami akan buatkan caption Instagram & TikTok yang asik, formal, atau gaul dalam hitungan detik.
        </p>

        {/* Tombol Call to Action (CTA) */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition flex items-center justify-center gap-2"
          >
            Coba Gratis Sekarang <Zap className="w-5 h-5 fill-current" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-gray-500 font-medium">
          🎁 Gratis 10x generate untuk pengguna baru.
        </p>

        {/* Section: Cara Kerja */}
        <div className="mt-24 w-full max-w-4xl text-left">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Cara Kerjanya Gampang Banget!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                <ImageIcon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">1. Upload Foto</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Foto produk makanan, pakaian, atau jasa UMKM kamu langsung dari HP.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">2. Pilih Gaya Bahasa</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mau asik, formal, atau santai? Sesuaikan dengan target audiens pelangganmu.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">3. Copy & Posting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Caption siap dipakai. Tinggal copy dan posting ke IG atau TikTok!
              </p>
            </div>
          </div>
        </div>

        {/* Section: Penawaran Premium */}
        <div className="mt-24 w-full max-w-3xl bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          {/* Efek background */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <div className="mb-8 md:mb-0 relative z-10">
            <h2 className="text-2xl font-bold mb-3">Bisnis Makin Laris, Kuota Habis?</h2>
            <ul className="text-blue-100 space-y-2 mb-6 text-sm font-medium">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-300"/> Generate caption tanpa batas (Unlimited)
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-300"/> Harga sangat terjangkau untuk UMKM
              </li>
            </ul>
            <div className="text-4xl font-extrabold">
              Rp 16.000 <span className="text-lg font-normal text-blue-200">/ tahun</span>
            </div>
          </div>
          
          <Link href="/pricing" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-gray-50 hover:scale-105 transition w-full md:w-auto text-center relative z-10">
            Lihat Detail Paket
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 text-gray-400 text-sm mt-auto border-t border-gray-200 bg-white">
        <p>© {new Date().getFullYear()} KKN Program - PromoAI. Dirancang khusus untuk memajukan UMKM.</p>
      </footer>
    </div>
  );
}