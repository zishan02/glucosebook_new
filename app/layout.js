import 'styles/theme.scss';

export const metadata = {
    title: 'Glucosebook Clinical Workspace',
    description: 'An extensible care operations dashboard for glucose monitoring teams.',
    keywords: 'glucose monitoring, clinical dashboard, care management, Next.js'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {children}
            </body>
        </html>
    )
}
