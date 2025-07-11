
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, BookOpen, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-library-50 via-white to-knowledge-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl md:text-[12rem] font-bold text-library-100 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-library-200 rounded-full flex items-center justify-center animate-bounce">
              <BookOpen className="w-12 h-12 text-library-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Halaman Tidak Ditemukan
            </h1>
            <p className="text-lg text-gray-600">
              Oops! Sepertinya halaman yang Anda cari sedang dipinjam oleh perpustakaan lain.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-library-200">
            <div className="flex items-center justify-center mb-4">
              <Compass className="w-8 h-8 text-library-600 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <p className="text-gray-700 mb-6">
              Jangan khawatir! Mari kita bantu Anda menemukan halaman yang tepat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-library-600 hover:bg-library-700">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/libraries">
                  <Search className="w-4 h-4 mr-2" />
                  Jelajahi Perpustakaan
                </Link>
              </Button>
              
              <Button asChild variant="outline">
                <Link to="/about">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tentang FKPDK
                </Link>
              </Button>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="bg-library-50 rounded-lg p-6 border border-library-100">
            <h3 className="font-semibold text-gray-900 mb-3">Halaman Populer:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <Link to="/" className="text-library-600 hover:text-library-700 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Forum Diskusi
              </Link>
              <Link to="/libraries" className="text-library-600 hover:text-library-700 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Perpustakaan Bergabung
              </Link>
              <Link to="/about" className="text-library-600 hover:text-library-700 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Tentang Kami
              </Link>
              <Link to="/contact" className="text-library-600 hover:text-library-700 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1" />
                Hubungi Kami
              </Link>
            </div>
          </div>

          {/* Fun Quote */}
          <div className="text-sm text-gray-500 italic">
            "Tidak ada buku yang hilang, hanya menunggu untuk ditemukan di rak yang tepat." 
            <br />- Pustakawan Bijak
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 left-10 opacity-20 animate-pulse">
          <BookOpen className="w-16 h-16 text-library-300" />
        </div>
        <div className="fixed bottom-20 right-10 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
          <BookOpen className="w-12 h-12 text-knowledge-300" />
        </div>
        <div className="fixed top-40 right-20 opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>
          <BookOpen className="w-8 h-8 text-library-200" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
