import { Head, Link } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowRight,
    CalendarDays,
    ChefHat,
    Drumstick,
    Fish,
    Flame,
    HeartHandshake,
    House,
    Leaf,
    Quote,
    Sprout,
    Users,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { menu, contact as contactRoute } from '@/routes';
import type { Contact } from '@/types/bakoel';

export default function About({ contact }: { contact: Contact }) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Tentang" />

            <section
                id="tentang"
                className="noise overflow-hidden border-b border-banjar-200/70"
            >
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-8 lg:py-24">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-banjar-200 bg-white/70 px-3 py-1.5 text-xs font-bold tracking-[.2em] text-banjar-700 uppercase">
                            <span className="size-1.5 rounded-full bg-banjar-500"></span>
                            Tentang Bakoel Banjar
                        </div>

                        <h1 className="max-w-3xl font-display text-5xl leading-[.98] font-bold tracking-[-.04em] md:text-6xl lg:text-7xl">
                            Menjaga rasa Banjar tetap dekat dengan keseharian.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-stone-600 md:text-lg">
                            Bakoel Banjar lahir dari keinginan sederhana:
                            menghadirkan masakan khas Kalimantan yang hangat,
                            familiar, dan bisa dinikmati siapa saja dalam
                            suasana yang nyaman.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#cerita"
                                className="inline-flex items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                            >
                                Cerita Kami
                                <ArrowDown className="size-4" />
                            </a>
                            <Link
                                href={menu()}
                                className="inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-semibold text-banjar-900 transition hover:bg-banjar-100"
                            >
                                Jelajahi Menu
                            </Link>
                        </div>

                        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-banjar-200 pt-6">
                            <div>
                                <div className="font-display text-3xl font-bold text-banjar-700">
                                    01
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Rasa Autentik
                                </div>
                            </div>
                            <div>
                                <div className="font-display text-3xl font-bold text-banjar-700">
                                    02
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Bahan Pilihan
                                </div>
                            </div>
                            <div>
                                <div className="font-display text-3xl font-bold text-banjar-700">
                                    03
                                </div>
                                <div className="mt-1 text-xs text-stone-500">
                                    Suasana Hangat
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="image-hover relative overflow-hidden rounded-[2rem] border border-white/70 bg-banjar-200 shadow-soft">
                        <img
                            src="/images/template/photo-1517248135467-4c7edcad34c4.jpg"
                            alt="Ilustrasi: Suasana rumah makan Bakoel Banjar"
                            className="h-[520px] w-full object-cover lg:h-[600px]"
                            fetchPriority="high"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-banjar-900/58 via-transparent to-transparent"></div>
                        <div className="absolute right-5 bottom-5 left-5 rounded-2xl border border-white/20 bg-banjar-900/62 p-5 text-white backdrop-blur-md">
                            <div className="text-xs font-bold tracking-[.18em] text-banjar-200 uppercase">
                                Bakoel Banjar
                            </div>
                            <div className="mt-2 font-display text-2xl font-bold">
                                Tradisional dalam rasa, modern dalam pengalaman.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cerita">
                <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
                    <div>
                        <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                            Cerita Kami
                        </div>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                            Berangkat dari rasa yang ingin selalu dirindukan.
                        </h2>
                    </div>

                    <div className="space-y-6 text-base leading-8 text-stone-600">
                        <p>
                            Bakoel Banjar membawa inspirasi dari masakan khas
                            Kalimantan, khususnya cita rasa Banjar yang kaya
                            bumbu, hangat, dan dekat dengan suasana makan
                            bersama.
                        </p>
                        <p>
                            Kami percaya makanan yang baik bukan hanya soal
                            rasa, tetapi juga tentang pengalaman: duduk bersama,
                            berbagi hidangan, dan menikmati waktu tanpa harus
                            terasa rumit.
                        </p>
                        <p>
                            Karena itu, Bakoel Banjar dibangun dengan pendekatan
                            yang sederhana — bahan yang baik, rasa yang kuat,
                            pelayanan yang ramah, dan suasana yang nyaman untuk
                            berbagai momen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y border-banjar-200/70 bg-white/55">
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="mb-10 max-w-3xl">
                        <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                            Yang Kami Jaga
                        </div>
                        <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                            Tiga hal sederhana yang menjadi karakter Bakoel
                            Banjar.
                        </h2>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        <article className="rounded-[1.6rem] border border-banjar-200 bg-white p-7 shadow-sm">
                            <div className="grid size-12 place-items-center rounded-2xl bg-banjar-100 text-banjar-700">
                                <ChefHat className="size-5" />
                            </div>
                            <h3 className="mt-6 font-display text-2xl font-bold">
                                Rasa yang Berkarakter
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Kami mempertahankan karakter masakan yang kaya
                                rempah, gurih, pedas, dan akrab dengan selera
                                Nusantara.
                            </p>
                        </article>

                        <article className="rounded-[1.6rem] border border-banjar-200 bg-white p-7 shadow-sm">
                            <div className="grid size-12 place-items-center rounded-2xl bg-banjar-100 text-banjar-700">
                                <Leaf className="size-5" />
                            </div>
                            <h3 className="mt-6 font-display text-2xl font-bold">
                                Bahan yang Dipilih
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Setiap menu dibuat dengan perhatian pada
                                kesegaran, kualitas bahan, dan keseimbangan
                                rasa.
                            </p>
                        </article>

                        <article className="rounded-[1.6rem] border border-banjar-200 bg-white p-7 shadow-sm">
                            <div className="grid size-12 place-items-center rounded-2xl bg-banjar-100 text-banjar-700">
                                <Users className="size-5" />
                            </div>
                            <h3 className="mt-6 font-display text-2xl font-bold">
                                Momen Kebersamaan
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Dari makan siang sampai acara keluarga, Bakoel
                                Banjar dibuat untuk terasa hangat dan mudah
                                dinikmati bersama.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="grid overflow-hidden rounded-[2rem] border border-banjar-200 bg-white lg:grid-cols-[1.05fr_.95fr]">
                        <div className="image-hover min-h-[460px] overflow-hidden">
                            <img
                                src="/images/template/photo-1504674900247-0877df9cc836.jpg"
                                alt="Ilustrasi: Hidangan Nusantara"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-600 uppercase">
                                Identitas Rasa
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em] md:text-5xl">
                                Gami, bakar, goreng, dan hidangan yang terasa
                                familiar.
                            </h2>
                            <p className="mt-5 leading-7 text-stone-600">
                                Menu Bakoel Banjar tidak dibuat untuk terasa
                                rumit. Kami memilih hidangan yang mudah
                                dinikmati, tetapi tetap punya karakter kuat
                                melalui sambal, bumbu bakar, rempah, dan cita
                                rasa khas Nusantara.
                            </p>

                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <Flame className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Sambal Gami
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-stone-500">
                                        Pedas, gurih, dan disajikan dengan
                                        karakter rasa yang kuat.
                                    </div>
                                </div>
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <Drumstick className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Ayam & Bebek
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-stone-500">
                                        Menu utama yang cocok untuk makan
                                        sehari-hari maupun bersama.
                                    </div>
                                </div>
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <Fish className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Ikan & Seafood
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-stone-500">
                                        Pilihan ikan dan seafood dengan rasa
                                        gurih, bakar, dan pedas.
                                    </div>
                                </div>
                                <div className="rounded-xl bg-banjar-50 p-4">
                                    <Sprout className="size-5 text-banjar-700" />
                                    <div className="mt-3 text-sm font-semibold">
                                        Sayuran & Pelengkap
                                    </div>
                                    <div className="mt-1 text-xs leading-5 text-stone-500">
                                        Menyeimbangkan hidangan utama dengan
                                        pilihan yang lebih ringan.
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={menu()}
                                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                            >
                                Lihat Menu Lengkap
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
                        <div className="rounded-[1.8rem] bg-banjar-900 p-8 text-white md:p-10">
                            <div className="text-xs font-bold tracking-[.22em] text-banjar-300 uppercase">
                                Pengalaman Bakoel Banjar
                            </div>
                            <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.03em]">
                                Dibuat untuk terasa santai, hangat, dan mudah
                                dinikmati.
                            </h2>
                            <p className="mt-5 leading-7 text-white/60">
                                Dari datang langsung, take away, hingga
                                catering, pengalaman Bakoel Banjar dirancang
                                tetap sederhana dan dekat dengan kebutuhan
                                sehari-hari.
                            </p>

                            <div className="mt-8 space-y-4">
                                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                                    <House className="mt-0.5 size-5 shrink-0 text-banjar-300" />
                                    <div>
                                        <div className="text-sm font-semibold">
                                            Nuansa hangat
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-white/50">
                                            Terinspirasi dari suasana saung dan
                                            tempat makan keluarga.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                                    <HeartHandshake className="mt-0.5 size-5 shrink-0 text-banjar-300" />
                                    <div>
                                        <div className="text-sm font-semibold">
                                            Pelayanan sederhana
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-white/50">
                                            Tidak berlebihan, fokus pada
                                            kebutuhan tamu dan kemudahan
                                            memesan.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                                    <CalendarDays className="mt-0.5 size-5 shrink-0 text-banjar-300" />
                                    <div>
                                        <div className="text-sm font-semibold">
                                            Untuk berbagai momen
                                        </div>
                                        <div className="mt-1 text-xs leading-5 text-white/50">
                                            Keluarga, arisan, makan siang,
                                            meeting, hingga kebutuhan acara.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="image-hover overflow-hidden rounded-[1.8rem] border border-banjar-200 bg-banjar-100">
                            <img
                                src="/images/template/photo-1498654896293-37aacf113fd9.jpg"
                                alt="Ilustrasi: Makan bersama"
                                className="h-full min-h-[520px] w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-banjar-200/70 bg-white/55">
                <div className="mx-auto max-w-5xl px-5 py-20 text-center lg:px-8">
                    <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-banjar-100 text-banjar-700">
                        <Quote className="size-5" />
                    </div>
                    <blockquote className="mt-6 font-display text-3xl leading-tight font-bold tracking-[-.03em] md:text-5xl">
                        “Rasa Banjar, rasa yang selalu dirindukan.”
                    </blockquote>
                    <p className="mx-auto mt-5 max-w-2xl leading-7 text-stone-600">
                        Kalimat sederhana yang merangkum tujuan kami:
                        menghadirkan rasa yang familiar, hangat, dan ingin
                        dinikmati kembali.
                    </p>
                </div>
            </section>

            <section>
                <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-7 rounded-[1.7rem] bg-gradient-to-r from-banjar-100 to-white px-7 py-8 ring-1 ring-banjar-200 md:flex-row md:items-center md:px-10">
                        <div>
                            <div className="text-xs font-bold tracking-[.2em] text-banjar-600 uppercase">
                                Kenal Lebih Dekat
                            </div>
                            <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                                Sekarang waktunya mencicipi sendiri.
                            </h3>
                            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                                Jelajahi katalog menu atau hubungi kami untuk
                                pesanan dan kebutuhan acara.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={menu()}
                                className="inline-flex items-center gap-2 rounded-xl bg-banjar-700 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-banjar-800"
                            >
                                Lihat Menu
                                <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href={contactRoute()}
                                className="inline-flex items-center gap-2 rounded-xl border border-banjar-200 bg-white px-5 py-3 text-sm font-bold text-banjar-800 transition hover:bg-banjar-100"
                            >
                                Hubungi Kami
                            </Link>
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
