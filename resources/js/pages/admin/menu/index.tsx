import { Form, Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Soup, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BakoelPagination from '@/components/bakoel-pagination';
import CmsFlash from '@/components/cms-flash';
import CmsHeading from '@/components/cms-heading';
import InputError from '@/components/input-error';
import { MenuPhoto } from '@/components/menu-card';
import MenuStatus from '@/components/menu-status';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { create, destroy, edit, index } from '@/routes/admin/menu';
import type { MenuCategory, MenuItem, Paginated } from '@/types/bakoel';
import { rupiah } from '@/types/bakoel';

export default function MenuIndex({ items, categories, filters }: {
    items: Paginated<MenuItem>; categories: MenuCategory[];
    filters: { search?: string; category?: string; status?: string };
}) {
    const [deleting, setDeleting] = useState<MenuItem | null>(null);
    const [processing, setProcessing] = useState(false);
    function remove() {
        if (!deleting) return;
        setProcessing(true);
        router.delete(destroy.url(deleting.id), {
            onSuccess: () => setDeleting(null),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <div className="cms-page">
            <Head title="Kelola menu" />
            <CmsHeading title="Kelola menu" description="Atur harga, foto, dan sajian yang tampil di katalog.">
                <Button asChild><Link href={create()}><Plus size={16} />Tambah menu</Link></Button>
            </CmsHeading>
            <CmsFlash />
            <section className="cms-panel overflow-hidden">
                <nav aria-label="Status menu" className="flex gap-5 overflow-x-auto border-b px-4 sm:px-5">
                    {[{ label: 'Semua menu', value: '' }, { label: 'Tayang', value: 'published' }, { label: 'Draf', value: 'draft' }, { label: 'Habis', value: 'unavailable' }].map(({ label, value }) => (
                        <Link key={value} href={index({ query: { ...filters, status: value || undefined, page: undefined } })} aria-current={(filters.status || '') === value ? 'page' : undefined} className={`shrink-0 border-b-2 py-4 text-xs font-medium ${(filters.status || '') === value ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>{label}</Link>
                    ))}
                </nav>
                <Form {...index.form()} className="grid gap-3 border-b p-4 sm:flex sm:flex-wrap sm:p-5">
                    {({ processing: searching, errors }) => (
                        <>
                            <input type="hidden" name="status" value={filters.status || ''} />
                            <div className="relative min-w-0 flex-1 sm:min-w-52">
                                <Search size={16} className="absolute top-3 left-3 text-muted-foreground" />
                                <Input type="search" name="search" aria-label="Cari menu" placeholder="Cari nama menu..." maxLength={120} defaultValue={filters.search} key={filters.search || ''} className="h-10 pl-9" />
                            </div>
                            <div className="flex min-w-0 gap-2">
                                <select name="category" aria-label="Kategori" defaultValue={filters.category || ''} key={filters.category || ''} className="cms-input min-w-0 flex-1 sm:w-44">
                                    <option value="">Semua kategori</option>{categories.map((category) => <option key={category.id} value={category.name}>{category.name}</option>)}
                                </select>
                                <Button type="submit" variant="secondary" disabled={searching} className="h-10">{searching ? 'Mencari...' : 'Cari'}</Button>
                                {(filters.search || filters.category) && <Button variant="ghost" className="h-10" asChild><Link href={index({ query: { status: filters.status } })}>Reset</Link></Button>}
                            </div>
                            {(errors.search || errors.category || errors.status) && <div className="w-full"><InputError message={errors.search || errors.category || errors.status} /></div>}
                        </>
                    )}
                </Form>
                {items.data.length ? (
                    <>
                        <div className="hidden md:block">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b bg-muted/35 text-[11px] text-muted-foreground"><tr>{['Menu', 'Harga', 'Status', 'Ketersediaan', ''].map((label) => <th key={label} scope="col" className="px-5 py-3 font-medium">{label || <span className="sr-only">Aksi</span>}</th>)}</tr></thead>
                                <tbody>{items.data.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0 hover:bg-muted/25">
                                        <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="size-12 shrink-0 overflow-hidden rounded-lg border"><MenuPhoto item={item} small /></div><div className="min-w-0"><Link href={edit(item.id)} className="font-medium hover:text-primary">{item.name}</Link><p className="mt-1 text-xs text-muted-foreground">{item.category}{item.is_featured ? ' · Unggulan' : ''}</p></div></div></td>
                                        <td className="px-5 py-4 text-xs whitespace-nowrap tabular-nums">{rupiah(item.price)}</td>
                                        <td className="px-5 py-4"><MenuStatus published={item.is_published} /></td>
                                        <td className="px-5 py-4 text-xs text-muted-foreground">{item.is_available ? 'Tersedia' : 'Habis'}</td>
                                        <td className="px-4 py-4"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={edit(item.id)} aria-label={`Edit ${item.name}`}><Pencil size={15} /></Link></Button><Button variant="ghost" size="icon" onClick={() => setDeleting(item)} aria-label={`Hapus ${item.name}`} className="text-muted-foreground hover:text-destructive"><Trash2 size={15} /></Button></div></td>
                                    </tr>
                                ))}</tbody>
                            </table>
                        </div>
                        <div className="divide-y md:hidden">{items.data.map((item) => (
                            <article key={item.id} className="p-4">
                                <div className="flex gap-3"><div className="size-16 shrink-0 overflow-hidden rounded-lg border"><MenuPhoto item={item} small /></div><div className="min-w-0 flex-1"><Link href={edit(item.id)} className="text-sm font-medium">{item.name}</Link><p className="mt-1 text-xs text-muted-foreground">{item.category}</p><p className="mt-2 text-sm font-semibold tabular-nums">{rupiah(item.price)}</p></div></div>
                                <div className="mt-3 flex items-center justify-between gap-2"><div className="flex items-center gap-2"><MenuStatus published={item.is_published} />{!item.is_available && <span className="text-xs text-amber-700 dark:text-amber-400">Habis</span>}</div><div className="flex gap-1"><Button variant="ghost" size="sm" asChild><Link href={edit(item.id)} aria-label={`Edit ${item.name}`}><Pencil size={14} />Edit</Link></Button><Button variant="ghost" size="icon" aria-label={`Hapus ${item.name}`} onClick={() => setDeleting(item)}><Trash2 size={15} /></Button></div></div>
                            </article>
                        ))}</div>
                    </>
                ) : (
                    <div className="px-5 py-14 text-center"><Soup className="mx-auto text-muted-foreground" size={28} strokeWidth={1.5} /><h2 className="mt-4 text-sm font-semibold">Belum ada menu{filters.search || filters.category || filters.status ? ' yang cocok' : ''}</h2><p className="mt-2 text-xs text-muted-foreground">{filters.search || filters.category || filters.status ? 'Coba ubah pencarian atau filter.' : 'Tambahkan menu pertama untuk mulai mengisi katalog.'}</p></div>
                )}
                <div className="border-t px-5 py-3 text-xs text-muted-foreground">{items.total} menu{items.last_page > 1 ? ` · Halaman ${items.current_page} dari ${items.last_page}` : ''}</div>
            </section>
            <BakoelPagination page={items} />
            <Dialog open={Boolean(deleting)} onOpenChange={(open) => { if (!open && !processing) setDeleting(null); }}>
                <DialogContent className="bb-admin bg-card shadow-none">
                    <DialogHeader><DialogTitle>Hapus menu ini?</DialogTitle><DialogDescription>Menu “{deleting?.name}” beserta fotonya akan dihapus. Pilih status draf jika hanya ingin menyembunyikannya.</DialogDescription></DialogHeader>
                    <DialogFooter><Button variant="outline" disabled={processing} onClick={() => setDeleting(null)}>Batal</Button><Button variant="destructive" disabled={processing} onClick={remove}>{processing ? 'Menghapus...' : 'Hapus menu'}</Button></DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
MenuIndex.layout = { breadcrumbs: [{ title: 'Kelola menu', href: index() }] };
