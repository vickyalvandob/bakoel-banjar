import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    ExternalLink,
    MapPin,
    Plus,
    Soup,
    Star,
    Eye,
} from 'lucide-react';
import CmsHeading from '@/components/cms-heading';
import { Button } from '@/components/ui/button';
import { home } from '@/routes';
import { dashboard } from '@/routes/admin';
import { edit } from '@/routes/admin/contact';
import { create, index } from '@/routes/admin/menu';
import type { Contact } from '@/types/bakoel';

export default function Dashboard({
    stats,
    contact,
}: {
    stats: { total: number; published: number; featured: number };
    contact: Contact;
}) {
    const ready = Boolean(
        contact.whatsapp && contact.address && contact.opening_hours,
    );
    return (
        <div className="mx-auto w-full max-w-6xl p-5 md:p-8">
            <Head title="Ringkasan CMS" />
            <CmsHeading
                title="Selamat datang di dapur Bakoel."
                description="Kelola menu dan informasi usaha yang dilihat pengunjung."
            >
                <Button variant="outline" asChild>
                    <Link href={home()} target="_blank">
                        Lihat website
                        <ExternalLink size={15} />
                    </Link>
                </Button>
            </CmsHeading>
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Total menu', value: stats.total, icon: Soup },
                    {
                        label: 'Menu dipublikasikan',
                        value: stats.published,
                        icon: Eye,
                    },
                    {
                        label: 'Menu unggulan',
                        value: stats.featured,
                        icon: Star,
                    },
                ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl border bg-card p-6">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            {label}
                            <Icon size={19} />
                        </div>
                        <p className="mt-5 text-4xl font-semibold">{value}</p>
                    </div>
                ))}
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
                <section className="rounded-xl border p-6">
                    <Soup size={25} />
                    <h2 className="mt-5 text-lg font-semibold">
                        Menu yang bikin rindu
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Tambahkan foto, atur harga, dan pilih menu unggulan
                        untuk halaman beranda. Menu draf hanya terlihat oleh
                        pengelola.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href={create()}>
                                <Plus size={16} />
                                Tambah menu
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={index()}>
                                Kelola menu
                                <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                </section>
                <section className="rounded-xl border p-6">
                    <MapPin size={25} />
                    <h2 className="mt-5 text-lg font-semibold">
                        Pastikan pelanggan bisa menghubungi
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {ready
                            ? 'Alamat, WhatsApp, dan jam operasional sudah terisi. Periksa kembali jika ada perubahan.'
                            : 'Lengkapi WhatsApp, alamat, dan jam operasional agar pengunjung dapat memesan dan menemukan usahamu.'}
                    </p>
                    <Button variant="outline" asChild className="mt-6">
                        <Link href={edit()}>
                            Atur informasi kontak
                            <ArrowRight size={16} />
                        </Link>
                    </Button>
                </section>
            </div>
            <p className="mt-6 text-xs leading-6 text-muted-foreground">
                Perubahan menu yang dipublikasikan dan informasi kontak langsung
                tampil pada website.
            </p>
        </div>
    );
}
Dashboard.layout = { breadcrumbs: [{ title: 'Ringkasan', href: dashboard() }] };
