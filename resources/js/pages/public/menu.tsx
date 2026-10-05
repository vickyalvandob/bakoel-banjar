import { Form, Head, Link, router } from '@inertiajs/react';
import { Clock, RotateCcw, Search, Soup } from 'lucide-react';
import MenuCard from '@/components/menu-card';
import BakoelPagination from '@/components/bakoel-pagination';
import PublicLayout from '@/layouts/public-layout';
import { menu } from '@/routes';
import type { Contact, MenuItem, Paginated } from '@/types/bakoel';

export default function MenuPage({
    contact,
    items,
    categories,
    filters,
}: {
    contact: Contact;
    items: Paginated<MenuItem>;
    categories: string[];
    filters: { search?: string; category?: string };
}) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Menu">
                <meta
                    name="description"
                    content="Katalog menu Bakoel Banjar: gami, ayam, bebek, seafood, ikan, sayuran, nasi, dan minuman."
                />
            </Head>
            <section className="noise border-b border-[var(--bb-line)]">
                <div className="bb-container py-14 lg:py-20">
                    <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                        <div>
                            <p className="bb-eyebrow mb-5 inline-flex rounded-full border border-[var(--bb-line)] bg-[var(--bb-card)] px-3 py-2">
                                Katalog Menu
                            </p>
                            <h1 className="max-w-4xl font-display text-5xl leading-[.98] font-bold tracking-[-.04em] md:text-6xl lg:text-7xl">
                                Pilih rasa yang paling ingin kamu nikmati hari
                                ini.
                            </h1>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--bb-muted)] md:text-lg">
                                Dari ayam kampung, bebek, seafood, ikan,
                                sayuran, hingga minuman — semua disajikan dengan
                                karakter rasa khas Bakoel Banjar.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-[var(--bb-line)] bg-[var(--bb-card)] p-5">
                            <Clock className="size-10 rounded-xl bg-[var(--bb-tint)] p-2" />
                            <div>
                                <p className="text-sm font-semibold">
                                    Temukan menu favorit
                                </p>
                                <p className="mt-1 text-xs text-[var(--bb-muted)]">
                                    Dine in · Take Away · Delivery
                                </p>
                            </div>
                        </div>
                    </div>
                    <Form
                        {...menu.form()}
                        className="mt-10 flex flex-wrap gap-3"
                    >
                        <div className="relative min-w-48 flex-1">
                            <Search
                                size={20}
                                className="absolute top-4 left-4 text-[var(--bb-muted)]"
                            />
                            <input
                                type="hidden"
                                name="category"
                                value={filters.category || ''}
                            />
                            <input
                                aria-label="Cari nama menu"
                                type="search"
                                name="search"
                                defaultValue={filters.search}
                                key={filters.search}
                                maxLength={120}
                                placeholder="Cari menu, misalnya ayam gami, bebek, udang..."
                                className="w-full rounded-2xl border border-[var(--bb-line)] bg-[var(--bb-card)] py-4 pr-4 pl-12 text-sm"
                            />
                        </div>
                        <button type="submit" className="bb-button">
                            Cari menu
                        </button>
                        <Link
                            href={menu()}
                            className="bb-button bb-button-outline"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </Link>
                    </Form>
                </div>
            </section>
            <section className="sticky top-[76px] z-20 border-b border-[var(--bb-line)] bg-[var(--bb-paper)]/95 backdrop-blur-xl">
                <div
                    className="bb-container flex gap-2 overflow-x-auto py-4"
                    aria-label="Kategori menu"
                >
                    {['Semua Menu', ...categories].map((category) => (
                        <button
                            type="button"
                            key={category}
                            onClick={() =>
                                router.get(
                                    menu.url(),
                                    {
                                        search: filters.search || '',
                                        category:
                                            category === 'Semua Menu'
                                                ? ''
                                                : category,
                                    },
                                    { preserveScroll: true },
                                )
                            }
                            aria-pressed={
                                (filters.category || 'Semua Menu') === category
                            }
                            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${(filters.category || 'Semua Menu') === category ? 'border-banjar-700 bg-banjar-700 text-white' : 'border-[var(--bb-line)] bg-[var(--bb-card)] text-[var(--bb-muted)] hover:text-[var(--bb-ink)]'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>
            <section className="bb-container py-14">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="bb-eyebrow">Pilihan menu</p>
                        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight">
                            {filters.category || 'Semua Menu'}
                        </h2>
                    </div>
                    <p className="text-sm text-[var(--bb-muted)]">
                        {items.total} menu ditemukan
                        {filters.search ? ` untuk “${filters.search}”` : ''}
                    </p>
                </div>
                {items.data.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.data.map((item) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                contact={contact}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-[var(--bb-line)] py-20 text-center">
                        <Soup
                            className="mx-auto mb-5"
                            size={36}
                            strokeWidth={1.2}
                        />
                        <h2 className="font-serif text-3xl">
                            Belum ada menu yang cocok.
                        </h2>
                        <p className="mt-3 text-sm text-[var(--bb-muted)]">
                            Coba kata kunci atau kategori lainnya.
                        </p>
                        <Link
                            href={menu()}
                            className="mt-6 inline-block underline"
                        >
                            Lihat semua menu
                        </Link>
                    </div>
                )}
                <BakoelPagination page={items} />
            </section>
        </PublicLayout>
    );
}
