import { Link } from '@inertiajs/react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import type { NavItem } from '@/types';

export function NavMain({ items }: { items: NavItem[] }) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const { setOpenMobile } = useSidebar();

    return (
        <SidebarGroup className="px-3 py-2">
            <SidebarGroupLabel className="mb-2 px-3 text-[10px] font-medium tracking-widest uppercase">CMS</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
                {items.map((item) => {
                    const active = toUrl(item.href) === dashboard.url() ? isCurrentUrl(item.href) : isCurrentOrParentUrl(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={active} tooltip={{ children: item.title }} className="h-10 rounded-lg px-3 text-[13px] data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-primary">
                                <Link href={item.href} prefetch onClick={() => setOpenMobile(false)} aria-current={active ? 'page' : undefined}>
                                    {item.icon && <item.icon strokeWidth={1.7} />}<span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
