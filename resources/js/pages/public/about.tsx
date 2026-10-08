import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import PublicPageHeading from '@/components/public-page-heading';
import PublicLayout from '@/layouts/public-layout';
import { menu, contact as contactRoute } from '@/routes';
import type { Contact } from '@/types/bakoel';

export default function About({ contact }: { contact: Contact }) {
    return (
        <PublicLayout contact={contact}>
            <Head title="Tentang">
                <meta
                    name="description"
                    content="Kenali Bakoel Banjar dan pilihan hidangan untuk makan sehari-hari maupun dinikmati bersama."
                />
            </Head>
            <PublicPageHeading
                label="Tentang Bakoel Banjar"
                title="Sederhana sajiannya. Hangat kebersamaannya."
                description="Makanan yang akrab selalu punya tempat di meja makan."
            />
            <section className="bb-container grid items-center gap-8 pb-12 md:grid-cols-2 md:gap-14">
                <figure>
                    <img
                        src="/images/template/photo-1498654896293-37aacf113fd9.jpg"
                        alt="Menyiapkan hidangan untuk makan bersama"
                        width={1200}
                        height={800}
                        className="aspect-[4/3] w-full rounded-xl object-cover"
                    />
                </figure>
                <div>
                    <h2 className="font-display text-3xl tracking-tight">
                        Ada pilihan untuk setiap selera.
                    </h2>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--bb-muted)]">
                        <p>
                            Bakoel Banjar menghadirkan pilihan hidangan dari
                            sambal gami, ayam, dan bebek hingga ikan, seafood,
                            serta sayuran. Lengkapi dengan nasi dan minuman
                            sesuai seleramu.
                        </p>
                        <p>
                            Singgah untuk makan di tempat, bawa pulang untuk
                            keluarga, atau bicarakan kebutuhan pesanan bersama.
                            Menu dan harga dapat dilihat langsung di katalog
                            kami.
                        </p>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link href={menu()} className="bb-button">
                            Jelajahi menu
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href={contactRoute()}
                            className="bb-button bb-button-outline"
                        >
                            Temui kami
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
