import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import SiteHead from '@/components/site-head';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description}>
            <SiteHead />
            {children}
        </AuthLayoutTemplate>
    );
}
