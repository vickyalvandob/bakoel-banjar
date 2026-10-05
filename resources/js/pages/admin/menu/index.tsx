import { Form, Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Search, Trash2, Soup } from 'lucide-react';
import { useState } from 'react';
import CmsHeading from '@/components/cms-heading';
import CmsFlash from '@/components/cms-flash';
import BakoelPagination from '@/components/bakoel-pagination';
import { MenuPhoto } from '@/components/menu-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { create, destroy, edit, index } from '@/routes/admin/menu';
import type { MenuItem, Paginated } from '@/types/bakoel';
import { rupiah } from '@/types/bakoel';

export default function MenuIndex({
    items,
    categories,
    filters,
}: {
    items: Paginated<MenuItem>;
    categories: string[];
    filters: { search?: string; category?: string };
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
        <div className="mx-auto w-full max-w-6xl p-5 md:p-8">
            <Head title="Kelola menu" />
            <CmsHeading
                title="Kelola menu"
                description="Atur sajian, harga, foto, dan menu yang tampil di website."
            >
                <Button asChild>
                    <Link href={create()}>
                        <Plus size={16} />
                        Tambah menu
                    </Link>
                </Button>
            </CmsHeading>
            <CmsFlash />
            <Form {...index.form()} className="mb-6 flex flex-wrap gap-3">
                <div className="relative min-w-48 flex-1">
                    <Search
                        size={17}
                        className="absolute top-2.5 left-3 text-muted-foreground"
                    />
                    <Input
                        name="search"
                        aria-label="Cari menu"
                        placeholder="Cari nama menu..."
                        maxLength={120}
                        defaultValue={filters.search}
                        key={filters.search}
                        className="pl-10"
                    />
                </div>
                <select
                    name="category"
                    aria-label="Kategori"
                    defaultValue={filters.category || ''}
                    key={filters.category}
                    className="h-9 rounded-md border bg-background px-3 text-sm"
                >
                    <option value="">Semua kategori</option>
                    {categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
                <Button type="submit" variant="secondary">
                    Cari
                </Button>
                {(filters.search || filters.category) && (
                    <Button variant="ghost" asChild>
                        <Link href={index()}>Reset</Link>
                    </Button>
                )}
            </Form>
            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full min-w-[680px] text-left text-sm">
                    <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
                        <tr>
                            {[
                                'Menu',
                                'Harga',
                                'Publikasi',
                                'Ketersediaan',
                                'Aksi',
                            ].map((h) => (
                                <th
                                    key={h}
                                    scope="col"
                                    className="px-5 py-4 font-medium"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.data.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b last:border-0"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-14 shrink-0 overflow-hidden rounded-lg">
                                            <MenuPhoto item={item} small />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                {item.name}
                                            </div>
                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {item.category}
                                                {item.is_featured
                                                    ? ' · Unggulan'
                                                    : ''}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 whitespace-nowrap">
                                    {rupiah(item.price)}
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs ${item.is_published ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {item.is_published ? 'Tayang' : 'Draf'}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-xs">
                                    {item.is_available ? 'Tersedia' : 'Habis'}
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={edit(item.id)}
                                                aria-label={`Edit ${item.name}`}
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleting(item)}
                                            aria-label={`Hapus ${item.name}`}
                                            className="text-destructive"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!items.data.length && (
                    <div className="p-12 text-center">
                        <Soup className="mx-auto mb-4 text-muted-foreground" />
                        <h2 className="font-medium">
                            Belum ada menu yang ditampilkan.
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {items.total === 0 &&
                            !filters.search &&
                            !filters.category
                                ? 'Mulai dengan menambahkan menu pertamamu.'
                                : 'Coba ubah atau hapus filter pencarian.'}
                        </p>
                    </div>
                )}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
                {items.total} menu
            </div>
            <BakoelPagination page={items} />
            <Dialog
                open={Boolean(deleting)}
                onOpenChange={(value) => {
                    if (!value && !processing) setDeleting(null);
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Hapus menu ini?</DialogTitle>
                        <DialogDescription>
                            Menu “{deleting?.name}” beserta fotonya akan
                            dihapus. Gunakan status draf jika hanya ingin
                            menyembunyikannya sementara.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            disabled={processing}
                            onClick={() => setDeleting(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={processing}
                            onClick={remove}
                        >
                            {processing ? 'Menghapus...' : 'Hapus menu'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
MenuIndex.layout = { breadcrumbs: [{ title: 'Kelola menu', href: index() }] };
