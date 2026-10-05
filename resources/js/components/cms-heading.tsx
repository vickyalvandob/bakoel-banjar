import type { PropsWithChildren } from 'react';

export default function CmsHeading({
    title,
    description,
    children,
}: PropsWithChildren<{ title: string; description: string }>) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
                <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    CMS Bakoel Banjar
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
            {children}
        </div>
    );
}
