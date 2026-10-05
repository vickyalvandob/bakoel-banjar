import { Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    Clock,
    Instagram,
    MapPin,
    Menu,
    MessageCircle,
    X,
} from 'lucide-react';
import { useState } from 'react';
import type { PropsWithChildren } from 'react';
import BakoelBrand from '@/components/bakoel-brand';
import {
    about,
    contact as contactRoute,
    home,
    login,
    menu,
    services,
} from '@/routes';
import type { Contact } from '@/types/bakoel';
import { whatsappUrl } from '@/types/bakoel';

export const publicNavigation = [
    { label: 'Beranda', route: home },
    { label: 'Menu', route: menu },
    { label: 'Layanan', route: services },
    { label: 'Tentang', route: about },
    { label: 'Kontak', route: contactRoute },
];

export function ContactButton({
    contact,
    label = 'Pesan Sekarang',
    className = '',
    message,
}: {
    contact: Contact;
    label?: string;
    className?: string;
    message?: string;
}) {
    return contact.whatsapp ? (
        <a
            href={whatsappUrl(contact.whatsapp, message)}
            target="_blank"
            rel="noreferrer"
            className={`bb-button ${className}`}
        >
            <MessageCircle size={17} />
            {label}
        </a>
    ) : (
        <Link href={contactRoute()} className={`bb-button ${className}`}>
            Hubungi kami
            <ArrowUpRight size={17} />
        </Link>
    );
}

export default function PublicLayout({
    children,
    contact,
}: PropsWithChildren<{ contact: Contact }>) {
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const path = url.split('?')[0];
    return (
        <div className="bb-public min-h-screen bg-[var(--bb-paper)] text-[var(--bb-ink)]">
            <a
                href="#main-content"
                className="sr-only z-50 bg-banjar-700 p-3 text-white focus:not-sr-only focus:fixed"
            >
                Lewati ke konten
            </a>
            <header className="sticky top-0 z-40 border-b border-[var(--bb-line)] bg-[var(--bb-paper)]/95 backdrop-blur-xl">
                <div className="bb-container flex h-[76px] items-center justify-between gap-4">
                    <Link href={home()} aria-label="Bakoel Banjar, beranda">
                        <BakoelBrand />
                    </Link>
                    <nav
                        aria-label="Navigasi utama"
                        className="hidden items-center gap-7 lg:flex"
                    >
                        {publicNavigation.map(({ label, route }) => (
                            <Link
                                key={label}
                                href={route()}
                                prefetch
                                aria-current={
                                    path === route.url() ? 'page' : undefined
                                }
                                className={`border-b-2 py-2 text-sm font-medium transition-colors hover:text-[var(--bb-gold)] ${path === route.url() ? 'border-[var(--bb-forest)] text-[var(--bb-ink)]' : 'border-transparent text-[var(--bb-muted)]'}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <Link
                            href={menu()}
                            className="bb-button bb-button-outline hidden xl:inline-flex"
                        >
                            <BookOpen size={16} />
                            Menu
                        </Link>
                        <div className="hidden sm:block">
                            <ContactButton contact={contact} />
                        </div>
                        <button
                            type="button"
                            aria-label={
                                open ? 'Tutup navigasi' : 'Buka navigasi'
                            }
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                            onClick={() => setOpen(!open)}
                            className="rounded-xl border border-[var(--bb-line)] p-2.5 lg:hidden"
                        >
                            {open ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
                {open && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Navigasi seluler"
                        className="bb-container flex flex-col gap-1 border-t border-[var(--bb-line)] py-4 lg:hidden"
                    >
                        {publicNavigation.map(({ label, route }) => (
                            <Link
                                key={label}
                                href={route()}
                                onClick={() => setOpen(false)}
                                aria-current={
                                    path === route.url() ? 'page' : undefined
                                }
                                className="rounded-lg px-3 py-3 text-sm hover:bg-[var(--bb-tint)]"
                            >
                                {label}
                            </Link>
                        ))}
                        <ContactButton
                            contact={contact}
                            className="mt-2 self-start"
                        />
                    </nav>
                )}
            </header>
            <main id="main-content">{children}</main>
            <footer className="bg-banjar-900 text-white">
                <div className="bb-container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_.75fr_.9fr_1.2fr]">
                    <div>
                        <Link href={home()}>
                            <BakoelBrand />
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                            Cita rasa Banjar yang hangat, sederhana, dan dekat
                            dengan momen kebersamaan.
                        </p>
                        {contact.instagram_url && (
                            <a
                                href={contact.instagram_url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram Bakoel Banjar"
                                className="mt-5 inline-flex rounded-lg border border-white/15 p-2.5"
                            >
                                <Instagram size={17} />
                            </a>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5 text-sm font-semibold">Jelajahi</h2>
                        <div className="flex flex-col gap-3 text-sm text-white/65">
                            {publicNavigation.map(({ label, route }) => (
                                <Link
                                    key={label}
                                    href={route()}
                                    className="hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-5 text-sm font-semibold">
                            Pilihan Menu
                        </h2>
                        <div className="flex flex-col gap-3 text-sm text-white/65">
                            {[
                                'Gami Spesial',
                                'Ayam',
                                'Bebek',
                                'Seafood',
                                'Minuman',
                            ].map((category) => (
                                <Link
                                    key={category}
                                    href={menu({ query: { category } })}
                                    className="hover:text-white"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-5 text-sm font-semibold">
                            Kunjungi & Hubungi
                        </h2>
                        <div className="flex items-start gap-3 text-sm leading-6 text-white/65">
                            <MapPin
                                size={17}
                                className="mt-1 shrink-0 text-banjar-300"
                            />
                            <span className="whitespace-pre-line">
                                {contact.address ||
                                    'Informasi lokasi segera tersedia.'}
                            </span>
                        </div>
                        {contact.whatsapp && (
                            <a
                                href={whatsappUrl(contact.whatsapp)}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 flex items-center gap-3 text-sm text-white/65"
                            >
                                <MessageCircle
                                    size={17}
                                    className="text-banjar-300"
                                />
                                +{contact.whatsapp}
                            </a>
                        )}
                        <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-white/65">
                            <Clock
                                size={17}
                                className="mt-1 shrink-0 text-banjar-300"
                            />
                            <span className="whitespace-pre-line">
                                {contact.opening_hours ||
                                    'Hubungi kami untuk jam operasional.'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="bb-container flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/55">
                    <span>
                        © {new Date().getFullYear()} Bakoel Banjar. All rights
                        reserved.
                    </span>
                    <span>Rasa Banjar, rasa yang selalu dirindukan.</span>
                    <Link href={login()} className="hover:text-white">
                        Masuk pengelola ↗
                    </Link>
                </div>
            </footer>
        </div>
    );
}
