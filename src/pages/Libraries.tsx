
import React, { useState } from 'react';
import { Search, MapPin, Users, BookOpen, Calendar, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import BottomNavbar from '@/components/BottomNavbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Libraries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample data - in real app, this would come from API
  const libraries = [
    {
      id: 1,
      name: 'Perpustakaan Desa Suka Maju',
      address: 'Desa Suka Maju, Kec. Ciamis, Kab. Ciamis',
      province: 'Jawa Barat',
      members: 156,
      books: 1250,
      joinedDate: '2023-01-15',
      status: 'Aktif',
      category: 'Desa',
      contact: '081234567890'
    },
    {
      id: 2,
      name: 'Perpustakaan Kelurahan Sejahtera',
      address: 'Kelurahan Sejahtera, Kec. Bandung Utara, Kab. Bandung',
      province: 'Jawa Barat',
      members: 203,
      books: 1850,
      joinedDate: '2023-02-20',
      status: 'Aktif',
      category: 'Kelurahan',
      contact: '081234567891'
    },
    {
      id: 3,
      name: 'Perpustakaan Desa Cerdas',
      address: 'Desa Cerdas, Kec. Yogyakarta, Kab. Sleman',
      province: 'DI Yogyakarta',
      members: 89,
      books: 945,
      joinedDate: '2023-03-10',
      status: 'Aktif',
      category: 'Desa',
      contact: '081234567892'
    },
    {
      id: 4,
      name: 'Perpustakaan Kelurahan Maju Bersama',
      address: 'Kelurahan Maju Bersama, Kec. Jakarta Pusat, Jakarta',
      province: 'DKI Jakarta',
      members: 342,
      books: 2100,
      joinedDate: '2023-01-08',
      status: 'Aktif',
      category: 'Kelurahan',
      contact: '081234567893'
    },
    {
      id: 5,
      name: 'Perpustakaan Desa Harapan',
      address: 'Desa Harapan, Kec. Malang, Kab. Malang',
      province: 'Jawa Timur',
      members: 125,
      books: 1100,
      joinedDate: '2023-04-05',
      status: 'Aktif',
      category: 'Desa',
      contact: '081234567894'
    },
    {
      id: 6,
      name: 'Perpustakaan Kelurahan Bahagia',
      address: 'Kelurahan Bahagia, Kec. Surabaya Timur, Surabaya',
      province: 'Jawa Timur',
      members: 289,
      books: 1750,
      joinedDate: '2023-02-15',
      status: 'Aktif',
      category: 'Kelurahan',
      contact: '081234567895'
    }
  ];

  const provinces = ['Semua Provinsi', 'Jawa Barat', 'DI Yogyakarta', 'DKI Jakarta', 'Jawa Timur'];

  const filteredLibraries = libraries.filter(library => {
    const matchesSearch = library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         library.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === 'all' || library.province === selectedProvince;
    return matchesSearch && matchesProvince;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const LibraryCard = ({ library }: { library: typeof libraries[0] }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-library-700 hover:text-library-600 line-clamp-2">
            {library.name}
          </CardTitle>
          <Badge variant={library.status === 'Aktif' ? 'default' : 'secondary'}>
            {library.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{library.address}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              <span>{library.members} anggota</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{library.books} buku</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Badge variant="outline" className="text-xs">
              {library.category}
            </Badge>
            <div className="flex items-center text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Bergabung {formatDate(library.joinedDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LibraryListItem = ({ library }: { library: typeof libraries[0] }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-library-700">{library.name}</h3>
              <Badge variant={library.status === 'Aktif' ? 'default' : 'secondary'} className="text-xs">
                {library.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {library.category}
              </Badge>
            </div>
            <div className="flex items-start text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{library.address}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{library.members}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{library.books}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(library.joinedDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Perpustakaan Bergabung
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-slide-in">
            {libraries.length} Perpustakaan Desa/Kelurahan Terdaftar
          </p>
          <p className="text-lg leading-relaxed opacity-80 max-w-3xl mx-auto">
            Temukan dan terhubung dengan perpustakaan desa/kelurahan dari seluruh Indonesia 
            yang telah bergabung dalam Forum Komunikasi Perpustakaan Desa/Kelurahan.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20 md:mb-0">
        {/* Statistics */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-library-600">{libraries.length}</div>
                <div className="text-sm text-gray-600">Total Perpustakaan</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-library-600">
                  {libraries.reduce((sum, lib) => sum + lib.members, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Anggota</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-library-600">
                  {libraries.reduce((sum, lib) => sum + lib.books, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Koleksi Buku</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-library-600">
                  {[...new Set(libraries.map(lib => lib.province))].length}
                </div>
                <div className="text-sm text-gray-600">Provinsi Terwakili</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Cari nama perpustakaan atau alamat..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Provinsi</SelectItem>
                      {provinces.slice(1).map(province => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex rounded-md border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Results */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Menampilkan {filteredLibraries.length} perpustakaan
            </h2>
          </div>

          {filteredLibraries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tidak ada perpustakaan ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah kata kunci pencarian atau filter yang Anda gunakan.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
            }>
              {filteredLibraries.map((library) => (
                viewMode === 'grid' 
                  ? <LibraryCard key={library.id} library={library} />
                  : <LibraryListItem key={library.id} library={library} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BottomNavbar />
    </div>
  );
};

export default Libraries;
