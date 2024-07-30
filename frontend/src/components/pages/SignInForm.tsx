'use client';

import { useState } from 'react';
import { InputField } from '@/components/InputField';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password, rememberMe);

        // redirect to /movies
        router.push('/movies');
    };

    return (
        <form className="block w-full sm:max-w-sm md:max-w-xs my-5" onSubmit={onSubmitLogin}>
            <InputField
                id="email"
                className="mb-6"
                type="email"
                placeholder="Email"
                value={email}
                autoComplete="new-password"
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                id="password"
                className="mb-6"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center">
                <Checkbox
                    label="Remember me"
                    value={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </div>

            <Button label="Login" className="mt-5" onClick={() => {}} />
        </form>
    );
};
