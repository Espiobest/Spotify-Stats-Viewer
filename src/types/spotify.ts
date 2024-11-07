export interface Track {
    id: string;
    name: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
    external_urls: { spotify: string };
    imageUrl: string;
    duration_ms: number;
}

export interface NowPlayingTrack extends Track {
    progress_ms: number;
    item: Track;
    duration_ms: number;
}

export interface Artist {
    id: string;
    name: string;
    genres: string[];
    images: { url: string }[];
}

export interface UserProfile {
    display_name: string;
    external_urls: { spotify: string };
    followers: { total: number };
    images: { url: string }[];
}