
import React from 'react';
import { BookOpen, Users, Target, Award, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Koleksi Digital',
      description: 'Akses ribuan buku dan materi pembelajaran digital untuk mendukung literasi masyarakat'
    },
    {
      icon: Users,
      title: 'Komunitas Aktif',
      description: 'Bergabung dengan ribuan pengurus perpustakaan dari seluruh Indonesia'
    },
    {
      icon: Target,
      title: 'Misi Literasi',
      description: 'Mendukung program literasi nasional melalui jaringan perpustakaan desa/kelurahan'
    },
    {
      icon: Award,
      title: 'Standar Kualitas',
      description: 'Memberikan panduan dan standar pengelolaan perpustakaan yang berkualitas'
    }
  ];

  const achievements = [
    { number: '1,247', label: 'Perpustakaan Terdaftar' },
    { number: '3,891', label: 'Pengguna Aktif' },
    { number: '156', label: 'Diskusi Bulanan' },
    { number: '42', label: 'Program Pelatihan' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Tentang FKPDK
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-slide-in">
            Forum Komunikasi Perpustakaan Desa/Kelurahan
          </p>
          <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
            FKPDK adalah platform digital yang menghubungkan, memberdayakan, dan mengembangkan 
            perpustakaan desa dan kelurahan di seluruh Indonesia dalam mendukung gerakan literasi nasional.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20 md:mb-0">
        {/* Visi Misi Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-library-100">
              <CardHeader>
                <CardTitle className="text-2xl text-library-700 flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  Visi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi platform utama yang menghubungkan dan memberdayakan perpustakaan 
                  desa/kelurahan di Indonesia untuk menciptakan masyarakat yang literat, 
                  cerdas, dan berbudaya melalui akses informasi dan pengetahuan yang merata.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-library-100">
              <CardHeader>
                <CardTitle className="text-2xl text-library-700 flex items-center">
                  <Award className="w-6 h-6 mr-2" />
                  Misi Kami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• Memfasilitasi komunikasi antar perpustakaan desa/kelurahan</li>
                  <li>• Menyediakan platform berbagi pengetahuan dan pengalaman</li>
                  <li>• Mendukung peningkatan kualitas layanan perpustakaan</li>
                  <li>• Mengembangkan program literasi berkelanjutan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Mengapa Memilih FKPDK?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-library-100 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-library-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <Card className="bg-gradient-hero text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Pencapaian Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {achievements.map((item, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold mb-2">{item.number}</div>
                    <div className="text-sm opacity-90">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-2 border-library-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bergabunglah dengan Komunitas FKPDK
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Jadilah bagian dari gerakan literasi nasional. Daftarkan perpustakaan Anda 
                dan mulai berbagi pengalaman dengan komunitas perpustakaan di seluruh Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-library-600 hover:bg-library-700">
                  <Link to="/">
                    Mulai Sekarang
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">
                    Hubungi Kami
                  </Link>
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

export default About;
