export default function BakoelBrand({
    compact = false,
}: {
    compact?: boolean;
}) {
    return (
        <span className="inline-flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-current/15">
                <svg
                    viewBox="0 0 48 48"
                    className="size-6 fill-none stroke-current"
                    strokeWidth={2}
                    aria-hidden="true"
                >
                    <path d="M7 22 24 9l17 13M12 20v18m24-18v18M8 38h32M16 38V27h16v11M18 17h12" />
                </svg>
            </span>
            {!compact && (
                <span className="text-left leading-tight">
                    <span className="block text-base font-semibold tracking-tight">
                        Bakoel Banjar
                    </span>
                </span>
            )}
        </span>
    );
}
