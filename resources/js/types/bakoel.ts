export type Contact = {
    address: string | null;
    whatsapp: string | null;
    email: string | null;
    opening_hours: string | null;
    maps_url: string | null;
    instagram_url: string | null;
};

export type MenuItem = {
    id: number;
    name: string;
    category: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_available: boolean;
    is_featured: boolean;
    is_published?: boolean;
    sort_order?: number;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export const rupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);

export const whatsappUrl = (
    number: string,
    message = 'Halo Bakoel Banjar, saya ingin bertanya tentang menu.',
) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
