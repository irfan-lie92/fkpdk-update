import React from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Calendar,
  FileText,
  TrendingUp,
  Bell,
  MapPin,
  Heart,
  Award,
  HelpCircle,
  Settings
} from 'lucide-react';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import StatsCard from '@/components/StatsCard';
import FeatureCard from '@/components/FeatureCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const stats = [
    { title: 'Total Perpustakaan', value: '1,247', icon: BookOpen, trend: '+12% bulan ini' },
    { title: 'Pengguna Aktif', value: '3,891', icon: Users, trend: '+8% bulan ini' },
    { title: 'Diskusi Aktif', value: '156', icon: MessageSquare, trend: '+23% bulan ini' },
    { title: 'Kegiatan Bulan Ini', value: '42', icon: Calendar, trend: '+15% dari target' },
  ];

  const features = [
    {
      title: 'Forum Diskusi',
      description: 'Diskusikan berbagai topik seputar perpustakaan, koleksi, dan kegiatan literasi',
      icon: MessageSquare,
      gradient: 'bg-gradient-library'
    },
    {
      title: 'Pengumuman',
      description: 'Dapatkan informasi terbaru tentang kegiatan, pelatihan, dan pengembangan',
      icon: Bell,
      gradient: 'bg-gradient-knowledge'
    },
    {
      title: 'Manajemen Dokumen',
      description: 'Kelola SOP, panduan, laporan, dan bahan pelatihan dengan mudah',
      icon: FileText,
      gradient: 'bg-gradient-library'
    },
    {
      title: 'Agenda Kegiatan',
      description: 'Lihat dan kelola kalender kegiatan perpustakaan di wilayah Anda',
      icon: Calendar,
      gradient: 'bg-gradient-knowledge'
    },
    {
      title: 'Direktori Perpustakaan',
      description: 'Temukan informasi lengkap perpustakaan desa/kelurahan di Indonesia',
      icon: MapPin,
      gradient: 'bg-gradient-library'
    },
    {
      title: 'Berita & Artikel',
      description: 'Baca berita terbaru dan artikel inspiratif seputar dunia literasi',
      icon: FileText,
      gradient: 'bg-gradient-knowledge'
    },
    {
      title: 'Koleksi Referensi',
      description: 'Akses koleksi digital dan rekomendasi bacaan unggulan',
      icon: BookOpen,
      gradient: 'bg-gradient-library',
      comingSoon: true
    },
    {
      title: 'Statistik & Laporan',
      description: 'Lihat rekap dan analisis aktivitas forum serta perpustakaan',
      icon: TrendingUp,
      gradient: 'bg-gradient-knowledge',
      comingSoon: true
    },
    {
      title: 'Chat & Pesan',
      description: 'Komunikasi langsung dengan sesama pengurus perpustakaan',
      icon: MessageSquare,
      gradient: 'bg-gradient-library',
      comingSoon: true
    },
    {
      title: 'Pusat Bantuan',
      description: 'FAQ, tutorial, dan panduan penggunaan aplikasi FKPDK',
      icon: HelpCircle,
      gradient: 'bg-gradient-knowledge'
    }
  ];

  const recentDiscussions = [
    {
      title: 'Tips Meningkatkan Minat Baca Anak-anak',
      author: 'Siti Nurhaliza',
      location: 'Perpustakaan Desa Suka Maju',
      replies: 24,
      time: '2 jam lalu'
    },
    {
      title: 'Implementasi Sistem Digital di Perpustakaan Kecil',
      author: 'Ahmad Fauzi',
      location: 'Perpustakaan Kelurahan Sejahtera',
      replies: 18,
      time: '4 jam lalu'
    },
    {
      title: 'Pengalaman Mengorganisir Event Literasi',
      author: 'Maya Sari',
      location: 'Perpustakaan Desa Cerdas',
      replies: 31,
      time: '6 jam lalu'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Selamat Datang di FKPDK
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 animate-slide-in">
            Forum Komunikasi Perpustakaan Desa/Kelurahan
          </p>
          <p className="text-base mb-8 opacity-80 max-w-2xl mx-auto">
            Platform digital untuk menghubungkan, berbagi, dan mengembangkan perpustakaan desa/kelurahan 
            di seluruh Indonesia dalam mendukung gerakan literasi nasional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-library-700 hover:bg-gray-100">
              Mulai Berdiskusi
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-library-700 font-semibold">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0">
        {/* Statistics Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Discussions */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Diskusi Terbaru</h2>
            <Button variant="outline">Lihat Semua</Button>
          </div>
          <div className="space-y-4">
            {recentDiscussions.map((discussion, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 hover:text-library-600">
                      {discussion.title}
                    </h3>
                    <Badge variant="secondary">{discussion.replies} balasan</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {discussion.author}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {discussion.location}
                    </span>
                    <span>{discussion.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitur Aplikasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <Card className="bg-gradient-hero text-white">
            <CardHeader>
              <CardTitle className="text-xl">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Buat Diskusi Baru
                </Button>
                <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Dokumen
                </Button>
                <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tambah Kegiatan
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Index;
