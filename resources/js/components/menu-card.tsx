import { Coffee, Cookie, Package, Soup, ArrowUpRight } from 'lucide-react';
import type { Contact, MenuItem } from '@/types/bakoel';
import { rupiah, whatsappUrl } from '@/types/bakoel';

export function MenuPhoto({
    item,
    small = false,
}: {
    item: MenuItem;
    small?: boolean;
}) {
    const Icon =
        item.category === 'Minuman'
            ? Coffee
            : item.category === 'Camilan'
              ? Cookie
              : item.category === 'Paket'
                ? Package
                : Soup;
    return item.image_url ? (
        <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
    ) : (
        <div
            className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--bb-tint,#f6eee6)] text-[#9a603b] ${small ? 'p-2' : 'p-8'}`}
        >
            <div
                className={`rounded-full border border-[#9a603b]/25 ${small ? 'p-2' : 'p-6'}`}
            >
                <Icon size={small ? 22 : 46} strokeWidth={1} />
            </div>
            {!small && (
                <span className="text-[10px] tracking-[0.18em] uppercase">
                    Foto menu menyusul
                </span>
            )}
        </div>
    );
}

export default function MenuCard({
    item,
    contact,
}: {
    item: MenuItem;
    contact: Contact;
}) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-[var(--bb-line)] bg-[var(--bb-card)]">
            <div className="relative aspect-[4/3] overflow-hidden">
                <MenuPhoto item={item} />
                {item.image_url?.includes('/examples/') && (
                    <span className="absolute bottom-3 left-3 rounded bg-black/55 px-2 py-1 text-[9px] text-white">Ilustrasi menu</span>
                )}
                {item.is_featured && (
                    <span className="absolute top-3 left-3 rounded-full bg-[var(--bb-paper)] px-3 py-1.5 text-[10px] font-semibold tracking-wide">
                        Pilihan Bakoel
                    </span>
                )}
                {!item.is_available && (
                    <span className="absolute right-3 bottom-3 rounded-full bg-[var(--bb-forest)] px-3 py-1.5 text-xs text-white">
                        Sedang habis
                    </span>
                )}
            </div>
            <div className="p-5">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--bb-gold)] uppercase">
                    {item.category}
                </span>
                <h3 className="mt-2 text-base leading-tight font-bold">
                    {item.name}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--bb-muted)]">
                    {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--bb-line)] pt-4">
                    <span className="text-base font-semibold">
                        {rupiah(item.price)}
                    </span>
                    {contact.whatsapp && item.is_available && (
                        <a
                            href={whatsappUrl(
                                contact.whatsapp,
                                `Halo Bakoel Banja, saya ingin memesan ${item.name}. Apakah tersedia?`,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Pesan ${item.name} via WhatsApp`}
                            className="flex size-9 items-center justify-center rounded-full border border-[var(--bb-line)] transition-colors hover:bg-[var(--bb-tint)]"
                        >
                            <ArrowUpRight size={17} />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
