export default function PublicPageHeading({
    label,
    title,
    description,
}: {
    label: string;
    title: string;
    description: string;
}) {
    return (
        <header className="bb-container pt-10 pb-8 sm:pt-14 sm:pb-10">
            <p className="bb-eyebrow">{label}</p>
            <h1 className="bb-heading mt-3 max-w-3xl">{title}</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--bb-muted)] sm:text-base">
                {description}
            </p>
        </header>
    );
}
