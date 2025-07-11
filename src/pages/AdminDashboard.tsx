
import React from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Calendar,
  FileText,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Perpustakaan', value: '1,247', icon: BookOpen, trend: '+12%', color: 'text-blue-600' },
    { title: 'Pengguna Aktif', value: '3,891', icon: Users, trend: '+8%', color: 'text-green-600' },
    { title: 'Diskusi Aktif', value: '156', icon: MessageSquare, trend: '+23%', color: 'text-purple-600' },
    { title: 'Kegiatan Bulan Ini', value: '42', icon: Calendar, trend: '+15%', color: 'text-orange-600' },
  ];

  const recentActivities = [
    { action: 'Pengguna baru mendaftar', user: 'Siti Nurhaliza', time: '5 menit lalu', type: 'user' },
    { action: 'Diskusi baru dibuat', user: 'Ahmad Fauzi', time: '10 menit lalu', type: 'discussion' },
    { action: 'Dokumen diupload', user: 'Maya Sari', time: '15 menit lalu', type: 'document' },
    { action: 'Event dijadwalkan', user: 'Budi Santoso', time: '20 menit lalu', type: 'event' },
  ];

  const pendingApprovals = [
    { title: 'Perpustakaan Desa Makmur', type: 'Registrasi Perpustakaan', time: '2 jam lalu' },
    { title: 'Laporan Kegiatan Literasi', type: 'Upload Dokumen', time: '4 jam lalu' },
    { title: 'Event Workshop Digital', type: 'Jadwal Kegiatan', time: '6 jam lalu' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/c64a87eb-26e1-4649-8154-db1f83658787.png" 
                alt="FKPDK Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-xs text-gray-600">FKPDK Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  type="text" 
                  placeholder="Cari pengguna, diskusi, atau dokumen..."
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Selamat Datang, Administrator</h2>
          <p className="text-gray-600">Kelola platform FKPDK dan pantau aktivitas pengguna</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-xs font-medium ${stat.color}`}>{stat.trend}</p>
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">oleh {activity.user}</p>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Menunggu Persetujuan
                <Badge variant="secondary">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-600">{item.type}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Tolak</Button>
                      <Button size="sm">Setuju</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Kelola Pengguna
              </Button>
              <Button className="justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Moderasi Forum
              </Button>
              <Button className="justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Kelola Dokumen
              </Button>
              <Button className="justify-start" variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Lihat Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
