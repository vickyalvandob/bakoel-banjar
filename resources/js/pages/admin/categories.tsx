import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import CmsFlash from '@/components/cms-flash';
import CmsHeading from '@/components/cms-heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { destroy, index, store, update } from '@/routes/admin/categories';
import type { MenuCategory } from '@/types/bakoel';

type Category = MenuCategory & { sort_order: number; items_count: number };

export default function Categories({ categories }: { categories: Category[] }) {
    const [editing, setEditing] = useState<Category | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleting, setDeleting] = useState<Category | null>(null);
    const form = useForm({ name: '', sort_order: 0 });
    const deleteForm = useForm<{ category?: string }>({});

    function openForm(category: Category | null) {
        setEditing(category);
        form.setData({
            name: category?.name || '',
            sort_order: category?.sort_order ?? 0,
        });
        form.clearErrors();
        setDialogOpen(true);
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => setDialogOpen(false),
        };
        if (editing) {
            form.put(update.url(editing.id), options);
        } else {
            form.post(store.url(), options);
        }
    }

    function remove() {
        if (!deleting) return;
        deleteForm.delete(destroy.url(deleting.id), {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    }

    return (
        <div className="cms-page">
            <Head title="Kategori menu" />
            <CmsHeading
                title="Kategori menu"
                description="Kelompokkan menu agar pengunjung mudah menemukan pilihannya."
            >
                <Button onClick={() => openForm(null)}>
                    <Plus size={16} />
                    Tambah kategori
                </Button>
            </CmsHeading>
            <CmsFlash />
            <div className="cms-panel overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/35 px-5 py-3 text-xs text-muted-foreground">
                    <span>{categories.length} kategori</span>
                    <span>Urutan kecil tampil lebih dahulu</span>
                </div>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center gap-3 border-b px-4 py-3.5 last:border-0 hover:bg-muted/25 sm:gap-5 sm:px-5"
                    >
                        <span className="w-7 shrink-0 text-center text-sm text-muted-foreground tabular-nums">
                            {category.sort_order}
                        </span>
                        <div className="min-w-0 flex-1">
                            <h2 className="text-sm font-semibold break-words">
                                {category.name}
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {category.items_count} menu
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Edit ${category.name}`}
                            onClick={() => openForm(category)}
                        >
                            <Pencil size={16} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Hapus ${category.name}`}
                            disabled={category.items_count > 0}
                            title={
                                category.items_count > 0
                                    ? 'Pindahkan menu sebelum menghapus kategori'
                                    : 'Hapus kategori'
                            }
                            onClick={() => {
                                deleteForm.clearErrors();
                                setDeleting(category);
                            }}
                        >
                            <Trash2 size={16} />
                        </Button>
                    </div>
                ))}
                {!categories.length && (
                    <p className="px-5 py-12 text-center text-sm text-muted-foreground">
                        Belum ada kategori. Tambahkan kategori sebelum membuat
                        menu.
                    </p>
                )}
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
                Perubahan nama langsung berlaku pada semua menu terkait.
                Kategori yang masih berisi menu tidak dapat dihapus.
            </p>
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    if (!form.processing) setDialogOpen(open);
                }}
            >
                <DialogContent className="bb-admin bg-card shadow-none">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit kategori' : 'Tambah kategori'}
                        </DialogTitle>
                        <DialogDescription>
                            Isi nama dan urutan tampil pada katalog menu.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-5">
                        <div className="cms-field">
                            <Label htmlFor="category-name">Nama kategori</Label>
                            <Input
                                id="category-name"
                                value={form.data.name}
                                onChange={(event) =>
                                    form.setData('name', event.target.value)
                                }
                                maxLength={40}
                                required
                                autoFocus
                                placeholder="Contoh: Paket keluarga"
                                aria-invalid={Boolean(form.errors.name)}
                            />
                            <InputError message={form.errors.name} />
                        </div>
                        <div className="cms-field">
                            <Label htmlFor="category-order">
                                Urutan tampil
                            </Label>
                            <Input
                                id="category-order"
                                type="number"
                                min={0}
                                max={65535}
                                step={1}
                                required
                                value={form.data.sort_order}
                                onChange={(event) =>
                                    form.setData(
                                        'sort_order',
                                        Number(event.target.value),
                                    )
                                }
                            />
                            <InputError message={form.errors.sort_order} />
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={form.processing}
                                onClick={() => setDialogOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button disabled={form.processing}>
                                {form.processing
                                    ? 'Menyimpan...'
                                    : 'Simpan kategori'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog
                open={Boolean(deleting)}
                onOpenChange={(open) => {
                    if (!open && !deleteForm.processing) setDeleting(null);
                }}
            >
                <DialogContent className="bb-admin bg-card shadow-none">
                    <DialogHeader>
                        <DialogTitle>Hapus kategori?</DialogTitle>
                        <DialogDescription>
                            Kategori “{deleting?.name}” akan dihapus dari
                            daftar.
                        </DialogDescription>
                    </DialogHeader>
                    <InputError message={deleteForm.errors.category} />
                    <DialogFooter>
                        <Button
                            variant="outline"
                            disabled={deleteForm.processing}
                            onClick={() => setDeleting(null)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={deleteForm.processing}
                            onClick={remove}
                        >
                            {deleteForm.processing
                                ? 'Menghapus...'
                                : 'Hapus kategori'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
Categories.layout = {
    breadcrumbs: [{ title: 'Kategori menu', href: index() }],
};
