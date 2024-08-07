'use client';

import { useState } from 'react';
import { InputField } from '@/components/InputField';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/auth.service';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

interface ErrorMessages {
    email?: string;
    password?: string;
}

export const SignInForm = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [errorMessages, setErrorMessages] = useState<ErrorMessages | null>(null);

    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validate user inputs
        const newErrorMessages = {...errorMessages}

        if (!email) {
            newErrorMessages.email = 'Email is required';
        }

        if (!password) {
            newErrorMessages.password = 'Password is required';
        }

        setErrorMessages({...newErrorMessages})

        // if there is any error message, stop the submission, show the error message
        if (Object.values(newErrorMessages).some((value) => value.length > 0)) return

        const response = await login({email, password, rememberMe})
        if (response.status === 200 || response.status === 201) {
            // console.log('data', response)
            toast.success('Login success!')

            // Cookies.set('access_token', response.data.data.access_token, { httpOnly: true, secure: true, sameSite: 'Strict' });
            Cookies.set('access_token', response.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user))

            // redirect to /movies
            router.push('/movies');
        } else {
            console.log('login failed', response.data)
            if (response.status === 401) {
                toast.error('Email or password is incorrect')
            } else {
                toast.error(response.data.message)
            }
        }
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
                onChange={(e) => {
                    setErrorMessages({
                        ...errorMessages,
                        email: '',
                    })
                    setEmail(e.target.value)
                }}
                error={(errorMessages?.email?.length ?? 0) > 0}
                errorMessage={errorMessages?.email}
            />
            <InputField
                id="password"
                className="mb-6"
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                    setErrorMessages({
                        ...errorMessages,
                        password: '',
                    })
                    setPassword(e.target.value)
                }}
                error={(errorMessages?.password?.length ?? 0) > 0}
                errorMessage={errorMessages?.password}
            />

            <div className="flex justify-center">
                <Checkbox
                    label="Remember me"
                    value={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </div>

            <Button label="Login" className="mt-5 w-full" onClick={() => {}} />
        </form>
    );
};
