import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    Clock,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
} from 'lucide-react';
import PublicPageHeading from '@/components/public-page-heading';
import PublicLayout from '@/layouts/public-layout';
import type { Contact } from '@/types/bakoel';
import { whatsappUrl } from '@/types/bakoel';

export default function ContactPage({ contact }: { contact: Contact }) {
    const channels = [
        {
            icon: MessageCircle,
            title: 'WhatsApp',
            detail: contact.whatsapp ? '+' + contact.whatsapp : null,
            href: contact.whatsapp ? whatsappUrl(contact.whatsapp) : null,
            note: 'Pesanan dan pertanyaan',
        },
        {
            icon: Instagram,
            title: 'Instagram',
            detail: 'Kunjungi Instagram kami',
            href: contact.instagram_url,
            note: 'Kabar dari Bakoel',
        },
        {
            icon: Mail,
            title: 'Email',
            detail: contact.email,
            href: contact.email ? 'mailto:' + contact.email : null,
            note: 'Pertanyaan dan kerja sama',
        },
    ].filter((channel) => channel.href);

    return (
        <PublicLayout contact={contact}>
            <Head title="Kontak">
                <meta
                    name="description"
                    content="Hubungi Bakoel Banjar melalui WhatsApp, lihat alamat, jam operasional, dan petunjuk lokasi."
                />
            </Head>
            <PublicPageHeading
                label="Kontak"
                title="Mari, mampir atau sapa kami."
                description="Tanya menu, buat pesanan, atau rencanakan kunjunganmu. Kami siap membantu."
            />
            <section className="bb-container grid gap-8 pb-12 md:grid-cols-[1.1fr_1fr] md:gap-14">
                <div className="rounded-xl border border-[var(--bb-line)] p-6 sm:p-8">
                    <MapPin
                        size={24}
                        strokeWidth={1.5}
                        className="text-[var(--bb-gold)]"
                    />
                    <h2 className="mt-4 text-lg font-semibold">
                        Lokasi Bakoel Banjar
                    </h2>
                    <p className="mt-3 text-sm leading-7 whitespace-pre-line text-[var(--bb-muted)]">
                        {contact.address ||
                            'Informasi lokasi akan segera tersedia.'}
                    </p>
                    {contact.maps_url && (
                        <a
                            href={contact.maps_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bb-button bb-button-outline mt-5"
                        >
                            Buka petunjuk arah
                            <ArrowUpRight size={16} />
                        </a>
                    )}
                    <div className="mt-7 flex gap-3 border-t border-[var(--bb-line)] pt-6">
                        <Clock
                            size={18}
                            className="mt-0.5 shrink-0 text-[var(--bb-gold)]"
                        />
                        <div>
                            <h3 className="text-sm font-semibold">
                                Jam operasional
                            </h3>
                            <p className="mt-2 text-sm leading-6 whitespace-pre-line text-[var(--bb-muted)]">
                                {contact.opening_hours ||
                                    'Hubungi kami untuk memastikan jam buka.'}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="mb-2 text-lg font-semibold">
                        Hubungi langsung
                    </h2>
                    {channels.length ? (
                        channels.map(
                            ({ icon: Icon, title, detail, href, note }) => (
                                <a
                                    key={title}
                                    href={href!}
                                    target={
                                        title === 'Email' ? undefined : '_blank'
                                    }
                                    rel="noreferrer"
                                    className="group flex items-center gap-4 border-b border-[var(--bb-line)] py-5"
                                >
                                    <Icon
                                        size={21}
                                        strokeWidth={1.5}
                                        className="shrink-0 text-[var(--bb-gold)]"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-semibold">
                                            {title}
                                            <span className="ml-2 text-xs font-normal text-[var(--bb-muted)]">
                                                {note}
                                            </span>
                                        </h3>
                                        <p className="mt-1.5 text-sm break-words text-[var(--bb-muted)]">
                                            {detail}
                                        </p>
                                    </div>
                                    <ArrowUpRight
                                        size={17}
                                        className="shrink-0 text-[var(--bb-muted)] group-hover:text-[var(--bb-gold)]"
                                    />
                                </a>
                            ),
                        )
                    ) : (
                        <p className="py-5 text-sm leading-6 text-[var(--bb-muted)]">
                            Informasi kontak akan segera tersedia. Silakan
                            kunjungi kembali halaman ini.
                        </p>
                    )}
                    <p className="mt-6 max-w-sm text-xs leading-6 text-[var(--bb-muted)]">
                        Untuk memesan, sebutkan nama menu, jumlah porsi, dan
                        waktu yang diinginkan agar kami bisa membantu lebih
                        cepat.
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}
