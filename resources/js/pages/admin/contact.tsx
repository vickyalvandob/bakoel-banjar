import { Head, useForm } from '@inertiajs/react';
import { ArrowUpRight, Check, MapPin, Save } from 'lucide-react';
import type { FormEvent } from 'react';
import CmsFlash from '@/components/cms-flash';
import CmsHeading from '@/components/cms-heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/admin/contact';
import type { Contact } from '@/types/bakoel';

export default function ContactForm({ contact }: { contact: Contact }) {
    const form = useForm({
        address: contact.address || '', whatsapp: contact.whatsapp || '',
        email: contact.email || '', opening_hours: contact.opening_hours || '',
        maps_url: contact.maps_url || '', instagram_url: contact.instagram_url || '',
    });
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.put(update.url(), { preserveScroll: true, onSuccess: () => form.setDefaults() });
    }
    return (
        <div className="cms-page">
            <Head title="Informasi kontak" />
            <CmsHeading title="Informasi kontak" description="Kelola cara pelanggan menghubungi dan menemukan usaha Anda." />
            <CmsFlash />
            <form onSubmit={submit} className="grid items-start gap-5 lg:grid-cols-[1.65fr_1fr]">
                <div className="space-y-5">
                    <section className="cms-panel p-5 sm:p-6">
                        <h2 className="text-sm font-semibold">Kontak utama</h2>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">Gunakan nomor dan email aktif untuk menerima pertanyaan pelanggan.</p>
                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            {[
                                { key: 'whatsapp' as const, label: 'Nomor WhatsApp', type: 'tel', placeholder: '081234567890', hint: 'Nomor 08 otomatis diubah menjadi 628.' },
                                { key: 'email' as const, label: 'Email usaha', type: 'email', placeholder: 'halo@namadomain.com', hint: 'Kosongkan jika belum tersedia.' },
                            ].map(({ key, label, type, placeholder, hint }) => (
                                <div key={key} className="cms-field"><Label htmlFor={key}>{label}</Label><Input id={key} type={type} value={form.data[key]} onChange={(event) => form.setData(key, event.target.value)} placeholder={placeholder} maxLength={key === 'whatsapp' ? 25 : 255} aria-invalid={Boolean(form.errors[key])} /><p className="text-[11px] leading-5 text-muted-foreground">{hint}</p><InputError message={form.errors[key]} /></div>
                            ))}
                        </div>
                    </section>
                    <section className="cms-panel p-5 sm:p-6">
                        <h2 className="text-sm font-semibold">Lokasi & jam buka</h2>
                        <div className="mt-5 grid gap-5">
                            {[{ key: 'address' as const, label: 'Alamat lengkap', placeholder: 'Nama tempat, jalan, kelurahan, dan kota' }, { key: 'opening_hours' as const, label: 'Jam operasional', placeholder: 'Senin–Sabtu: 09.00–20.00\nMinggu: tutup' }].map(({ key, label, placeholder }) => (
                                <div key={key} className="cms-field"><Label htmlFor={key}>{label}</Label><textarea id={key} rows={3} maxLength={1000} value={form.data[key]} onChange={(event) => form.setData(key, event.target.value)} placeholder={placeholder} className="cms-textarea" aria-invalid={Boolean(form.errors[key])} /><InputError message={form.errors[key]} /></div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="space-y-5">
                    <section className="cms-panel p-5 sm:p-6">
                        <h2 className="text-sm font-semibold">Tautan usaha</h2>
                        <div className="mt-5 grid gap-5">
                            {[{ key: 'maps_url' as const, label: 'Google Maps / lokasi', placeholder: 'https://maps.google.com/...' }, { key: 'instagram_url' as const, label: 'Instagram', placeholder: 'https://www.instagram.com/...' }].map(({ key, label, placeholder }) => (
                                <div key={key} className="cms-field"><Label htmlFor={key}>{label}</Label><Input id={key} type="url" maxLength={1000} value={form.data[key]} onChange={(event) => form.setData(key, event.target.value)} placeholder={placeholder} aria-invalid={Boolean(form.errors[key])} /><InputError message={form.errors[key]} /></div>
                            ))}
                        </div>
                    </section>
                    <section className="rounded-xl border border-dashed p-5">
                        <div className="flex items-center gap-2 text-sm font-medium"><MapPin size={16} />Lokasi saat ini</div>
                        <p className="mt-3 text-xs leading-6 whitespace-pre-line text-muted-foreground">{contact.address || 'Alamat belum diisi.'}</p>
                        {contact.maps_url && <a href={contact.maps_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">Periksa di peta<ArrowUpRight size={14} /></a>}
                        <p className="mt-4 border-t pt-4 text-xs leading-6 text-muted-foreground">Informasi yang disimpan langsung tampil di halaman kontak dan tombol pemesanan.</p>
                    </section>
                </div>
                <div className="cms-form-footer lg:col-span-2">
                    <span role="status" className="text-xs text-muted-foreground">{form.recentlySuccessful ? <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400"><Check size={14} />Perubahan tersimpan</span> : form.isDirty ? 'Ada perubahan belum disimpan' : 'Data kontak tersimpan'}</span>
                    <Button disabled={form.processing}><Save size={15} />{form.processing ? 'Menyimpan...' : 'Simpan kontak'}</Button>
                </div>
            </form>
        </div>
    );
}
ContactForm.layout = { breadcrumbs: [{ title: 'Informasi kontak', href: edit() }] };
