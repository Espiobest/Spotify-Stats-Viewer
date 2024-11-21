export interface Track {
    id: string;
    name: string;
    album: Album;
    artists: Artist[];
    external_urls: { spotify: string };
    imageUrl: string;
    duration_ms: number;
}

export interface NowPlayingTrack extends Track {
    progress_ms: number;
    item: Track;
    duration_ms: number;
    is_playing: boolean;
}

export interface Artist {
    id: string;
    name: string;
    genres: string[];
    images: { url: string }[];
    external_urls: { spotify: string };
    popularity: number;
    followers: { total: number };
}

export interface UserProfile {
    display_name: string;
    external_urls: { spotify: string };
    followers: { total: number };
    images: { url: string }[];
}

export interface Album {
    album_type: string;
    id: string;
    name: string;
    images: { url: string }[];
    external_urls: { spotify: string };
    total_tracks: number;
    release_date: string;
    artists: Artist[];
}

export interface TrackFeatures {
    id: string;
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    duration_ms: number;
    time_signature: number;
}