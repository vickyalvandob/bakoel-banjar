import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Check, Eye, MapPin, Plus, Soup, Star, Tags } from 'lucide-react';
import CmsHeading from '@/components/cms-heading';
import { MenuPhoto } from '@/components/menu-card';
import MenuStatus from '@/components/menu-status';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes/admin';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { edit as contactEdit } from '@/routes/admin/contact';
import { create, edit, index } from '@/routes/admin/menu';
import type { Contact, MenuItem } from '@/types/bakoel';
import { rupiah } from '@/types/bakoel';

export default function Dashboard({ stats, contact, recent }: {
    stats: { total: number; published: number; featured: number; categories: number };
    contact: Contact;
    recent: MenuItem[];
}) {
    const contactDetails = [
        { label: 'Nomor WhatsApp', filled: Boolean(contact.whatsapp) },
        { label: 'Alamat usaha', filled: Boolean(contact.address) },
        { label: 'Jam operasional', filled: Boolean(contact.opening_hours) },
        { label: 'Tautan lokasi', filled: Boolean(contact.maps_url) },
    ];

    return (
        <div className="cms-page">
            <Head title="Ringkasan CMS" />
            <CmsHeading title="Ringkasan" description="Semua yang perlu Anda kelola, dalam satu tempat.">
                <Button asChild><Link href={create()}><Plus size={16} />Tambah menu</Link></Button>
            </CmsHeading>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                    { label: 'Total menu', value: stats.total, icon: Soup, href: index() },
                    { label: 'Menu tayang', value: stats.published, icon: Eye, href: index({ query: { status: 'published' } }) },
                    { label: 'Menu unggulan', value: stats.featured, icon: Star, href: index() },
                    { label: 'Kategori', value: stats.categories, icon: Tags, href: categoriesIndex() },
                ].map(({ label, value, icon: Icon, href }) => (
                    <Link href={href} key={label} className="cms-panel p-4 transition-colors hover:border-primary/35 sm:p-5">
                        <div className="flex items-center justify-between gap-2"><span className="text-xs text-muted-foreground">{label}</span><Icon size={17} strokeWidth={1.6} className="text-primary" /></div>
                        <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
                    </Link>
                ))}
            </div>
            <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
                <section className="cms-panel overflow-hidden">
                    <div className="flex items-center justify-between gap-3 border-b px-5 py-4"><h2 className="text-sm font-semibold">Menu terakhir diperbarui</h2><Link href={index()} className="inline-flex items-center gap-1 text-xs font-medium text-primary">Lihat semua<ArrowRight size={14} /></Link></div>
                    {recent.length ? recent.map((item) => (
                        <Link key={item.id} href={edit(item.id)} className="flex items-center gap-3 border-b px-5 py-4 transition-colors last:border-0 hover:bg-muted/40">
                            <div className="size-11 shrink-0 overflow-hidden rounded-lg border"><MenuPhoto item={item} small /></div>
                            <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-medium">{item.name}</h3><p className="mt-1 text-xs text-muted-foreground">{item.category} · {rupiah(item.price)}</p></div>
                            <MenuStatus published={item.is_published} />
                        </Link>
                    )) : <div className="px-5 py-12 text-center"><Soup size={27} strokeWidth={1.5} className="mx-auto text-muted-foreground" /><p className="mt-3 text-sm font-medium">Belum ada menu</p><p className="mt-1 text-xs text-muted-foreground">Tambahkan sajian pertama untuk katalog Anda.</p></div>}
                </section>
                <div className="space-y-5">
                    <section className="cms-panel p-5">
                        <div className="flex items-center gap-2"><MapPin size={17} className="text-primary" /><h2 className="text-sm font-semibold">Informasi usaha</h2></div>
                        <p className="mt-2 text-xs leading-6 text-muted-foreground">Bantu pelanggan menemukan dan menghubungi Anda.</p>
                        <div className="mt-4 space-y-3">{contactDetails.map(({ label, filled }) => (
                            <div key={label} className="flex items-center justify-between gap-3 text-xs"><span className="text-muted-foreground">{label}</span>{filled ? <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400"><Check size={13} />Terisi</span> : <span className="text-amber-700 dark:text-amber-400">Belum diisi</span>}</div>
                        ))}</div>
                        <Button variant="outline" asChild className="mt-5 w-full"><Link href={contactEdit()}>Kelola kontak<ArrowRight size={15} /></Link></Button>
                    </section>
                    <Link href={categoriesIndex()} className="cms-panel flex items-center gap-3 p-5 transition-colors hover:border-primary/35">
                        <Tags size={20} strokeWidth={1.5} className="text-primary" /><div className="flex-1"><p className="text-sm font-medium">Rapikan kategori</p><p className="mt-1 text-xs text-muted-foreground">Atur nama dan urutan kelompok menu.</p></div><ArrowRight size={15} className="text-muted-foreground" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
Dashboard.layout = { breadcrumbs: [{ title: 'Ringkasan', href: dashboard() }] };
