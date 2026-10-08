import type { Auth } from '@/types/auth';
import type { SiteSettings, SiteSeo } from '@/types/bakoel';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            site: SiteSettings;
            seo: SiteSeo | null;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
