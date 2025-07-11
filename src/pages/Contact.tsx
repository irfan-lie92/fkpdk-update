
import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat Sekretariat',
      content: 'Jl. RE.Martadinata-Ancaran Nomor 524, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511',
      color: 'text-red-600'
    },
    {
      icon: Phone,
      title: 'Nomor Telepon',
      content: '081461208098',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@fkpdk.org',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08.00 - 17.00 WIB\nSabtu: 08.00 - 12.00 WIB',
      color: 'text-purple-600'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Pesan Anda telah dikirim! Kami akan segera menghubungi Anda.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Hubungi Kami
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-slide-in">
            Sekretariat FKPDK siap membantu Anda
          </p>
          <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
            Kami siap membantu menjawab pertanyaan Anda seputar pengelolaan perpustakaan, 
            program literasi, dan layanan FKPDK lainnya.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20 md:mb-0">
        {/* Contact Info Cards */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-library-700 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  Kirim Pesan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="nama@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subjek *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        placeholder="Subjek pesan Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Pesan *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tulis pesan Anda di sini..."
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-library-600 hover:bg-library-700">
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Map Section */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-library-700 flex items-center">
                  <MapPin className="w-6 h-6 mr-2" />
                  Lokasi Sekretariat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Alamat Lengkap:</h4>
                    <p className="text-gray-700">
                      Jl. RE.Martadinata-Ancaran Nomor 524<br />
                      Kuningan, Kec. Kuningan<br />
                      Kabupaten Kuningan, Jawa Barat 45511
                    </p>
                  </div>
                  
                  {/* Embedded Google Maps */}
                  <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.4426157789777!2d108.48019741477345!3d-6.825689995004887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f2e35c7b4f1b5%3A0x5c4c4c4c4c4c4c4c!2sJl.%20RE.%20Martadinata%2C%20Ancaran%2C%20Kec.%20Kuningan%2C%20Kabupaten%20Kuningan%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1640995200000!5m2!1sid!2sid"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi Sekretariat FKPDK"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Provinsi:</span>
                      <p className="text-gray-600">Jawa Barat</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Kode Pos:</span>
                      <p className="text-gray-600">45511</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Additional Info */}
        <section className="mt-12">
          <Card className="bg-library-50 border-library-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-library-700 mb-4">Informasi Tambahan</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Layanan yang Tersedia:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Konsultasi pengelolaan perpustakaan</li>
                    <li>• Pelatihan dan workshop</li>
                    <li>• Pendampingan teknis</li>
                    <li>• Bantuan teknis sistem digital</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cara Terbaik Menghubungi:</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• WhatsApp: 081461208098 (respon cepat)</li>
                    <li>• Email: untuk dokumen dan proposal</li>
                    <li>• Kunjungan: dengan perjanjian terlebih dahulu</li>
                    <li>• Forum online: untuk diskusi umum</li>
                  </ul>
                </div>
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

export default Contact;
