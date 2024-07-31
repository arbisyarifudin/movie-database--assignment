import axiosServerInstance from './axiosServerConfig';

export const getMe = async () => {
    try {
        const response = await axiosServerInstance.get('/auth/me');
        return response;
    } catch (error: any) {
        return error.response;
    }
};

import { NextResponse, type NextRequest } from 'next/server';

export async function checkIsAuthenticated(request: NextRequest) {
    const nextResponse = NextResponse.next({
        request,
    });

    const response = await getMe();
    const user = response?.data?.data;
    if (
        !user &&
        request.nextUrl.pathname.startsWith('/movies')
    ) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    if (request.nextUrl.pathname === '/') {
        if (user) {
            const url = request.nextUrl.clone();
            url.pathname = '/movies';
            return NextResponse.redirect(url);
        }
    }

    return nextResponse;
}
