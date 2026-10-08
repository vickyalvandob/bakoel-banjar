import { Store } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { site } = usePage().props;
    return (
        <>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {site.logo_url ? (
                    <img
                        src={site.logo_url}
                        alt=""
                        className="size-9 rounded-lg bg-background object-contain"
                    />
                ) : (
                    <Store className="size-5" strokeWidth={1.6} />
                )}
            </div>
            <div className="ml-1 grid flex-1 gap-0.5 text-left group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold">
                    Bakoel Banjar
                </span>
                <span className="text-[11px] text-muted-foreground">
                    Pengelola website
                </span>
            </div>
        </>
    );
}
