<!DOCTYPE html>
<html lang="id" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title data-inertia>{{ $page['props']['seo']['title'] ?? 'Bakoel Banjar' }}</title>
            <link data-inertia="favicon" rel="icon" href="{{ $page['props']['site']['favicon_url'] ?? asset('favicon.svg') }}">
            @if($page['props']['seo'] ?? null)
                <meta data-inertia="description" name="description" content="{{ $page['props']['seo']['description'] }}">
                <meta data-inertia="og:type" property="og:type" content="website">
                <meta data-inertia="og:title" property="og:title" content="{{ $page['props']['seo']['title'] }}">
                <meta data-inertia="og:description" property="og:description" content="{{ $page['props']['seo']['description'] }}">
                <meta data-inertia="og:image" property="og:image" content="{{ $page['props']['seo']['image'] }}">
                <meta data-inertia="og:url" property="og:url" content="{{ $page['props']['seo']['url'] }}">
                <meta data-inertia="twitter:card" name="twitter:card" content="summary_large_image">
                <meta data-inertia="twitter:title" name="twitter:title" content="{{ $page['props']['seo']['title'] }}">
                <meta data-inertia="twitter:description" name="twitter:description" content="{{ $page['props']['seo']['description'] }}">
                <meta data-inertia="twitter:image" name="twitter:image" content="{{ $page['props']['seo']['image'] }}">
            @endif
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
