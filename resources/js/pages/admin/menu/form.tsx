import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ImagePlus, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import CmsHeading from '@/components/cms-heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store, update } from '@/routes/admin/menu';
import type { MenuItem } from '@/types/bakoel';

export default function MenuForm({
    item,
    categories,
}: {
    item: MenuItem | null;
    categories: string[];
}) {
    const form = useForm({
        name: item?.name || '',
        category: item?.category || categories[0],
        description: item?.description || '',
        price: item?.price?.toString() || '',
        image: null as File | null,
        remove_image: false,
        is_published: item?.is_published ?? false,
        is_available: item?.is_available ?? true,
        is_featured: item?.is_featured ?? false,
        sort_order: item?.sort_order || 0,
    });
    const [preview, setPreview] = useState<string | null>(
        item?.image_url || null,
    );
    useEffect(() => {
        if (!form.data.image) {
            setPreview(form.data.remove_image ? null : item?.image_url || null);
            return;
        }
        const url = URL.createObjectURL(form.data.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.image, form.data.remove_image, item?.image_url]);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.transform((data) => ({ ...data, _method: item ? 'put' : 'post' }));
        form.post(item ? update.url(item.id) : store.url(), {
            forceFormData: true,
        });
    }
    return (
        <div className="mx-auto w-full max-w-5xl p-5 md:p-8">
            <Head title={item ? 'Edit menu' : 'Tambah menu'} />
            <Link
                href={index()}
                className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
                <ArrowLeft size={16} />
                Kembali ke daftar menu
            </Link>
            <CmsHeading
                title={item ? 'Edit menu' : 'Tambah menu baru'}
                description="Lengkapi detail sajian, lalu tentukan apakah menu siap dipublikasikan."
            />
            <form
                onSubmit={submit}
                className="grid gap-6 md:grid-cols-[1.5fr_1fr]"
            >
                <div className="space-y-6 rounded-xl border p-6">
                    <h2 className="font-semibold">Informasi menu</h2>
                    <div className="grid gap-2">
                        <Label htmlFor="name">
                            Nama menu <span aria-hidden="true">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            required
                            maxLength={120}
                            placeholder="Contoh: Nasi Goreng Bakoel"
                            aria-invalid={Boolean(form.errors.name)}
                        />
                        <InputError message={form.errors.name} />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="category">Kategori</Label>
                            <select
                                id="category"
                                value={form.data.category}
                                onChange={(e) =>
                                    form.setData('category', e.target.value)
                                }
                                className="h-9 rounded-md border bg-background px-3 text-sm"
                            >
                                {categories.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            <InputError message={form.errors.category} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="price">Harga (Rp)</Label>
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                max={100000000}
                                step={1}
                                required
                                value={form.data.price}
                                onChange={(e) =>
                                    form.setData('price', e.target.value)
                                }
                                placeholder="28000"
                            />
                            <InputError message={form.errors.price} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <textarea
                            id="description"
                            rows={4}
                            maxLength={1000}
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Ceritakan bahan atau keistimewaan menu ini."
                        />
                        <InputError message={form.errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="sort_order">Urutan tampil</Label>
                        <Input
                            id="sort_order"
                            className="max-w-32"
                            type="number"
                            min={0}
                            max={65535}
                            value={form.data.sort_order}
                            onChange={(e) =>
                                form.setData(
                                    'sort_order',
                                    Number(e.target.value),
                                )
                            }
                        />
                        <p className="text-xs text-muted-foreground">
                            Angka lebih kecil tampil lebih dahulu.
                        </p>
                        <InputError message={form.errors.sort_order} />
                    </div>
                </div>
                <div className="space-y-6">
                    <section className="rounded-xl border p-6">
                        <h2 className="font-semibold">Foto menu</h2>
                        <div className="mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted/40">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Pratinjau foto menu"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <ImagePlus
                                        size={32}
                                        className="mx-auto mb-3"
                                    />
                                    <span className="text-xs">
                                        Tambahkan foto sajianmu
                                    </span>
                                </div>
                            )}
                        </div>
                        <Label htmlFor="image" className="mt-4 block text-xs">
                            Unggah foto · JPG, PNG, WebP · Maks. 4 MB
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="mt-2"
                            onChange={(e) => {
                                form.setData(
                                    'image',
                                    e.target.files?.[0] || null,
                                );
                                form.setData('remove_image', false);
                            }}
                        />
                        <InputError message={form.errors.image} />
                        {item?.image_url && (
                            <label className="mt-4 flex items-center gap-2 text-xs">
                                <input
                                    type="checkbox"
                                    checked={form.data.remove_image}
                                    onChange={(e) => {
                                        form.setData(
                                            'remove_image',
                                            e.target.checked,
                                        );
                                        form.setData('image', null);
                                    }}
                                />
                                Hapus foto saat disimpan
                            </label>
                        )}
                    </section>
                    <section className="space-y-5 rounded-xl border p-6">
                        <h2 className="font-semibold">Pengaturan tampilan</h2>
                        {[
                            {
                                key: 'is_published' as const,
                                label: 'Publikasikan menu',
                                hint: 'Tampilkan menu pada website publik.',
                            },
                            {
                                key: 'is_available' as const,
                                label: 'Menu tersedia',
                                hint: 'Matikan jika menu sedang habis.',
                            },
                            {
                                key: 'is_featured' as const,
                                label: 'Menu unggulan',
                                hint: 'Tampilkan di beranda, maksimal 4 berdasarkan urutan.',
                            },
                        ].map(({ key, label, hint }) => (
                            <div key={key}>
                                <label className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={form.data[key]}
                                        onChange={(e) =>
                                            form.setData(key, e.target.checked)
                                        }
                                        className="mt-1 size-4 accent-[#244a38]"
                                    />
                                    <span>
                                        <span className="block text-sm font-medium">
                                            {label}
                                        </span>
                                        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                                            {hint}
                                        </span>
                                    </span>
                                </label>
                                <InputError message={form.errors[key]} />
                            </div>
                        ))}
                    </section>
                </div>
                <div className="flex items-center justify-end gap-3 border-t pt-5 md:col-span-2">
                    <Button variant="outline" asChild>
                        <Link href={index()}>Batal</Link>
                    </Button>
                    <Button disabled={form.processing}>
                        <Save size={16} />
                        {form.processing ? 'Menyimpan...' : 'Simpan menu'}
                    </Button>
                </div>
                {form.progress && (
                    <p
                        role="status"
                        className="text-sm text-muted-foreground md:col-span-2"
                    >
                        Mengunggah {form.progress.percentage}%
                    </p>
                )}
            </form>
        </div>
    );
}
MenuForm.layout = { breadcrumbs: [{ title: 'Kelola menu', href: index() }] };
