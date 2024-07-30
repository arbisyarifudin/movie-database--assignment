import { SignInForm } from '@/components/pages/SignInForm';

export default function Home() {
    return (
        <div className="h-full flex flex-col justify-center items-center px-5">
            <h2 className="text-heading-two text-white font-semibold">Sign In</h2>
            <SignInForm />
        </div>
    );
}
