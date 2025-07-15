
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import LibraryForm from '@/components/LibraryForm';

const AdminLibraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const { toast } = useToast();

  // Fetch libraries
  const fetchLibraries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/libraries');
      const data = await response.json();
      if (data.success) {
        setLibraries(data.data);
      } else {
        toast({
          title: "Error",
          description: "Gagal mengambil data perpustakaan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching libraries:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengambil data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new library
  const handleAddLibrary = async (data) => {
    setFormLoading(true);
    try {
      const response = await fetch('/api/libraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Sukses",
          description: "Perpustakaan berhasil ditambahkan",
        });
        setShowForm(false);
        fetchLibraries();
      } else {
        toast({
          title: "Error",
          description: result.message || "Gagal menambahkan perpustakaan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding library:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan data",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Update library
  const handleUpdateLibrary = async (data) => {
    if (!selectedLibrary) return;
    
    setFormLoading(true);
    try {
      const response = await fetch(`/api/libraries/${selectedLibrary.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Sukses",
          description: "Perpustakaan berhasil diupdate",
        });
        setSelectedLibrary(null);
        setShowForm(false);
        fetchLibraries();
      } else {
        toast({
          title: "Error",
          description: result.message || "Gagal mengupdate perpustakaan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating library:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengupdate data",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  // Delete library
  const handleDeleteLibrary = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus perpustakaan ini?')) return;
    
    try {
      const response = await fetch(`/api/libraries/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Sukses",
          description: "Perpustakaan berhasil dihapus",
        });
        fetchLibraries();
      } else {
        toast({
          title: "Error",
          description: result.message || "Gagal menghapus perpustakaan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting library:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus data",
        variant: "destructive",
      });
    }
  };

  // Filter libraries based on search term
  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    library.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    library.contact_person.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Perpustakaan</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Perpustakaan
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari perpustakaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Libraries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Perpustakaan ({filteredLibraries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Memuat data...</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Telepon</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLibraries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Tidak ada data perpustakaan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLibraries.map((library) => (
                      <TableRow key={library.id}>
                        <TableCell className="font-medium">{library.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{library.address}</TableCell>
                        <TableCell>{library.contact_person}</TableCell>
                        <TableCell>{library.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(library.status)}>
                            {library.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedLibrary(library);
                                setShowForm(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteLibrary(library.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <LibraryForm
            library={selectedLibrary}
            onSubmit={selectedLibrary ? handleUpdateLibrary : handleAddLibrary}
            onCancel={() => {
              setShowForm(false);
              setSelectedLibrary(null);
            }}
            isLoading={formLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLibraries;
