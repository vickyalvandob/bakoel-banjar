import { Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react';
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
    label = 'Pesan via WhatsApp',
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
            <MessageCircle size={16} />
            {label}
        </a>
    ) : (
        <Link href={contactRoute()} className={`bb-button ${className}`}>
            Hubungi kami
            <ArrowUpRight size={16} />
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
        <div className="bb-public flex min-h-screen flex-col bg-[var(--bb-paper)] text-[var(--bb-ink)]">
            <a
                href="#main-content"
                className="sr-only z-50 bg-banjar-700 p-3 text-white focus:not-sr-only focus:fixed"
            >
                Lewati ke konten
            </a>
            <header className="sticky top-0 z-40 border-b border-[var(--bb-line)] bg-[var(--bb-paper)]">
                <div className="bb-container flex h-18 items-center justify-between gap-5">
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
                                className={`py-2 text-sm transition-colors hover:text-[var(--bb-gold)] ${path === route.url() ? 'font-semibold text-[var(--bb-gold)]' : 'text-[var(--bb-muted)]'}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">
                            <ContactButton
                                contact={contact}
                                label="Hubungi kami"
                            />
                        </div>
                        <button
                            type="button"
                            aria-label={
                                open ? 'Tutup navigasi' : 'Buka navigasi'
                            }
                            aria-expanded={open}
                            aria-controls="mobile-navigation"
                            onClick={() => setOpen(!open)}
                            onKeyDown={(event) => {
                                if (event.key === 'Escape') setOpen(false);
                            }}
                            className="grid size-11 place-items-center rounded-lg border border-[var(--bb-line)] lg:hidden"
                        >
                            {open ? <X size={21} /> : <Menu size={21} />}
                        </button>
                    </div>
                </div>
                {open && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Navigasi seluler"
                        className="bb-container flex flex-col gap-1 border-t border-[var(--bb-line)] py-3 lg:hidden"
                    >
                        {publicNavigation.map(({ label, route }) => (
                            <Link
                                key={label}
                                href={route()}
                                onClick={() => setOpen(false)}
                                aria-current={
                                    path === route.url() ? 'page' : undefined
                                }
                                className={`rounded-md px-3 py-3 text-sm ${path === route.url() ? 'bg-[var(--bb-tint)] font-semibold' : 'hover:bg-[var(--bb-tint)]'}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>
            <main id="main-content" className="flex-1">
                {children}
            </main>
            <footer className="border-t border-[var(--bb-line)] bg-[var(--bb-tint)]">
                <div className="bb-container grid gap-8 py-10 md:grid-cols-[1fr_1fr_auto]">
                    <div>
                        <Link href={home()}>
                            <BakoelBrand />
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--bb-muted)]">
                            Rasa yang akrab, untuk dinikmati bersama.
                        </p>
                    </div>
                    <div className="text-sm leading-6">
                        <p className="font-semibold">Temui kami</p>
                        <p className="mt-3 max-w-sm whitespace-pre-line text-[var(--bb-muted)]">
                            {contact.address ||
                                'Informasi lokasi akan segera tersedia.'}
                        </p>
                        <Link
                            href={contactRoute()}
                            className="mt-3 inline-flex items-center gap-1.5 font-medium"
                        >
                            Lokasi & kontak
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                    <nav
                        aria-label="Navigasi footer"
                        className="flex flex-wrap items-start gap-x-5 gap-y-3 text-sm md:flex-col"
                    >
                        {publicNavigation
                            .filter(({ label }) => label !== 'Beranda')
                            .map(({ label, route }) => (
                                <Link
                                    key={label}
                                    href={route()}
                                    className="text-[var(--bb-muted)] hover:text-[var(--bb-ink)]"
                                >
                                    {label}
                                </Link>
                            ))}
                    </nav>
                </div>
                <div className="bb-container flex flex-wrap justify-between gap-3 border-t border-[var(--bb-line)] py-5 text-xs text-[var(--bb-muted)]">
                    <span>© {new Date().getFullYear()} Bakoel Banjar</span>
                    <Link href={login()} className="hover:text-[var(--bb-ink)]">
                        Masuk pengelola
                    </Link>
                </div>
            </footer>
        </div>
    );
}
