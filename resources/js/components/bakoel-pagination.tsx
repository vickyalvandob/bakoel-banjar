import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Paginated } from '@/types/bakoel';

export default function BakoelPagination({
    page,
}: {
    page: Omit<Paginated<unknown>, 'data'>;
}) {
    if (page.last_page <= 1) return null;
    return (
        <nav
            aria-label="Halaman daftar menu"
            className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm"
        >
            {page.prev_page_url ? (
                <Link
                    href={page.prev_page_url}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
                >
                    <ArrowLeft size={16} />
                    Sebelumnya
                </Link>
            ) : (
                <span className="px-4 py-2 opacity-40">Sebelumnya</span>
            )}
            <span>
                Halaman {page.current_page} dari {page.last_page}
            </span>
            {page.next_page_url ? (
                <Link
                    href={page.next_page_url}
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2"
                >
                    Selanjutnya
                    <ArrowRight size={16} />
                </Link>
            ) : (
                <span className="px-4 py-2 opacity-40">Selanjutnya</span>
            )}
        </nav>
    );
}
