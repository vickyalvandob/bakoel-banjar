import { Head, Link } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowRight,
    Bike,
    CalendarDays,
    MessageCircle,
    PackageCheck,
    Plus,
    ShoppingBag,
    SlidersHorizontal,
    Users,
    Utensils,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { menu, contact as contactRoute } from '@/routes';
import type { Contact } from '@/types/bakoel';
import { whatsappUrl } from '@/types/bakoel';

export default function Services({ contact }: { contact: Contact }) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Layanan" />

            <section
                id="layanan"
                className="noise overflow-hidden border-b border-banjar-200/70"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-24">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-banjar-200 bg-white/70 px-3 py-1.5 text-xs font-bold tracking-[.2em] text-banjar-700 uppercase">
                            <span className="size-1.5 rounded-full bg-banjar-500"></span>
                            Layanan Bakoel Banjar
                        </div>

                        <h1 className="max-w-3xl font-display text-5xl leading-[.98] font-bold tracking-[-.04em] md:text-6xl lg:text-7xl">
                            Satu rasa, banyak cara untuk menikmatinya.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 md:text-lg">
                            Dari makan santai di tempat hingga catering untuk
                            acara, kami siapkan layanan yang fleksibel tanpa
                            menghilangkan hangatnya cita rasa Banjar.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#pilihan-layanan"
                                className="inline-flex items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                            >
                                Lihat Semua Layanan
                                <ArrowDown className="size-4" />
                            </a>
                            <a
                                href={
                                    contact.whatsapp
                                        ? whatsappUrl(contact.whatsapp)
                                        : contactRoute.url()
                                }
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-semibold text-banjar-900 transition hover:bg-banjar-100"
                            >
                                Konsultasi Pesanan
                            </a>
                        </div>

                        <div className="mt-9 grid max-w-2xl grid-cols-2 gap-4 border-t border-banjar-200 pt-6 sm:grid-cols-4">
                            <div>
                                <div className="text-2xl font-bold text-banjar-700">
                                    01
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Dine In
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-banjar-700">
                                    02
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Take Away
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-banjar-700">
                                    03
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Delivery
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-banjar-700">
                                    04
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Catering & Acara
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-banjar-200 shadow-soft">
                        <img
                            src="/images/template/photo-1517248135467-4c7edcad34c4.jpg"
                            alt="Ilustrasi: Suasana rumah makan"
                            className="h-[520px] w-full object-cover lg:h-[590px]"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-banjar-900/55 via-transparent to-transparent"></div>
                        <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/20 bg-banjar-900/65 p-5 text-white backdrop-blur-md">
                            <div className="text-xs font-bold tracking-[.18em] text-banjar-200 uppercase">
                                Pengalaman Bersantap
                            </div>
                            <div className="mt-2 font-display text-2xl font-bold">
                                Nyaman untuk keluarga, teman, arisan, dan
                                meeting.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pilihan-layanan">
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                            Pilihan Layanan
                        </div>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                            Dirancang sederhana, supaya Anda tinggal menikmati.
                        </h2>
                        <p className="mt-4 max-w-2xl leading-7 text-stone-600">
                            Pilih layanan yang paling sesuai dengan kebutuhan
                            Anda — untuk makan sehari-hari hingga acara dengan
                            jumlah pesanan lebih besar.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <article className="service-card group overflow-hidden rounded-[1.7rem] border border-banjar-200 bg-white shadow-sm">
                            <div className="grid md:grid-cols-[.9fr_1.1fr]">
                                <div className="overflow-hidden bg-banjar-100">
                                    <img
                                        src="/images/template/photo-1515003197210-e0cd71810b5f.jpg"
                                        alt="Ilustrasi: Makan di tempat"
                                        className="h-full min-h-[280px] w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-7">
                                    <div>
                                        <div className="mb-5 grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                            <Utensils className="size-5" />
                                        </div>
                                        <h3 className="font-display text-3xl font-bold">
                                            Makan di Tempat
                                        </h3>
                                        <p className="mt-3 leading-7 text-stone-600">
                                            Untuk makan santai, keluarga, teman,
                                            maupun meeting ringan dalam suasana
                                            hangat dan nyaman.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Keluarga
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Meeting
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Makan Siang
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="service-card group overflow-hidden rounded-[1.7rem] border border-banjar-200 bg-white shadow-sm">
                            <div className="grid md:grid-cols-[.9fr_1.1fr]">
                                <div className="overflow-hidden bg-banjar-100">
                                    <img
                                        src="/images/template/photo-1547592180-85f173990554.jpg"
                                        alt="Ilustrasi: Take away"
                                        className="h-full min-h-[280px] w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-7">
                                    <div>
                                        <div className="mb-5 grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                            <ShoppingBag className="size-5" />
                                        </div>
                                        <h3 className="font-display text-3xl font-bold">
                                            Take Away
                                        </h3>
                                        <p className="mt-3 leading-7 text-stone-600">
                                            Pesan menu favorit lebih dulu, lalu
                                            ambil saat sudah siap. Praktis untuk
                                            makan di rumah atau kantor.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Praktis
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Cepat
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="service-card group overflow-hidden rounded-[1.7rem] border border-banjar-200 bg-white shadow-sm">
                            <div className="grid md:grid-cols-[.9fr_1.1fr]">
                                <div className="overflow-hidden bg-banjar-100">
                                    <img
                                        src="/images/template/photo-1565299507177-b0ac66763828.jpg"
                                        alt="Ilustrasi: Delivery"
                                        className="h-full min-h-[280px] w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-7">
                                    <div>
                                        <div className="mb-5 grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                            <Bike className="size-5" />
                                        </div>
                                        <h3 className="font-display text-3xl font-bold">
                                            Delivery
                                        </h3>
                                        <p className="mt-3 leading-7 text-stone-600">
                                            Nikmati hidangan Bakoel Banjar tanpa
                                            harus datang langsung. Cocok untuk
                                            rumah maupun kantor.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Rumah
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Kantor
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article className="service-card group overflow-hidden rounded-[1.7rem] border border-banjar-200 bg-white shadow-sm">
                            <div className="grid md:grid-cols-[.9fr_1.1fr]">
                                <div className="overflow-hidden bg-banjar-100">
                                    <img
                                        src="/images/template/photo-1507501336603-6e31db2be093.jpg"
                                        alt="Ilustrasi: Catering dan acara"
                                        className="h-full min-h-[280px] w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="flex flex-col justify-between p-7">
                                    <div>
                                        <div className="mb-5 grid size-11 place-items-center rounded-xl bg-banjar-100 text-banjar-700">
                                            <Users className="size-5" />
                                        </div>
                                        <h3 className="font-display text-3xl font-bold">
                                            Catering & Acara
                                        </h3>
                                        <p className="mt-3 leading-7 text-stone-600">
                                            Untuk kebutuhan keluarga, arisan,
                                            kantor, meeting, hingga acara khusus
                                            dengan pilihan menu yang fleksibel.
                                        </p>
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Arisan
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Kantor
                                        </span>
                                        <span className="rounded-full bg-banjar-50 px-3 py-1.5 text-xs font-semibold text-banjar-700">
                                            Acara Keluarga
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className="border-y border-banjar-200/70 bg-white/55">
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
                        <div className="lg:sticky lg:top-28">
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                                Cara Pesan
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                                Dari pilih menu sampai siap dinikmati.
                            </h2>
                            <p className="mt-4 max-w-xl leading-7 text-stone-600">
                                Prosesnya dibuat sederhana agar pesanan personal
                                maupun kebutuhan acara bisa ditangani lebih
                                cepat.
                            </p>

                            <Link
                                href={menu()}
                                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-semibold text-banjar-800 transition hover:bg-banjar-100"
                            >
                                Lihat Katalog Menu
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-5 rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-banjar-700 text-sm font-bold text-white">
                                    01
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        Pilih layanan dan menu
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-stone-600">
                                        Tentukan apakah ingin dine in, take
                                        away, delivery, atau kebutuhan catering
                                        dan acara.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5 rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-banjar-100 text-sm font-bold text-banjar-700">
                                    02
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        Konfirmasi kebutuhan
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-stone-600">
                                        Untuk pesanan besar, informasikan jumlah
                                        porsi, waktu, lokasi, dan kebutuhan
                                        khusus Anda.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5 rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-banjar-100 text-sm font-bold text-banjar-700">
                                    03
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        Kami siapkan pesanan
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-stone-600">
                                        Tim kami menyiapkan hidangan sesuai
                                        pesanan dan waktu yang telah disepakati.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-5 rounded-2xl border border-banjar-200 bg-white p-6">
                                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-banjar-100 text-sm font-bold text-banjar-700">
                                    04
                                </div>
                                <div>
                                    <h3 className="font-display text-2xl font-bold">
                                        Tinggal menikmati
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-stone-600">
                                        Ambil pesanan, terima pengantaran, atau
                                        nikmati langsung hidangan di tempat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="grid overflow-hidden rounded-[2rem] border border-banjar-200 bg-banjar-900 text-white lg:grid-cols-[1.05fr_.95fr]">
                        <div className="p-8 md:p-12 lg:p-14">
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-300 uppercase">
                                Untuk Acara
                            </div>
                            <h2 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                                Bawa cita rasa Bakoel Banjar ke momen spesial
                                Anda.
                            </h2>
                            <p className="mt-5 max-w-xl leading-7 text-white/65">
                                Kami melayani kebutuhan hidangan untuk keluarga,
                                kantor, arisan, meeting, dan berbagai acara
                                lainnya dengan pilihan menu yang dapat
                                disesuaikan.
                            </p>

                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <CalendarDays className="size-5 text-banjar-300" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Jadwal Fleksibel
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-white/50">
                                        Atur waktu pengambilan atau pengantaran
                                        sesuai kebutuhan.
                                    </div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <SlidersHorizontal className="size-5 text-banjar-300" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Menu Fleksibel
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-white/50">
                                        Pilih kombinasi menu yang paling cocok
                                        untuk acara Anda.
                                    </div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <PackageCheck className="size-5 text-banjar-300" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Pesanan Jumlah Besar
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-white/50">
                                        Cocok untuk kebutuhan kantor dan acara
                                        bersama.
                                    </div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <MessageCircle className="size-5 text-banjar-300" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Konsultasi Cepat
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-white/50">
                                        Kebutuhan acara dapat dibicarakan
                                        langsung melalui WhatsApp.
                                    </div>
                                </div>
                            </div>

                            <a
                                href={
                                    contact.whatsapp
                                        ? whatsappUrl(contact.whatsapp)
                                        : contactRoute.url()
                                }
                                target="_blank"
                                rel="noopener"
                                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-banjar-800 transition hover:-translate-y-0.5"
                            >
                                Konsultasi Catering
                                <ArrowRight className="size-4" />
                            </a>
                        </div>

                        <div className="feature-photo min-h-[460px] overflow-hidden">
                            <img
                                src="/images/template/photo-1507501336603-6e31db2be093.jpg"
                                alt="Ilustrasi: Acara dan catering"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
                    <div>
                        <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                            Pertanyaan Umum
                        </div>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                            Sebelum memesan, mungkin ini yang ingin Anda tahu.
                        </h2>
                    </div>

                    <div className="divide-y divide-banjar-200 rounded-2xl border border-banjar-200 bg-white px-6">
                        <details className="group">
                            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                                <span className="font-semibold">
                                    Apakah bisa pesan untuk acara keluarga atau
                                    kantor?
                                </span>
                                <span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full bg-banjar-100 text-banjar-700">
                                    <Plus className="size-4" />
                                </span>
                            </summary>
                            <div>
                                <p className="pb-5 text-sm leading-6 text-stone-600">
                                    Bisa. Anda dapat menghubungi kami untuk
                                    menyesuaikan jumlah porsi, pilihan menu,
                                    waktu, dan kebutuhan pengantaran.
                                </p>
                            </div>
                        </details>

                        <details className="group">
                            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                                <span className="font-semibold">
                                    Apakah tersedia take away dan delivery?
                                </span>
                                <span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full bg-banjar-100 text-banjar-700">
                                    <Plus className="size-4" />
                                </span>
                            </summary>
                            <div>
                                <p className="pb-5 text-sm leading-6 text-stone-600">
                                    Ya. Anda dapat memilih take away atau
                                    menghubungi kami untuk opsi delivery sesuai
                                    area layanan yang tersedia.
                                </p>
                            </div>
                        </details>

                        <details className="group">
                            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                                <span className="font-semibold">
                                    Apakah menu catering bisa disesuaikan?
                                </span>
                                <span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full bg-banjar-100 text-banjar-700">
                                    <Plus className="size-4" />
                                </span>
                            </summary>
                            <div>
                                <p className="pb-5 text-sm leading-6 text-stone-600">
                                    Bisa. Pilihan menu dapat didiskusikan
                                    berdasarkan kebutuhan acara, jumlah porsi,
                                    dan menu yang tersedia.
                                </p>
                            </div>
                        </details>

                        <details className="group">
                            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                                <span className="font-semibold">
                                    Bagaimana cara paling cepat untuk melakukan
                                    pemesanan?
                                </span>
                                <span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full bg-banjar-100 text-banjar-700">
                                    <Plus className="size-4" />
                                </span>
                            </summary>
                            <div>
                                <p className="pb-5 text-sm leading-6 text-stone-600">
                                    Cara paling cepat adalah menghubungi Bakoel
                                    Banjar melalui WhatsApp agar detail pesanan
                                    dapat langsung dikonfirmasi.
                                </p>
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-7 rounded-[1.7rem] border border-banjar-200 bg-gradient-to-r from-banjar-100 to-white px-7 py-8 md:flex-row md:items-center md:px-10">
                        <div>
                            <div className="text-xs font-bold tracking-[.2em] text-banjar-600 uppercase">
                                Bakoel Banjar
                            </div>
                            <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                                Ada kebutuhan khusus untuk pesanan Anda?
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                                Ceritakan kebutuhan Anda, kami bantu sesuaikan
                                layanan dan pilihan menunya.
                            </p>
                        </div>
                        <a
                            href={
                                contact.whatsapp
                                    ? whatsappUrl(contact.whatsapp)
                                    : contactRoute.url()
                            }
                            target="_blank"
                            rel="noopener"
                            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                        >
                            <MessageCircle className="size-4" />
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </section>

            <p className="bb-container pb-5 text-xs text-[var(--bb-muted)]">
                Foto merupakan ilustrasi dari template.
            </p>
        </PublicLayout>
    );
}
