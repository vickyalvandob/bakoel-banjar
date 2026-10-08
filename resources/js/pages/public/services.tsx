import { ShoppingBag, Users, Utensils } from 'lucide-react';
import PublicPageHeading from '@/components/public-page-heading';
import PublicLayout, { ContactButton } from '@/layouts/public-layout';
import type { Contact } from '@/types/bakoel';

export default function Services({ contact }: { contact: Contact }) {
    return (
        <PublicLayout contact={contact}>
            <PublicPageHeading
                label="Layanan"
                title="Untuk makanmu. Untuk acaramu."
                description="Dari makan siang sederhana sampai kumpul bersama, pilih cara menikmati Bakoel yang sesuai."
            />
            <section className="bb-container pb-12">
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: Utensils,
                            title: 'Makan di tempat',
                            text: 'Datang dan nikmati hidangan langsung di lokasi kami.',
                            note: 'Cek lokasi dan jam buka sebelum berkunjung.',
                        },
                        {
                            icon: ShoppingBag,
                            title: 'Bawa pulang',
                            text: 'Pilih menu dan kirim pesanan melalui WhatsApp.',
                            note: 'Konfirmasikan waktu pengambilan atau opsi pengiriman.',
                        },
                        {
                            icon: Users,
                            title: 'Pesanan acara',
                            text: 'Siapkan hidangan untuk keluarga, kantor, atau acara bersama.',
                            note: 'Sampaikan tanggal, jumlah porsi, dan pilihan menu.',
                        },
                    ].map(({ icon: Icon, title, text, note }) => (
                        <article
                            key={title}
                            className="rounded-xl border border-[var(--bb-line)] p-6"
                        >
                            <Icon
                                size={24}
                                strokeWidth={1.5}
                                className="text-[var(--bb-gold)]"
                            />
                            <h2 className="mt-5 text-lg font-semibold">
                                {title}
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[var(--bb-muted)]">
                                {text}
                            </p>
                            <p className="mt-5 border-t border-[var(--bb-line)] pt-4 text-xs leading-6 text-[var(--bb-muted)]">
                                {note}
                            </p>
                        </article>
                    ))}
                </div>
                <div className="mt-10 grid gap-6 rounded-xl bg-[var(--bb-tint)] p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                        <h2 className="font-display text-2xl">
                            Mulai dari percakapan sederhana.
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--bb-muted)]">
                            Kirim pilihan menu, jumlah porsi, dan waktu yang
                            diinginkan. Kami bantu konfirmasi ketersediaan,
                            total harga, dan detail pesanan.
                        </p>
                    </div>
                    <ContactButton
                        contact={contact}
                        label="Tanya ketersediaan"
                        message="Halo Bakoel Banjar, saya ingin bertanya tentang layanan dan ketersediaan pesanan."
                        className="w-fit"
                    />
                </div>
            </section>
        </PublicLayout>
    );
}
