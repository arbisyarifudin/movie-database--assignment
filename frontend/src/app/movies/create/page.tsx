'use client';

import { useState } from 'react';
import { InputField } from '@/components/InputField';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function MovieCreatePage() {
    const [title, setTitle] = useState('');
    const [publishingYear, setPublishingYear] = useState('');
    const router = useRouter();

    const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title, publishingYear);

        // redirect to /movies
        // router.push('/movies');
    };

    return (
        <div className="p-10 pt-[120px] w-full">
            <div className="flex justify-between items-center mb-20">
                <h3 className="text-[32px] font-semibold mb-0 mr-[10px]">
                    Create a new movie
                </h3>
            </div>
            <form
                className="flex flex-col md:flex-row w-full my-5"
                onSubmit={onSubmitData}
            >
                <div className="w-full lg:w-1/3 xl:w-1/3 order-2 md:order-1">
                    {/* uploader component here */}
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 order-1 md:order-2">
                    <InputField
                        id="title"
                        className="mb-6"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField
                        id="publishingYear"
                        className="mb-6 max-w-[60%]"
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                        placeholder="Publishing Year"
                        value={publishingYear}
                        onChange={(e) => setPublishingYear(e.target.value)}
                    />

                    <div className="flex items-center mt-[64px]">
                        <Button
                            outline
                            color="light"
                            label="Cancel"
                            className="mr-4 px-[59px]"
                            onClick={() => router.push('/movies')}
                        />
                        <Button
                            label="Submit"
                            className="px-[59px]"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
