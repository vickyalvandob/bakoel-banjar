import type { PropsWithChildren } from 'react';

export default function CmsHeading({ title, description, children }: PropsWithChildren<{ title: string; description: string }>) {
    return (
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:items-center">
            <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
        </div>
    );
}
