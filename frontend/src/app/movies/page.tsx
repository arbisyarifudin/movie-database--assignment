'use client';
import classnames from 'classnames';
import useIsMobile from '@/hooks/isMobile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import useAuthStore from '@/stores/authStore';
import toast from 'react-hot-toast';
export default function MoviePage() {
    const dummyDatas = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            publishingYear: 1994,
            poster: 'https://picsum.photos/200/400?random=1',
        },
        {
            id: 2,
            title: 'The Godfather',
            publishingYear: 1972,
            poster: 'https://picsum.photos/200/400?random=2',
        },
        {
            id: 3,
            title: 'The Dark Knight',
            publishingYear: 2008,
            poster: 'https://picsum.photos/200/400?random=3',
        },
    ];

    const [movies, setMovies] = useState<
        { id: number; title: string; publishingYear: number; poster: string }[]
    >([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setMovies(dummyDatas);
    };

    return (
        <div className="p-10 pt-[120px]">
            <Header />
            <MovieList
                movies={movies}
                pagination={{ currentPage, itemsPerPage, totalItems: 30 }}
                handlePageChange={setCurrentPage}
            />
        </div>
    );
}

const Header = () => {
    const isMobile = useIsMobile();
    const router = useRouter();

    const logout = useAuthStore((state: any) => state.logout)
    const logoutSession = () => {
        logout()
        router.push('/')
        toast.success('Logout success!')
    }

    return (
        <div className="flex justify-between items-center mb-20">
            <div className="flex items-center">
                <h3 className="text-[32px] font-semibold mb-0 mr-[10px]">
                    My movies
                </h3>
                <button onClick={() => router.push('/movies/create')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g clip-path="url(#clip0_3_576)">
                            <path
                                d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_3_576">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
            <button className="flex items-center" onClick={logoutSession}>
                {!isMobile && <span className="mr-[10px]">Logout</span>}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <g clip-path="url(#clip0_6_82)">
                        <path
                            d="M17 8L15.59 9.41L17.17 11H9V13H17.17L15.59 14.58L17 16L21 12L17 8ZM5 5H12V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H12V19H5V5Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_6_82">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
};

const MovieList = ({
    movies,
    pagination,
    handlePageChange,
}: {
    movies: {
        id: number;
        title: string;
        publishingYear: number;
        poster: string;
    }[];
    pagination: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
    };
    handlePageChange: (pageNumber: number) => void;
}) => {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
                {movies.map((movie, index) => (
                    <Movie key={index} {...movie} />
                ))}
            </div>
            {
                movies.length === 0 ? (
                    <MovieEmpty />
                ) : (
                    <Pagination
                        currentPage={pagination.currentPage}
                        itemsPerPage={pagination.itemsPerPage}
                        totalItems={pagination.totalItems}
                        onPageChange={handlePageChange}
                    />
                )
            }
        </>
    );
};

const Movie = ({
    id,
    title,
    publishingYear,
    poster,
}: {
    id: number;
    title: string;
    publishingYear: number;
    poster: string;
}) => {
    return (
        <Link
            className="bg-card rounded-xl shadow-md cursor-pointer md:p-2"
            href={`/movies/${id}/edit`}
        >
            <img
                src={poster}
                alt={title}
                className="w-full h-[246px] sm:h-[320px] md:h-[400px] object-cover rounded-tl-xl rounded-tr-xl md:rounded-xl"
            />
            <div className="p-3">
                <h3
                    className="text-base sm:text-[18px] md:text-[20px] font-bold md:font-normal leading-6 mb-4"
                    style={{ minHeight: '50px' }}
                >
                    {title}
                </h3>
                <p className="text-sm text-white">{publishingYear}</p>
            </div>
        </Link>
    );
};

const Pagination = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
}: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (pageNumber: number) => void;
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    return (
        <div className="font-semibold mt-20 flex justify-center">
            <button
                className="mr-2"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={classnames(
                        currentPage === index + 1 ? 'bg-primary' : 'bg-card',
                        'mx-1 py-1 px-3 rounded-[4px] transition-colors duration-300'
                    )}
                >
                    {index + 1}
                </button>
            ))}
            <button
                className="ms-2"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

const MovieEmpty = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center mt-[150px] md:mt-[120px]">
            <h3 className="text-[32px] leading-10 md:text-5xl md:leading-[56px] font-semibold mb-10 text-center">Your movie list is empty</h3>
            <Button className="mt-5 !text-base w-full sm:w-auto" label="Add a new Movie" onClick={() => router.push('/movies/create')} />
        </div>
    );
};
