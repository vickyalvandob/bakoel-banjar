import { Head, useForm, usePage } from '@inertiajs/react';
import { Check, ImagePlus, RotateCcw, Save, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import CmsFlash from '@/components/cms-flash';
import CmsHeading from '@/components/cms-heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/admin/settings';
import type { SiteImageField, SiteSettings } from '@/types/bakoel';

type SettingsFormData = {
    meta_title: string;
    meta_description: string;
} & Record<SiteImageField, File | null> &
    Record<`remove_${SiteImageField}`, boolean>;

function formValues(site: SiteSettings): SettingsFormData {
    return {
        meta_title: site.meta_title || '',
        meta_description: site.meta_description || '',
        logo: null,
        favicon: null,
        meta_image: null,
        home_image: null,
        about_image: null,
        remove_logo: false,
        remove_favicon: false,
        remove_meta_image: false,
        remove_home_image: false,
        remove_about_image: false,
    };
}

function ImageField({
    field,
    label,
    hint,
    currentUrl,
    file,
    removed,
    custom,
    error,
    onFile,
    onRemove,
}: {
    field: SiteImageField;
    label: string;
    hint: string;
    currentUrl: string | null;
    file: File | null;
    removed: boolean;
    custom: boolean;
    error?: string;
    onFile: (file: File | null) => void;
    onRemove: (removed: boolean) => void;
}) {
    const input = useRef<HTMLInputElement>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    useEffect(() => {
        if (!file) {
            setFilePreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setFilePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    const preview = removed ? null : filePreview || currentUrl;
    const isIdentity = field === 'logo' || field === 'favicon';

    function clearFile() {
        onFile(null);
        if (input.current) input.current.value = '';
    }

    return (
        <div className="min-w-0 space-y-3">
            <div>
                <Label htmlFor={field}>{label}</Label>
                <p
                    id={`${field}-hint`}
                    className="mt-1 text-xs leading-5 text-muted-foreground"
                >
                    {hint}
                </p>
            </div>
            <div
                className={`flex items-center justify-center overflow-hidden rounded-lg border bg-muted/30 ${isIdentity ? 'h-32' : 'aspect-video'}`}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt={`Pratinjau ${label}`}
                        className={
                            field === 'favicon'
                                ? 'size-12 object-contain'
                                : field === 'logo'
                                  ? 'max-h-24 max-w-[80%] object-contain'
                                  : 'size-full object-cover'
                        }
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 p-4 text-center text-xs text-muted-foreground">
                        <ImagePlus size={24} strokeWidth={1.5} />
                        {removed
                            ? 'Gambar bawaan akan digunakan setelah disimpan.'
                            : 'Logo bawaan digunakan'}
                    </div>
                )}
            </div>
            <Input
                ref={input}
                id={field}
                name={field}
                type="file"
                accept={
                    field === 'favicon'
                        ? '.png,.ico,image/png,image/x-icon,image/vnd.microsoft.icon'
                        : 'image/jpeg,image/png,image/webp'
                }
                aria-describedby={`${field}-hint`}
                aria-invalid={Boolean(error)}
                className="min-w-0 text-xs"
                onChange={(event) => {
                    onFile(event.target.files?.[0] || null);
                    onRemove(false);
                }}
            />
            <p className="text-[11px] text-muted-foreground">
                {field === 'favicon'
                    ? 'PNG atau ICO. Maksimal 1 MB.'
                    : 'JPG, PNG, atau WebP. Maksimal 4 MB.'}
            </p>
            <InputError message={error} />
            <div className="flex min-h-7 flex-wrap gap-3">
                {file && (
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs underline-offset-4 hover:underline focus-visible:underline"
                        onClick={clearFile}
                    >
                        <X size={13} />
                        Batalkan unggahan
                    </button>
                )}
                {custom && (
                    <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:underline focus-visible:underline"
                        onClick={() => {
                            clearFile();
                            onRemove(!removed);
                        }}
                    >
                        <RotateCcw size={13} />
                        {removed ? 'Batalkan perubahan' : 'Gunakan bawaan'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function WebsiteSettings({
    customImages,
}: {
    customImages: SiteImageField[];
}) {
    const { site } = usePage().props;
    const form = useForm<SettingsFormData>(formValues(site));

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const element = event.currentTarget;
        form.transform((data) => ({ ...data, _method: 'put' }));
        form.post(update.url(), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const values = formValues(page.props.site);
                element.reset();
                form.setData(values);
                form.setDefaults(values);
            },
        });
    }

    function imageField(field: SiteImageField, label: string, hint: string) {
        return (
            <ImageField
                field={field}
                label={label}
                hint={hint}
                currentUrl={site[`${field}_url`]}
                file={form.data[field]}
                removed={form.data[`remove_${field}`]}
                custom={customImages.includes(field)}
                error={form.errors[field] || form.errors[`remove_${field}`]}
                onFile={(file) => form.setData(field, file)}
                onRemove={(removed) => form.setData(`remove_${field}`, removed)}
            />
        );
    }

    return (
        <div className="cms-page">
            <Head title="Pengaturan website" />
            <CmsHeading
                title="Pengaturan website"
                description="Atur identitas, tampilan di pencarian, dan gambar utama website."
            />
            <CmsFlash />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="space-y-5"
            >
                <fieldset
                    disabled={form.processing}
                    className="min-w-0 space-y-5 disabled:opacity-70"
                >
                    <section
                        className="cms-panel p-5 sm:p-6"
                        aria-labelledby="identity-heading"
                    >
                        <h2
                            id="identity-heading"
                            className="text-sm font-semibold"
                        >
                            Identitas website
                        </h2>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                            Logo tampil di website dan panel pengelola. Favicon
                            tampil pada tab browser.
                        </p>
                        <div className="mt-5 grid gap-6 sm:grid-cols-2">
                            {imageField(
                                'logo',
                                'Logo',
                                'Gunakan logo dengan latar transparan agar mudah terbaca.',
                            )}
                            {imageField(
                                'favicon',
                                'Favicon',
                                'Gunakan ikon persegi, disarankan 32 × 32 atau 64 × 64 piksel.',
                            )}
                        </div>
                    </section>
                    <section
                        className="cms-panel p-5 sm:p-6"
                        aria-labelledby="metadata-heading"
                    >
                        <h2
                            id="metadata-heading"
                            className="text-sm font-semibold"
                        >
                            Metadata & pratinjau tautan
                        </h2>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                            Digunakan di mesin pencari dan saat tautan website
                            dibagikan.
                        </p>
                        <div className="mt-5 grid gap-6 lg:grid-cols-2">
                            <div className="space-y-5">
                                <div className="cms-field">
                                    <Label htmlFor="meta_title">
                                        Meta title
                                    </Label>
                                    <Input
                                        id="meta_title"
                                        name="meta_title"
                                        value={form.data.meta_title}
                                        onChange={(event) =>
                                            form.setData(
                                                'meta_title',
                                                event.target.value,
                                            )
                                        }
                                        maxLength={120}
                                        placeholder="Bakoel Banjar"
                                        aria-invalid={Boolean(
                                            form.errors.meta_title,
                                        )}
                                    />
                                    <p className="text-[11px] leading-5 text-muted-foreground">
                                        {form.data.meta_title.length}/120
                                        karakter. Judul untuk Home; halaman lain
                                        menambahkan nama halaman di depannya.
                                    </p>
                                    <InputError
                                        message={form.errors.meta_title}
                                    />
                                </div>
                                <div className="cms-field">
                                    <Label htmlFor="meta_description">
                                        Meta description
                                    </Label>
                                    <textarea
                                        id="meta_description"
                                        name="meta_description"
                                        className="cms-textarea"
                                        rows={4}
                                        value={form.data.meta_description}
                                        onChange={(event) =>
                                            form.setData(
                                                'meta_description',
                                                event.target.value,
                                            )
                                        }
                                        maxLength={320}
                                        placeholder="Ceritakan singkat tentang Bakoel Banjar dan hidangan yang ditawarkan."
                                        aria-invalid={Boolean(
                                            form.errors.meta_description,
                                        )}
                                    />
                                    <p className="text-[11px] leading-5 text-muted-foreground">
                                        {form.data.meta_description.length}/320
                                        karakter. Berlaku untuk seluruh halaman
                                        publik.
                                    </p>
                                    <InputError
                                        message={form.errors.meta_description}
                                    />
                                </div>
                                <p className="rounded-lg border border-dashed p-3 text-xs leading-6 text-muted-foreground">
                                    Kosongkan judul atau deskripsi untuk memakai
                                    teks bawaan. Jika meta image belum diunggah,
                                    gambar Home digunakan saat tautan dibagikan.
                                </p>
                            </div>
                            {imageField(
                                'meta_image',
                                'Meta image',
                                'Disarankan 1200 × 630 piksel untuk pratinjau tautan.',
                            )}
                        </div>
                    </section>
                    <section
                        className="cms-panel p-5 sm:p-6"
                        aria-labelledby="images-heading"
                    >
                        <h2
                            id="images-heading"
                            className="text-sm font-semibold"
                        >
                            Gambar halaman
                        </h2>
                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                            Ganti foto utama pada halaman Home dan About.
                            Disarankan gambar mendatar dengan rasio 4:3.
                        </p>
                        <div className="mt-5 grid gap-6 sm:grid-cols-2">
                            {imageField(
                                'home_image',
                                'Gambar Home',
                                'Foto utama di bagian pembuka halaman Beranda.',
                            )}
                            {imageField(
                                'about_image',
                                'Gambar About',
                                'Foto pada bagian cerita di halaman Tentang.',
                            )}
                        </div>
                    </section>
                </fieldset>
                <div className="cms-form-footer">
                    <span
                        role="status"
                        aria-live="polite"
                        className="text-xs text-muted-foreground"
                    >
                        {form.processing ? (
                            `Menyimpan${form.progress ? ` ${form.progress.percentage}%` : '...'}`
                        ) : form.recentlySuccessful ? (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                                <Check size={14} />
                                Perubahan tersimpan
                            </span>
                        ) : form.isDirty ? (
                            'Ada perubahan belum disimpan'
                        ) : (
                            'Perubahan langsung tampil setelah disimpan'
                        )}
                    </span>
                    <Button type="submit" disabled={form.processing}>
                        <Save size={15} />
                        {form.processing ? 'Menyimpan...' : 'Simpan pengaturan'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

WebsiteSettings.layout = {
    breadcrumbs: [{ title: 'Pengaturan website', href: edit() }],
};
