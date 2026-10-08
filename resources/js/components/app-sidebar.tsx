import { Link, usePage } from '@inertiajs/react';
import { Globe, LayoutGrid, MapPin, Soup, Tags } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { home } from '@/routes';
import { dashboard } from '@/routes/admin';
import { index } from '@/routes/admin/menu';
import { index as categoriesIndex } from '@/routes/admin/categories';
import { edit } from '@/routes/admin/contact';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Ringkasan',
        href: dashboard(),
        icon: LayoutGrid,
    },
    { title: 'Kelola menu', href: index(), icon: Soup },
    { title: 'Kategori menu', href: categoriesIndex(), icon: Tags },
    { title: 'Informasi kontak', href: edit(), icon: MapPin },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Lihat website',
        href: home(),
        icon: Globe,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="border-b p-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={auth.user.is_admin ? mainNavItems : []} />
            </SidebarContent>

            <SidebarFooter className="gap-2 border-t p-3">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
