import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the request is for the Spotify API
    if (pathname.startsWith('/api/spotify')) {
        const token = process.env.SPOTIFY_ACCESS_TOKEN;

        if (!token) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return new NextResponse('Failed to fetch data from Spotify', { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/spotify/:path*',
};