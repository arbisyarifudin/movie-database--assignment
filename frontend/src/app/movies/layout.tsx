'use client'
// import useRequireAuth from '@/hooks/requireAuth';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const user = useRequireAuth()
    // return !!user ? children : null
    return children
}
