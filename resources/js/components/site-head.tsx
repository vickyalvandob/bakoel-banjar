import { Head, usePage } from '@inertiajs/react';

export default function SiteHead() {
    const { site, seo } = usePage().props;

    return (
        <Head>
            <link head-key="favicon" rel="icon" href={site.favicon_url} />
            {seo && <title>{seo.title}</title>}
            {seo && (
                <meta
                    head-key="description"
                    name="description"
                    content={seo.description}
                />
            )}
            {seo && (
                <meta head-key="og:type" property="og:type" content="website" />
            )}
            {seo && (
                <meta
                    head-key="og:title"
                    property="og:title"
                    content={seo.title}
                />
            )}
            {seo && (
                <meta
                    head-key="og:description"
                    property="og:description"
                    content={seo.description}
                />
            )}
            {seo && (
                <meta
                    head-key="og:image"
                    property="og:image"
                    content={seo.image}
                />
            )}
            {seo && (
                <meta head-key="og:url" property="og:url" content={seo.url} />
            )}
            {seo && (
                <meta
                    head-key="twitter:card"
                    name="twitter:card"
                    content="summary_large_image"
                />
            )}
            {seo && (
                <meta
                    head-key="twitter:title"
                    name="twitter:title"
                    content={seo.title}
                />
            )}
            {seo && (
                <meta
                    head-key="twitter:description"
                    name="twitter:description"
                    content={seo.description}
                />
            )}
            {seo && (
                <meta
                    head-key="twitter:image"
                    name="twitter:image"
                    content={seo.image}
                />
            )}
        </Head>
    );
}
