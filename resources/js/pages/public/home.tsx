import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Bike,
    ChefHat,
    HeartHandshake,
    House,
    Leaf,
    MessageCircle,
    Quote,
    ScrollText,
    ShoppingBag,
    Users,
    Utensils,
} from 'lucide-react';
import MenuCard from '@/components/menu-card';
import PublicLayout from '@/layouts/public-layout';
import { menu, about, services, contact as contactRoute } from '@/routes';
import type { Contact, MenuItem } from '@/types/bakoel';
import { whatsappUrl } from '@/types/bakoel';

export default function Home({
    contact,
    featured,
}: {
    contact: Contact;
    featured: MenuItem[];
}) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Beranda" />

            <section className="noise">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-24">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-banjar-200 bg-white/70 px-3 py-1.5 text-xs font-bold tracking-[.18em] text-banjar-700 uppercase">
                            <span className="size-1.5 rounded-full bg-banjar-500"></span>
                            Masakan Khas Kalimantan
                        </div>

                        <h1 className="max-w-3xl font-display text-5xl leading-[.98] font-bold tracking-[-.045em] md:text-6xl lg:text-7xl">
                            Cita rasa Banjar yang sederhana, hangat, dan selalu
                            dirindukan.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 md:text-lg">
                            Hidangan khas Nusantara dengan karakter Banjar,
                            bahan pilihan, dan pengalaman makan yang nyaman
                            untuk keluarga, teman, maupun acara.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={menu()}
                                className="inline-flex items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                            >
                                Lihat Katalog Menu
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href={about()}
                                className="inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-semibold text-banjar-900 transition hover:bg-banjar-100"
                            >
                                Tentang Kami
                            </Link>
                        </div>

                        <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-banjar-200 pt-6">
                            <div>
                                <div className="grid size-10 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <Leaf className="size-5" />
                                </div>
                                <div className="mt-3 text-sm font-semibold">
                                    Bahan Pilihan
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Segar & berkualitas
                                </div>
                            </div>
                            <div>
                                <div className="grid size-10 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <ChefHat className="size-5" />
                                </div>
                                <div className="mt-3 text-sm font-semibold">
                                    Resep Tradisional
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Rasa khas Banjar
                                </div>
                            </div>
                            <div>
                                <div className="grid size-10 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <House className="size-5" />
                                </div>
                                <div className="mt-3 text-sm font-semibold">
                                    Nuansa Hangat
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Nyaman untuk bersama
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="image-zoom relative overflow-hidden rounded-[2rem] border border-white/70 bg-banjar-200 shadow-soft">
                        <img
                            src="/images/template/photo-1504674900247-0877df9cc836.jpg"
                            alt="Ilustrasi: Hidangan Bakoel Banjar"
                            className="h-[520px] w-full object-cover lg:h-[600px]"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-banjar-900/50 via-transparent to-transparent"></div>

                        <div className="absolute top-5 left-5 rounded-full border border-white/50 bg-white/82 px-4 py-2 text-xs font-semibold text-banjar-800 backdrop-blur-md">
                            Rasa Banjar • Suasana Nusantara
                        </div>

                        <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/20 bg-banjar-900/62 p-5 text-white backdrop-blur-md">
                            <div className="text-xs font-bold tracking-[.18em] text-banjar-200 uppercase">
                                Bakoel Banjar
                            </div>
                            <div className="mt-2 font-display text-2xl font-bold">
                                Makan enak, suasana nyaman, rasa yang familiar.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-banjar-200/70 bg-white/55">
                <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="text-xs font-bold tracking-[.2em] text-banjar-600 uppercase">
                                Jelajahi Menu
                            </div>
                            <div className="mt-1 font-display text-2xl font-bold">
                                Pilih sesuai selera.
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={menu({
                                    query: { category: 'Gami Spesial' },
                                })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Gami Spesial
                            </Link>
                            <Link
                                href={menu({ query: { category: 'Ayam' } })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Ayam
                            </Link>
                            <Link
                                href={menu({ query: { category: 'Bebek' } })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Bebek
                            </Link>
                            <Link
                                href={menu({ query: { category: 'Seafood' } })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Seafood
                            </Link>
                            <Link
                                href={menu({ query: { category: 'Ikan' } })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Ikan
                            </Link>
                            <Link
                                href={menu({ query: { category: 'Minuman' } })}
                                className="rounded-full border border-banjar-200 bg-white px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-banjar-400 hover:text-banjar-700"
                            >
                                Minuman
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bb-container py-20">
                <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <div className="bb-eyebrow">Menu Pilihan</div>
                        <h2 className="bb-heading mt-3">
                            Beberapa favorit yang layak dicoba.
                        </h2>
                        <p className="mt-3 text-[var(--bb-muted)]">
                            Pilihan menu dengan rasa yang paling mewakili
                            karakter Bakoel Banjar.
                        </p>
                    </div>
                    <Link
                        href={menu()}
                        className="inline-flex items-center gap-2 text-sm font-semibold"
                    >
                        Lihat semua menu
                        <ArrowRight className="size-4" />
                    </Link>
                </div>
                {featured.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {featured.map((item) => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                contact={contact}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-2xl border border-dashed border-banjar-200 p-12 text-center">
                        Menu pilihan sedang disiapkan.{' '}
                        <Link href={menu()} className="underline">
                            Lihat katalog menu
                        </Link>
                    </p>
                )}
            </section>

            <section className="border-y border-banjar-200/70 bg-white/55">
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                                Layanan
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                                Satu rasa, banyak cara menikmati.
                            </h2>
                            <p className="mt-4 max-w-lg leading-7 text-stone-600">
                                Untuk makan langsung, dibawa pulang, dikirim,
                                atau kebutuhan acara.
                            </p>

                            <Link
                                href={services()}
                                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-semibold text-banjar-800 transition hover:bg-banjar-100"
                            >
                                Lihat Detail Layanan
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <article className="rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <Utensils className="size-5" />
                                </div>
                                <h3 className="mt-5 font-display text-xl font-bold">
                                    Makan di Tempat
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    Suasana santai dan nyaman untuk keluarga,
                                    teman, maupun meeting.
                                </p>
                            </article>

                            <article className="rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <ShoppingBag className="size-5" />
                                </div>
                                <h3 className="mt-5 font-display text-xl font-bold">
                                    Take Away
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    Pesan lebih dulu dan ambil saat sudah siap.
                                </p>
                            </article>

                            <article className="rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <Bike className="size-5" />
                                </div>
                                <h3 className="mt-5 font-display text-xl font-bold">
                                    Delivery
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    Nikmati Bakoel Banjar dari rumah atau
                                    kantor.
                                </p>
                            </article>

                            <article className="rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                    <Users className="size-5" />
                                </div>
                                <h3 className="mt-5 font-display text-xl font-bold">
                                    Catering & Acara
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    Untuk keluarga, arisan, meeting, kantor, dan
                                    acara khusus.
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="grid overflow-hidden rounded-[2rem] border border-banjar-200 bg-white lg:grid-cols-[1.05fr_.95fr]">
                        <div className="image-zoom min-h-[450px] overflow-hidden">
                            <img
                                src="/images/template/photo-1517248135467-4c7edcad34c4.jpg"
                                alt="Ilustrasi: Suasana rumah makan"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                                Tentang Bakoel Banjar
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                                Tradisional dalam rasa, modern dalam pengalaman.
                            </h2>
                            <p className="mt-5 leading-7 text-stone-600">
                                Kami ingin menjaga cita rasa Banjar tetap dekat
                                dengan keseharian — disajikan dengan bahan
                                pilihan, pelayanan yang sederhana, dan suasana
                                yang hangat.
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <ScrollText className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Resep Tradisional
                                    </div>
                                </div>
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <Leaf className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Bahan Pilihan
                                    </div>
                                </div>
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <HeartHandshake className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Suasana Hangat
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={about()}
                                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-banjar-700 hover:text-banjar-900"
                            >
                                Cerita selengkapnya
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
                        <div className="rounded-[1.8rem] bg-banjar-900 p-8 text-white md:p-10">
                            <div className="text-xs font-bold tracking-[.2em] text-banjar-300 uppercase">
                                Kunjungi Kami
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em]">
                                Mari makan bersama.
                            </h2>
                            <p className="mt-4 max-w-xl leading-7 text-white/60">
                                {contact.address ||
                                    'Informasi lokasi segera tersedia.'}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={contactRoute()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-banjar-800"
                                >
                                    Lihat Kontak & Lokasi
                                    <ArrowRight className="size-4" />
                                </Link>
                                <a
                                    href={
                                        contact.whatsapp
                                            ? whatsappUrl(contact.whatsapp)
                                            : contactRoute.url()
                                    }
                                    target="_blank"
                                    rel="noopener"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                                >
                                    <MessageCircle className="size-4" />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="rounded-[1.8rem] border border-banjar-200 bg-gradient-to-br from-banjar-100 to-white p-8 md:p-10">
                            <div className="grid size-12 place-items-center rounded-2xl bg-white text-banjar-700 shadow-sm">
                                <Quote className="size-5" />
                            </div>
                            <blockquote className="mt-6 font-display text-3xl leading-tight font-bold tracking-[-.03em]">
                                “Rasa Banjar, rasa yang selalu dirindukan.”
                            </blockquote>
                            <p className="mt-4 text-sm leading-6 text-stone-600">
                                Kalimat sederhana yang merangkum apa yang ingin
                                kami hadirkan di setiap sajian.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <p className="bb-container pb-5 text-xs text-[var(--bb-muted)]">
                Foto merupakan ilustrasi dari template.
            </p>
        </PublicLayout>
    );
}
