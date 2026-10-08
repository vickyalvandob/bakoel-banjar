import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import BakoelBrand from '@/components/bakoel-brand';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="bb-admin flex min-h-svh flex-col items-center justify-center bg-background px-5 py-10">
            <div className="w-full max-w-sm">
                <Link href={home()} className="mb-8 flex justify-center text-primary"><BakoelBrand /></Link>
                <div className="rounded-2xl border bg-card p-6 sm:p-8">
                    <div className="mb-7"><p className="mb-2 text-[10px] font-medium tracking-widest text-primary uppercase">Pengelola website</p><h1 className="text-xl font-semibold tracking-tight">{title}</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></div>
                    {children}
                </div>
                <Link href={home()} className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft size={14} />Kembali ke website</Link>
            </div>
        </div>
    );
}
