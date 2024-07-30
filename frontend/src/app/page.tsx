import { SignInForm } from '@/components/pages/SignInForm';

export default function Home() {
    return (
        <main className="w-full h-screen bg-background flex flex-col justify-center items-center px-5">
            <h2 className="text-heading-two text-white font-semibold">Sign In</h2>
            <SignInForm />
        </main>
    );
}
