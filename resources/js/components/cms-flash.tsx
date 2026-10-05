import { usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

export default function CmsFlash() {
    const { flash } = usePage<{ flash: { success: string | null } }>().props;
    return flash?.success ? (
        <div
            role="status"
            className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200"
        >
            <CheckCircle2 size={18} />
            {flash.success}
        </div>
    ) : null;
}
