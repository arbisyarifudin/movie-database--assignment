import axiosInstance from './axiosConfig';

export const getMovieList = async (params?: {
    page?: number;
    limit?: number;
}) => {
    const { page = 1, limit = 10 } = params || {};
    try {
        const response = await axiosInstance.get('/movies', {
            params: {
                page,
                limit,
            },
        });

        console.log('Success fetch movie list', response);
        if (response.data?.data) {
            return {
                data: response.data.data,
                pagination: response.data?.meta,
            };
        }
    } catch (error) {
        console.error('Error fetching movie list:', error);
        return error;
    }
};

export const createMovie = async (data: {
    title: string;
    publishingYear: number | string;
    posterFile: File;
}) => {
    try {
        const formData = new FormData();
        formData.append('title', data?.title ?? '');
        formData.append('publishingYear', String(data?.publishingYear ?? ''));
        formData.append('posterFile', data?.posterFile ?? '');

        const response = await axiosInstance.post('/movies', formData);
        console.log('Success create movie list', response);
        return response;
    } catch (error: any) {
        console.error('Error creating movie list:', error.response);
        return error.response;
    }
};

export const deleteMovie = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/movies/${id}`);
        console.log('Success delete movie list', response);
        return response;
    } catch (error: any) {
        console.error('Error creating movie list:', error.response);
        return error.response;
    }
};

export const updateTaskList = async (
    id: string,
    data?: {
        title?: string;
        publishingYear?: number | string;
        posterFile?: File;
    }
) => {
    try {
        const formData = new FormData();
        formData.append('title', data?.title ?? '');
        formData.append('publishingYear', String(data?.publishingYear ?? ''));
        formData.append('posterFile', data?.posterFile ?? '');
        const response = await axiosInstance.put(`/movies/${id}`, formData);
        console.log('Success update movie list', response);
        return response;
    } catch (error: any) {
        console.error('Error updating movie list:', error.response);
        return error.response;
    }
};
