export interface Track {
    id: string;
    name: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
    external_urls: { spotify: string };
    imageUrl: string;
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