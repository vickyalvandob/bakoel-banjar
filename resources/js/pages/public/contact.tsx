import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    Clock,
    HelpCircle,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    ShoppingBag,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import PublicLayout, { ContactButton } from '@/layouts/public-layout';
import type { Contact } from '@/types/bakoel';
import { whatsappUrl } from '@/types/bakoel';

export default function ContactPage({ contact }: { contact: Contact }) {
    const [details, setDetails] = useState({
        name: '',
        phone: '',
        purpose: 'Pesan Menu',
        message: '',
    });
    function openMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!contact.whatsapp) return;
        const message = `Halo Bakoel Banjar,\n\nNama: ${details.name.trim()}\nNo. WhatsApp: ${details.phone.trim() || '-'}\nKeperluan: ${details.purpose}\n\n${details.message.trim()}`;
        window.open(
            whatsappUrl(contact.whatsapp, message),
            '_blank',
            'noopener,noreferrer',
        );
    }
    const inputClass =
        'w-full rounded-xl border border-[var(--bb-line)] bg-[var(--bb-paper)] px-4 py-3.5 text-sm';
    return (
        <PublicLayout contact={contact}>
            <Head title="Kontak" />
            <section className="noise border-b border-[var(--bb-line)]">
                <div className="bb-container py-16 lg:py-24">
                    <p className="bb-eyebrow mb-5 inline-flex rounded-full border border-[var(--bb-line)] bg-[var(--bb-card)] px-3 py-2">
                        Hubungi Kami
                    </p>
                    <h1 className="max-w-4xl font-display text-5xl leading-[.98] font-bold tracking-[-.04em] md:text-6xl lg:text-7xl">
                        Kami siap membantu pesanan dan kebutuhan acara Anda.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--bb-muted)] md:text-lg">
                        Untuk pemesanan menu, delivery, catering, acara
                        keluarga, arisan, maupun meeting, hubungi Bakoel Banjar
                        melalui kanal yang paling nyaman untuk Anda.
                    </p>
                    <div className="mt-12 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                icon: MessageCircle,
                                title: 'WhatsApp',
                                value: contact.whatsapp
                                    ? '+' + contact.whatsapp
                                    : 'Segera tersedia',
                                href: contact.whatsapp
                                    ? whatsappUrl(contact.whatsapp)
                                    : null,
                                note: 'Untuk order, catering & pertanyaan cepat',
                            },
                            {
                                icon: Instagram,
                                title: 'Instagram',
                                value: contact.instagram_url
                                    ? 'Ikuti cerita Bakoel Banjar'
                                    : 'Segera tersedia',
                                href: contact.instagram_url,
                                note: 'Menu, promo, dan update terbaru',
                            },
                            {
                                icon: MapPin,
                                title: 'Lokasi',
                                value:
                                    contact.address?.split('\n')[0] ||
                                    'Informasi lokasi menyusul',
                                href: '#lokasi',
                                note: 'Temukan lokasi dan petunjuk arah',
                            },
                        ].map(({ icon: Icon, title, value, href, note }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-[var(--bb-line)] bg-[var(--bb-card)] p-5"
                            >
                                <Icon size={22} className="mb-5" />
                                <p className="text-sm text-[var(--bb-muted)]">
                                    {title}
                                </p>
                                {href ? (
                                    <a
                                        href={href}
                                        target={
                                            href.startsWith('#')
                                                ? undefined
                                                : '_blank'
                                        }
                                        rel="noreferrer"
                                        className="mt-1 flex items-center gap-2 text-lg font-bold"
                                    >
                                        {value}
                                        <ArrowUpRight
                                            size={16}
                                            className="shrink-0"
                                        />
                                    </a>
                                ) : (
                                    <p className="mt-1 text-lg font-bold">
                                        {value}
                                    </p>
                                )}
                                <p className="mt-2 text-xs text-[var(--bb-muted)]">
                                    {note}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="bb-container grid gap-8 py-20 lg:grid-cols-[.82fr_1.18fr]">
                <div>
                    <p className="bb-eyebrow">Butuh bantuan?</p>
                    <h2 className="bb-heading mt-3 font-bold">
                        Ceritakan kebutuhan Anda.
                    </h2>
                    <p className="mt-4 leading-7 text-[var(--bb-muted)]">
                        Isi form singkat di samping untuk menyiapkan pesan. Anda
                        dapat memeriksa dan mengirimkannya melalui WhatsApp.
                    </p>
                    <div className="mt-8 space-y-4">
                        {[
                            {
                                icon: ShoppingBag,
                                title: 'Pesan Menu',
                                text: 'Untuk take away, delivery, atau pertanyaan menu.',
                            },
                            {
                                icon: Users,
                                title: 'Catering & Acara',
                                text: 'Untuk keluarga, kantor, arisan, meeting, dan acara khusus.',
                            },
                            {
                                icon: HelpCircle,
                                title: 'Informasi Lainnya',
                                text: 'Tanyakan hal lain seputar Bakoel Banjar.',
                            },
                        ].map(({ icon: Icon, title, text }) => (
                            <div
                                key={title}
                                className="flex gap-4 rounded-2xl border border-[var(--bb-line)] bg-[var(--bb-card)] p-5"
                            >
                                <Icon className="size-10 shrink-0 rounded-xl bg-[var(--bb-tint)] p-2" />
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-[var(--bb-muted)]">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form
                    onSubmit={openMessage}
                    className="rounded-[1.8rem] border border-[var(--bb-line)] bg-[var(--bb-card)] p-6 md:p-8"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="customer-name"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Nama
                            </label>
                            <input
                                id="customer-name"
                                required
                                maxLength={100}
                                autoComplete="name"
                                value={details.name}
                                onChange={(e) =>
                                    setDetails({
                                        ...details,
                                        name: e.target.value,
                                    })
                                }
                                className={inputClass}
                                placeholder="Nama Anda"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="customer-phone"
                                className="mb-2 block text-sm font-semibold"
                            >
                                No. WhatsApp (opsional)
                            </label>
                            <input
                                id="customer-phone"
                                type="tel"
                                maxLength={25}
                                autoComplete="tel"
                                value={details.phone}
                                onChange={(e) =>
                                    setDetails({
                                        ...details,
                                        phone: e.target.value,
                                    })
                                }
                                className={inputClass}
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label
                            htmlFor="purpose"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Keperluan
                        </label>
                        <select
                            id="purpose"
                            className={inputClass}
                            value={details.purpose}
                            onChange={(e) =>
                                setDetails({
                                    ...details,
                                    purpose: e.target.value,
                                })
                            }
                        >
                            {[
                                'Pesan Menu',
                                'Take Away',
                                'Delivery',
                                'Catering & Acara',
                                'Reservasi / Makan di Tempat',
                                'Informasi Lainnya',
                            ].map((p) => (
                                <option key={p}>{p}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-5">
                        <label
                            htmlFor="message"
                            className="mb-2 block text-sm font-semibold"
                        >
                            Pesan
                        </label>
                        <textarea
                            id="message"
                            rows={6}
                            required
                            maxLength={2000}
                            value={details.message}
                            onChange={(e) =>
                                setDetails({
                                    ...details,
                                    message: e.target.value,
                                })
                            }
                            className={inputClass}
                            placeholder="Contoh: Saya ingin pesan catering untuk 30 orang pada hari Sabtu..."
                        />
                    </div>
                    <p className="mt-5 rounded-xl bg-[var(--bb-tint)] p-4 text-xs leading-5 text-[var(--bb-muted)]">
                        Form ini tidak menyimpan data. Tombol berikut membuka
                        WhatsApp dengan pesan yang sudah terisi.
                    </p>
                    <button
                        disabled={!contact.whatsapp}
                        type="submit"
                        className="bb-button mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <MessageCircle size={17} />
                        {contact.whatsapp
                            ? 'Lanjutkan ke WhatsApp'
                            : 'Nomor WhatsApp belum tersedia'}
                    </button>
                </form>
            </section>
            <section
                id="lokasi"
                className="border-y border-[var(--bb-line)] bg-[var(--bb-card)]"
            >
                <div className="bb-container py-20">
                    <p className="bb-eyebrow">Lokasi Kami</p>
                    <h2 className="bb-heading mt-3 font-bold">
                        Temukan Bakoel Banjar.
                    </h2>
                    <div className="mt-9 grid overflow-hidden rounded-[1.8rem] border border-[var(--bb-line)] lg:grid-cols-[1.15fr_.85fr]">
                        <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-[var(--bb-tint)] p-10">
                            <div className="absolute size-72 rounded-full border border-[var(--bb-line)]" />
                            <div className="absolute size-48 rounded-full border border-[var(--bb-line)]" />
                            <div className="relative text-center">
                                <MapPin
                                    size={54}
                                    strokeWidth={1.2}
                                    className="mx-auto"
                                />
                                <p className="mt-5 font-display text-2xl font-bold">
                                    Bakoel Banjar
                                </p>
                                <p className="mt-3 text-xs text-[var(--bb-muted)]">
                                    Buka petunjuk arah untuk melihat lokasi di
                                    peta.
                                </p>
                            </div>
                        </div>
                        <div className="p-8 lg:p-10">
                            <h3 className="font-display text-3xl font-bold">
                                Kunjungi kami
                            </h3>
                            <p className="mt-4 leading-7 whitespace-pre-line text-[var(--bb-muted)]">
                                {contact.address ||
                                    'Alamat lengkap segera tersedia.'}
                            </p>
                            <div className="mt-6 flex items-start gap-3 border-t border-[var(--bb-line)] pt-6">
                                <Clock size={19} className="mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-semibold">
                                        Jam operasional
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 whitespace-pre-line text-[var(--bb-muted)]">
                                        {contact.opening_hours ||
                                            'Hubungi kami untuk memastikan jam operasional.'}
                                    </p>
                                </div>
                            </div>
                            {contact.email && (
                                <a
                                    href={'mailto:' + contact.email}
                                    className="mt-5 flex items-center gap-3 text-sm break-all"
                                >
                                    <Mail size={18} />
                                    {contact.email}
                                </a>
                            )}
                            {contact.maps_url && (
                                <a
                                    href={contact.maps_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bb-button bb-button-outline mt-7"
                                >
                                    Buka petunjuk arah
                                    <ArrowUpRight size={17} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bb-container py-16">
                <div className="flex flex-wrap items-center justify-between gap-6 rounded-[1.8rem] bg-banjar-900 p-8 text-white">
                    <div>
                        <p className="text-xs tracking-widest text-banjar-200 uppercase">
                            Bakoel Banjar
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-bold">
                            Lebih nyaman ngobrol langsung?
                        </h2>
                        <p className="mt-3 text-sm text-white/65">
                            Ceritakan kebutuhan Anda. Kami bantu dari pemilihan
                            menu sampai kebutuhan acara.
                        </p>
                    </div>
                    <ContactButton contact={contact} label="Chat WhatsApp" />
                </div>
            </section>
        </PublicLayout>
    );
}
