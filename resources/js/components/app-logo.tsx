import { Store } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Store className="size-5" strokeWidth={1.6} /></div>
            <div className="ml-1 grid flex-1 gap-0.5 text-left group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-semibold">Bakoel Banjar</span>
                <span className="text-[11px] text-muted-foreground">Pengelola website</span>
            </div>
        </>
    );
}
