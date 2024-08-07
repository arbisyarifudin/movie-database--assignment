'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { InputField } from '@/components/InputField';
import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import {
    deleteMovie,
    getMovieById,
    updateMovie,
} from '@/lib/api/movie.service';
import toast from 'react-hot-toast';
import Dialog from '@/components/Dialog';

interface ErrorMessages {
    title?: string;
    publishingYear?: string;
    posterFile?: string;
}

export default function MovieEditPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    const [title, setTitle] = useState('');
    const [publishingYear, setPublishingYear] = useState('');
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [posterFileUrl, setPosterFileUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const [errorMessages, setErrorMessages] = useState<ErrorMessages | null>(
        null
    );

    const getMovie = async () => {
        setLoading(true);
        const response = await getMovieById(params.id);
        if (response.status === 200 && response.data.data) {
            const movie = response.data.data;
            setTitle(movie.title);
            setPublishingYear(movie.publishingYear);
            setPosterFileUrl(movie.posterUrl);
        } else {
            toast.error('Movie not found!');
            router.push('/movies');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!loading) {
            getMovie();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrorMessages = { ...errorMessages };

        if (!title) {
            newErrorMessages.title = 'Title is required';
        }

        if (!publishingYear) {
            newErrorMessages.publishingYear = 'Publishing Year is required';
        }

        setErrorMessages({ ...newErrorMessages });

        if (Object.values(newErrorMessages).some((value) => value.length > 0))
            return;

        const response = await updateMovie(params.id, {
            title,
            publishingYear: Number(publishingYear),
            posterFile: posterFile as File,
        });

        if (response.status === 200) {
            toast.success('Movie updated successfully!');
            router.push('/movies');
        } else {
            toast.error('Movie creation fails!');
        }
    };

    const onImageChangeHandler = (file: File) => {
        setErrorMessages({
            ...errorMessages,
            posterFile: '',
        });

        setPosterFile(file);
    };

    const onCancelForm = () => {
        setTitle('');
        setPublishingYear('');
        setPosterFile(null);
        setErrorMessages(null);
        router.push('/movies');
    };

    /* DELETION */
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const closeDialog = () => setIsDialogOpen(false);

    const onDeleteMovie = async () => {
        const response = await deleteMovie(params.id);

        if (response.status === 200) {
            toast.success('Movie deleted successfully!');
            router.push('/movies');
        } else {
            toast.error('Movie deletion fails!');
        }
    };

    return (
        <div className="p-5 md:p-10 pb-[120px] pt-[80px] md:pt-[120px] w-full">
            <div className="flex justify-between items-center mb-10 md:mb-20">
                <h3 className="text-3xl sm:text-[32px] font-semibold mb-0 mr-[10px]">
                    Edit
                </h3>
                <Button
                    outline
                    color="error"
                    label="Delete"
                    size="sm"
                    onClick={() => setIsDialogOpen(true)}
                />
            </div>

            <Dialog
                title="Delete Movie"
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onConfirm={onDeleteMovie}
            >
                <p>Are you sure you want to delete this movie?</p>
            </Dialog>

            <form
                className="flex flex-col md:flex-row w-full my-5 md:space-x-10"
                onSubmit={onSubmitForm}
                ref={formRef}
            >
                <div className="w-full lg:w-1/3 xl:w-1/3 order-2 md:order-1">
                    <ImageUploadBox
                        defaultImage={posterFileUrl}
                        onImageChange={onImageChangeHandler}
                    />
                </div>
                <div className="w-full lg:w-1/2 xl:w-1/3 order-1 md:order-2 lg:pl-[100px]">
                    <InputField
                        id="title"
                        className="mb-6"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setErrorMessages({
                                ...errorMessages,
                                title: '',
                            });
                            setTitle(e.target.value);
                        }}
                        error={(errorMessages?.title?.length ?? 0) > 0}
                        errorMessage={errorMessages?.title}
                    />
                    <InputField
                        id="publishingYear"
                        className="mb-6 md:max-w-[60%]"
                        type="number"
                        min={1900}
                        max={new Date().getFullYear()}
                        placeholder="Publishing Year"
                        value={publishingYear}
                        onChange={(e) => {
                            setErrorMessages({
                                ...errorMessages,
                                publishingYear: '',
                            });
                            setPublishingYear(e.target.value);
                        }}
                        error={(errorMessages?.publishingYear?.length ?? 0) > 0}
                        errorMessage={errorMessages?.publishingYear}
                    />

                    {(errorMessages?.posterFile?.length ?? 0) > 0 && (
                        <div className="text-error text-xs mt-2.5 leading-none">
                            {errorMessages?.posterFile}
                        </div>
                    )}

                    <div className="hidden md:flex items-center mt-[64px]">
                        <Button
                            outline
                            color="light"
                            label="Cancel"
                            className="mr-4 px-[59px]"
                            onClick={onCancelForm}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            label="Submit"
                            className="px-[59px]"
                        />
                    </div>
                </div>
                <div className="w-full md:hidden order-3">
                    <div className="flex items-center mt-5">
                        <Button
                            outline
                            color="light"
                            label="Cancel"
                            className="mr-4 px-[59px] w-1/2"
                            onClick={onCancelForm}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            label="Submit"
                            className="px-[59px] w-1/2"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

const ImageUploadBox = ({
    onImageChange,
    defaultImage,
}: {
    onImageChange?: (file: File) => void;
    defaultImage?: string;
}) => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (defaultImage) {
            setImage(defaultImage);
        }
    }, [defaultImage]);

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
                <Image
                    width={1920}
                    height={2880}
                    src={image}
                    alt="Movie Poster"
                    className="w-full h-full object-cover rounded-[10px]"
                    onError={() => setImage(null)}
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
