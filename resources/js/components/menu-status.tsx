export default function MenuStatus({ published }: { published?: boolean }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${published ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-muted text-muted-foreground'}`}>
            <span className={`size-1.5 rounded-full ${published ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />{published ? 'Tayang' : 'Draf'}
        </span>
    );
}
