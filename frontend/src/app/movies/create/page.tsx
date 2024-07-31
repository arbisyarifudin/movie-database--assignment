'use client';

import { useRef, useState } from 'react';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function MovieCreatePage() {
    const [title, setTitle] = useState('');
    const [publishingYear, setPublishingYear] = useState('');
    const router = useRouter();

    const onSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title, publishingYear);
    };

    const onImageChangeHandler = (file: File) => {
        console.log(file);
    };

    return (
        <div className="p-5 md:p-10 pb-[120px] pt-[80px] md:pt-[120px] w-full">
            <div className="flex justify-between items-center mb-10 md:mb-20">
                <h3 className="text-[32px] font-semibold mb-0 mr-[10px]">
                    Create a new movie
                </h3>
            </div>
            <form
                className="flex flex-col md:flex-row w-full my-5 md:space-x-10"
                onSubmit={onSubmitData}
            >
                <div className="w-full lg:w-1/3 xl:w-1/3 order-2 md:order-1">
                    {/* <div className="w-full md:h-[500px] h-[372px] relative bg-input rounded-[10px] border-2 border-white border-dashed">
                        <div className="min-w-[140px] h-14 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-center">
                            <div className="w-6 h-6 flex-col justify-start items-start inline-flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <g clip-path="url(#clip0_3_346)">
                                        <path
                                            d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                            fill="white"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_3_346">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className=" text-white text-sm font-normal leading-normal">
                                Drop an image here
                            </div>
                        </div>
                    </div> */}
                    <ImageUploadBox onImageChange={onImageChangeHandler} />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 order-1 md:order-2 lg:pl-[100px]">
                    <InputField
                        id="title"
                        className="mb-6"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField
                        id="publishingYear"
                        className="mb-6 md:max-w-[60%]"
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                        placeholder="Publishing Year"
                        value={publishingYear}
                        onChange={(e) => setPublishingYear(e.target.value)}
                    />

                    <div className="hidden md:flex items-center mt-[64px]">
                        <Button
                            outline
                            color="light"
                            label="Cancel"
                            className="mr-4 px-[59px]"
                            onClick={() => router.push('/movies')}
                        />
                        <Button label="Submit" className="px-[59px]" />
                    </div>
                </div>
                <div className="w-full md:hidden order-3">
                    <div className="flex items-center mt-5">
                        <Button
                            outline
                            color="light"
                            label="Cancel"
                            className="mr-4 px-[59px] w-1/2"
                            onClick={() => router.push('/movies')}
                        />
                        <Button label="Submit" className="px-[59px] w-1/2" />
                    </div>
                </div>
            </form>
        </div>
    );
}

const ImageUploadBox = ({
    onImageChange,
}: {
    onImageChange?: (file: File) => void;
}) => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }

        if (onImageChange && file) {
            onImageChange(file);
        }
    };

    return (
        <div
            className="w-full md:h-[500px] h-[372px] relative bg-input rounded-[10px] border-2 border-white border-dashed cursor-pointer"
            onClick={handleClick}
        >
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {image ? (
                <img
                    src={image}
                    alt="Selected"
                    className="w-full h-full object-cover rounded-[10px]"
                />
            ) : (
                <div className="min-w-[140px] h-14 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-center">
                    <div className="w-6 h-6 flex-col justify-start items-start inline-flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_3_346)">
                                <path
                                    d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_3_346">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="text-white text-sm font-normal leading-normal">
                        Drop an image here
                    </div>
                </div>
            )}
        </div>
    );
};
