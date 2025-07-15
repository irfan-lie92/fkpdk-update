
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const librarySchema = z.object({
  name: z.string().min(2, 'Nama perpustakaan minimal 2 karakter'),
  address: z.string().min(5, 'Alamat minimal 5 karakter'),
  contact_person: z.string().min(2, 'Nama kontak minimal 2 karakter'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  email: z.string().email('Format email tidak valid'),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
});

type LibraryFormData = z.infer<typeof librarySchema>;

interface LibraryFormProps {
  library?: any;
  onSubmit: (data: LibraryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const LibraryForm: React.FC<LibraryFormProps> = ({ 
  library, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const form = useForm<LibraryFormData>({
    resolver: zodResolver(librarySchema),
    defaultValues: {
      name: library?.name || '',
      address: library?.address || '',
      contact_person: library?.contact_person || '',
      phone: library?.phone || '',
      email: library?.email || '',
      status: library?.status || 'pending',
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {library ? 'Edit Perpustakaan' : 'Tambah Perpustakaan Baru'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perpustakaan</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama perpustakaan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan alamat lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kontak</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama kontak person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Masukkan alamat email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {library && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : library ? 'Update' : 'Tambah'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Batal
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LibraryForm;
