import { ArrowUpRight, Coffee, Soup } from 'lucide-react';
import type { Contact, MenuItem } from '@/types/bakoel';
import { rupiah, whatsappUrl } from '@/types/bakoel';

export function MenuPhoto({
    item,
    small = false,
}: {
    item: MenuItem;
    small?: boolean;
}) {
    const Icon = item.category === 'Minuman' ? Coffee : Soup;
    return item.image_url ? (
        <img
            src={item.image_url}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover"
        />
    ) : (
        <div
            className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--bb-tint,#f5f3ef)] text-[var(--bb-gold,#865334)] ${small ? 'p-2' : 'p-5'}`}
        >
            <Icon size={small ? 22 : 34} strokeWidth={1.2} />
            {!small && <span className="text-xs">Foto segera tersedia</span>}
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
        <article className="grid grid-cols-[104px_minmax(0,1fr)] overflow-hidden rounded-xl border border-[var(--bb-line)] bg-[var(--bb-card)] sm:flex sm:flex-col">
            <div className="relative h-full min-h-36 overflow-hidden sm:aspect-[4/3] sm:h-auto sm:min-h-0">
                <MenuPhoto item={item} />
                {!item.is_available && (
                    <span className="absolute top-2 right-2 rounded-md bg-[var(--bb-paper)] px-2.5 py-1.5 text-xs font-medium">
                        Sedang habis
                    </span>
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                <p className="text-xs text-[var(--bb-muted)]">
                    {item.category}
                </p>
                <h3 className="mt-1.5 text-sm leading-6 font-semibold sm:text-base">
                    {item.name}
                </h3>
                {item.description && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[var(--bb-muted)] sm:mt-2 sm:text-sm sm:leading-6">
                        {item.description}
                    </p>
                )}
                <div className="mt-auto flex items-center justify-between gap-2 pt-2 sm:pt-5">
                    <span className="text-sm font-semibold">
                        {rupiah(item.price)}
                    </span>
                    {contact.whatsapp && item.is_available && (
                        <a
                            href={whatsappUrl(
                                contact.whatsapp,
                                `Halo Bakoel Banjar, saya ingin memesan ${item.name}. Apakah tersedia?`,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Pesan ${item.name} via WhatsApp`}
                            className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 text-xs font-semibold text-[var(--bb-gold)] hover:bg-[var(--bb-tint)]"
                        >
                            Pesan
                            <ArrowUpRight size={15} />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
