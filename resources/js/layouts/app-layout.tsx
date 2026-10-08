import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import SiteHead from '@/components/site-head';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            <SiteHead />
            {children}
        </AppLayoutTemplate>
    );
}
