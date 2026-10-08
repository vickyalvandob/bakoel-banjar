import { Head, Link } from '@inertiajs/react';
import { ArrowRight, MapPin, ShoppingBag, Utensils, Users } from 'lucide-react';
import MenuCard from '@/components/menu-card';
import PublicLayout, { ContactButton } from '@/layouts/public-layout';
import { menu, services, contact as contactRoute } from '@/routes';
import type { Contact, MenuItem } from '@/types/bakoel';

export default function Home({
    contact,
    featured,
}: {
    contact: Contact;
    featured: MenuItem[];
}) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Beranda">
                <meta
                    name="description"
                    content="Temukan menu Bakoel Banjar, lihat harga, dan pesan langsung melalui WhatsApp. Hidangan untuk makan sehari-hari dan bersama keluarga."
                />
            </Head>
            <section className="bb-container grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-16">
                <div>
                    <p className="bb-eyebrow">
                        Selamat datang di Bakoel Banjar
                    </p>
                    <h1 className="mt-4 max-w-lg font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl">
                        Rasa yang akrab.
                        <br />
                        <span className="text-[var(--bb-gold)]">
                            Momen yang hangat.
                        </span>
                    </h1>
                    <p className="mt-5 max-w-md text-base leading-7 text-[var(--bb-muted)]">
                        Dari sambal gami hingga lauk favorit keluarga. Pilih
                        hidanganmu, lalu nikmati bersama orang terdekat.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link href={menu()} className="bb-button">
                            Lihat menu
                            <ArrowRight size={16} />
                        </Link>
                        <ContactButton
                            contact={contact}
                            label="Pesan sekarang"
                            className="bb-button-outline"
                        />
                    </div>
                    {contact.address && (
                        <p className="mt-7 flex items-start gap-2 text-xs leading-5 text-[var(--bb-muted)]">
                            <MapPin size={15} className="mt-0.5 shrink-0" />
                            {contact.address.split('\n')[0]}
                        </p>
                    )}
                </div>
                <figure>
                    <img
                        src="/images/Bakoel Banjar Spicy Seafood Feast.webp"
                        alt="Hidangan nasi dan lauk untuk dinikmati bersama"
                        width={1400}
                        height={932}
                        fetchPriority="high"
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                </figure>
            </section>
            {featured.length > 0 && (
                <section className="border-y border-[var(--bb-line)] bg-[var(--bb-tint)]">
                    <div className="bb-container py-10 sm:py-12">
                        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="bb-eyebrow">Dari dapur kami</p>
                                <h2 className="mt-2 font-display text-3xl tracking-tight">
                                    Pilihan Bakoel
                                </h2>
                            </div>
                            <Link
                                href={menu()}
                                className="inline-flex items-center gap-2 text-sm font-medium"
                            >
                                Semua menu
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {featured.map((item) => (
                                <MenuCard
                                    key={item.id}
                                    item={item}
                                    contact={contact}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <section className="bb-container py-10 sm:py-12">
                <div className="grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12">
                    <div>
                        <p className="bb-eyebrow">Sesuai rencanamu</p>
                        <h2 className="mt-2 font-display text-3xl tracking-tight">
                            Makan di sini,
                            <br />
                            atau bawa pulang.
                        </h2>
                        <Link
                            href={services()}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium"
                        >
                            Lihat layanan
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            {
                                icon: Utensils,
                                title: 'Makan di tempat',
                                text: 'Singgah dan nikmati pilihan menu langsung di lokasi.',
                            },
                            {
                                icon: ShoppingBag,
                                title: 'Bawa pulang',
                                text: 'Pesan melalui WhatsApp dan konfirmasi waktu pengambilan.',
                            },
                            {
                                icon: Users,
                                title: 'Pesanan bersama',
                                text: 'Diskusikan menu dan jumlah porsi untuk kebutuhan acaramu.',
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="border-t border-[var(--bb-line)] pt-5"
                            >
                                <Icon
                                    size={21}
                                    strokeWidth={1.5}
                                    className="text-[var(--bb-gold)]"
                                />
                                <h3 className="mt-4 text-sm font-semibold">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-[var(--bb-muted)]">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--bb-line)] pt-6">
                    <p className="text-sm text-[var(--bb-muted)]">
                        Ingin berkunjung atau bertanya soal menu?
                    </p>
                    <Link
                        href={contactRoute()}
                        className="inline-flex items-center gap-2 text-sm font-medium"
                    >
                        Lokasi & kontak
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
