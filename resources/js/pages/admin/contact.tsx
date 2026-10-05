import { Head, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
import type { FormEvent } from 'react';
import CmsHeading from '@/components/cms-heading';
import CmsFlash from '@/components/cms-flash';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/admin/contact';
import type { Contact } from '@/types/bakoel';

export default function ContactForm({ contact }: { contact: Contact }) {
    const form = useForm({
        address: contact.address || '',
        whatsapp: contact.whatsapp || '',
        email: contact.email || '',
        opening_hours: contact.opening_hours || '',
        maps_url: contact.maps_url || '',
        instagram_url: contact.instagram_url || '',
    });
    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.put(update.url(), { preserveScroll: true });
    }
    return (
        <div className="mx-auto w-full max-w-4xl p-5 md:p-8">
            <Head title="Informasi kontak" />
            <CmsHeading
                title="Informasi kontak"
                description="Satu sumber informasi untuk halaman kontak, footer, dan tombol pemesanan."
            />
            <CmsFlash />
            <form onSubmit={submit} className="space-y-6">
                <section className="grid gap-6 rounded-xl border p-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <h2 className="font-semibold">Hubungi Bakoel Banjar</h2>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">
                            Isi informasi usaha yang sebenarnya. Kolom dapat
                            dikosongkan jika belum tersedia.
                        </p>
                    </div>
                    {[
                        {
                            key: 'whatsapp' as const,
                            label: 'Nomor WhatsApp',
                            type: 'tel',
                            placeholder: '081234567890',
                            hint: 'Nomor 08 otomatis diubah menjadi format 628.',
                        },
                        {
                            key: 'email' as const,
                            label: 'Email usaha',
                            type: 'email',
                            placeholder: 'halo@namadomain.com',
                            hint: 'Alamat untuk pertanyaan pelanggan.',
                        },
                    ].map(({ key, label, type, placeholder, hint }) => (
                        <div key={key} className="grid gap-2">
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={key}
                                type={type}
                                value={form.data[key]}
                                onChange={(e) =>
                                    form.setData(key, e.target.value)
                                }
                                placeholder={placeholder}
                                maxLength={key === 'whatsapp' ? 25 : 255}
                            />
                            <p className="text-xs text-muted-foreground">
                                {hint}
                            </p>
                            <InputError message={form.errors[key]} />
                        </div>
                    ))}
                </section>
                <section className="grid gap-6 rounded-xl border p-6 sm:grid-cols-2">
                    <h2 className="font-semibold sm:col-span-2">
                        Lokasi & jam operasional
                    </h2>
                    {[
                        {
                            key: 'address' as const,
                            label: 'Alamat lengkap',
                            placeholder:
                                'Nama jalan, nomor, kelurahan, kota, dan kode pos',
                        },
                        {
                            key: 'opening_hours' as const,
                            label: 'Jam operasional',
                            placeholder:
                                'Senin–Sabtu: 09.00–20.00\nMinggu: tutup',
                        },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key} className="grid gap-2">
                            <Label htmlFor={key}>{label}</Label>
                            <textarea
                                id={key}
                                rows={4}
                                maxLength={1000}
                                value={form.data[key]}
                                onChange={(e) =>
                                    form.setData(key, e.target.value)
                                }
                                placeholder={placeholder}
                                className="rounded-md border bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <InputError message={form.errors[key]} />
                        </div>
                    ))}
                    {[
                        {
                            key: 'maps_url' as const,
                            label: 'Tautan Google Maps / lokasi',
                            placeholder: 'https://maps.google.com/...',
                        },
                        {
                            key: 'instagram_url' as const,
                            label: 'Tautan Instagram',
                            placeholder: 'https://www.instagram.com/...',
                        },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key} className="grid gap-2">
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                                id={key}
                                type="url"
                                maxLength={1000}
                                value={form.data[key]}
                                onChange={(e) =>
                                    form.setData(key, e.target.value)
                                }
                                placeholder={placeholder}
                            />
                            <InputError message={form.errors[key]} />
                        </div>
                    ))}
                </section>
                <div className="flex justify-end">
                    <Button disabled={form.processing}>
                        <Save size={16} />
                        {form.processing
                            ? 'Menyimpan...'
                            : 'Simpan informasi kontak'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
ContactForm.layout = {
    breadcrumbs: [{ title: 'Informasi kontak', href: edit() }],
};
