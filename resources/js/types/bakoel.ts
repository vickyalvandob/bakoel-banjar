export type SiteImageField =
    | 'logo'
    | 'favicon'
    | 'meta_image'
    | 'home_image'
    | 'about_image';

export type SiteSettings = {
    meta_title: string | null;
    meta_description: string | null;
    logo_url: string | null;
    favicon_url: string;
    meta_image_url: string;
    home_image_url: string;
    about_image_url: string;
};

export type SiteSeo = {
    title: string;
    description: string;
    image: string;
    url: string;
};

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
    category_id: number;
    category: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_available: boolean;
    is_featured: boolean;
    is_published?: boolean;
    sort_order?: number;
};

export type MenuCategory = {
    id: number;
    name: string;
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
