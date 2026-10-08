import { Form, Head, Link } from '@inertiajs/react';
import { Search, Soup } from 'lucide-react';
import MenuCard from '@/components/menu-card';
import BakoelPagination from '@/components/bakoel-pagination';
import PublicPageHeading from '@/components/public-page-heading';
import InputError from '@/components/input-error';
import PublicLayout from '@/layouts/public-layout';
import { menu } from '@/routes';
import type {
    Contact,
    MenuCategory,
    MenuItem,
    Paginated,
} from '@/types/bakoel';

export default function MenuPage({
    contact,
    items,
    categories,
    filters,
}: {
    contact: Contact;
    items: Paginated<MenuItem>;
    categories: MenuCategory[];
    filters: { search?: string; category?: string };
}) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Menu">
                <meta
                    name="description"
                    content="Lihat pilihan menu dan harga Bakoel Banjar. Temukan hidangan favoritmu dan pesan melalui WhatsApp."
                />
            </Head>
            <PublicPageHeading
                label="Menu Bakoel"
                title="Mau makan apa hari ini?"
                description="Pilih lauk, pelengkap, dan minuman favoritmu. Pesan langsung lewat WhatsApp."
            />
            <section className="bb-container pb-12">
                <Form
                    {...menu.form()}
                    className="mb-5 flex max-w-xl flex-wrap gap-2"
                >
                    {({ processing, errors }) => (
                        <>
                            <input
                                type="hidden"
                                name="category"
                                value={filters.category || ''}
                            />
                            <div className="relative min-w-40 flex-1">
                                <Search
                                    size={17}
                                    className="absolute top-3.5 left-3.5 text-[var(--bb-muted)]"
                                />
                                <input
                                    aria-label="Cari nama menu"
                                    type="search"
                                    name="search"
                                    defaultValue={filters.search}
                                    key={filters.search || ''}
                                    maxLength={120}
                                    placeholder="Cari nama menu..."
                                    className="h-11 w-full rounded-lg border border-[var(--bb-line)] bg-[var(--bb-card)] pr-3 pl-10 text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bb-button"
                            >
                                {processing ? 'Mencari...' : 'Cari'}
                            </button>
                            {(filters.search || filters.category) && (
                                <Link
                                    href={menu()}
                                    className="bb-button bb-button-outline"
                                >
                                    Reset
                                </Link>
                            )}
                            <div className="w-full">
                                <InputError
                                    message={errors.search || errors.category}
                                />
                            </div>
                        </>
                    )}
                </Form>
                <nav
                    aria-label="Kategori menu"
                    className="flex flex-wrap gap-2 border-b border-[var(--bb-line)] pb-6"
                >
                    <Link
                        href={menu({ query: { search: filters.search || '' } })}
                        preserveScroll
                        aria-current={!filters.category ? 'true' : undefined}
                        className={`bb-category ${!filters.category ? 'bb-category-active' : ''}`}
                    >
                        Semua
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={menu({
                                query: {
                                    search: filters.search || '',
                                    category: category.name,
                                },
                            })}
                            preserveScroll
                            aria-current={
                                filters.category === category.name
                                    ? 'true'
                                    : undefined
                            }
                            className={`bb-category ${filters.category === category.name ? 'bb-category-active' : ''}`}
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex flex-wrap items-center justify-between gap-3 py-6">
                    <h2 className="text-base font-semibold">
                        {filters.category || 'Semua menu'}
                    </h2>
                    <p className="text-xs text-[var(--bb-muted)]" role="status">
                        {items.total} menu
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
                    <div className="rounded-lg border border-dashed border-[var(--bb-line)] px-5 py-14 text-center">
                        <Soup
                            className="mx-auto text-[var(--bb-gold)]"
                            size={30}
                            strokeWidth={1.5}
                        />
                        <h3 className="mt-4 text-lg font-semibold">
                            Menu belum ditemukan
                        </h3>
                        <p className="mt-2 text-sm text-[var(--bb-muted)]">
                            Coba kata kunci atau kategori lainnya.
                        </p>
                        <Link
                            href={menu()}
                            className="mt-5 inline-block text-sm underline underline-offset-4"
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
