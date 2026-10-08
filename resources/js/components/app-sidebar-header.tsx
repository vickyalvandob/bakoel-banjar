import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { home } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-3 border-b bg-card px-4 sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger aria-label="Buka atau tutup navigasi" className="size-9 shrink-0 rounded-lg border shadow-none" />
                <div className="min-w-0 text-sm"><Breadcrumbs breadcrumbs={breadcrumbs} /></div>
            </div>
            <Link href={home()} target="_blank" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
                <span className="hidden sm:inline">Lihat website</span><span className="sm:hidden">Website</span><ArrowUpRight size={14} />
            </Link>
        </header>
    );
}
