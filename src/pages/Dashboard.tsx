import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import TopTracksList from '../components/TopTracksList';
import TopArtistsList from '../components/TopArtistsList';
import NowPlaying from '../components/NowPlaying';
import UserProfileDetails from '../components/UserProfile';
import { Track, Artist, UserProfile } from '../types/spotify';

import { fetchSpotifyData, handleLogout } from '../services/spotifyService';

import '../app/globals.css';
import Link from 'next/link';

const Dashboard: React.FC = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [nowPlaying, setNowPlaying] = useState<Track | null>(null);

    useEffect(() => {
        const fetchTopTracks = async () => {
            const data = await fetchSpotifyData('me/top/tracks?time_range=medium_term&limit=10');
            setTopTracks(data.items);
        };
        const fetchTopArtists = async () => {
            const data = await fetchSpotifyData('me/top/artists?time_range=medium_term&limit=10');
            setTopArtists(data.items);
        };
        const fetchUserData = async () => {
            const data = await fetchSpotifyData('me');
            setUserData(data);
        };
        const fetchNowPlaying = async () => {
            const data = await fetchSpotifyData('me/player/currently-playing');
            if (data) {
                setNowPlaying(data);
            }
        };

        fetchTopTracks();
        fetchTopArtists();
        fetchUserData();

        // const interval = setInterval(fetchNowPlaying, 5000); // Check every 5 seconds
        fetchNowPlaying(); // Initial fetch
        // return () => clearInterval(interval); // Clean up on unmount

    }, [nowPlaying]);

    return (
        <div className="text-white">
            <div className="flex flex-row p-4 items-center">
                <Image src="/spotify-logo.png" alt="Spotify Logo" width={40} height={40} />
                <ul className="flex items-center ml-4 space-x-4">
                    <Link href="/dashboard">
                        <li className="text-md sm:text-xl font-bold">Profile</li>
                    </Link>
                    <Link href="/tracks">
                        <li className="text-md sm:text-xl font-bold">Tracks</li>
                    </Link>
                    <Link href="/artists">
                        <li className="text-md sm:text-xl font-bold">Artists</li>
                    </Link>
                </ul>
                <div className="ml-auto flex items-center space-x-4">
                    {userData && (
                        <div className="flex items-center text-black rounded-full h-10 w-10 bg-orange-500 text-center justify-center">
                            {userData.display_name.charAt(0)}
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {userData && <UserProfileDetails userData={userData} />}
            {nowPlaying && <NowPlaying track={nowPlaying} />}
            <TopTracksList tracks={topTracks} />
            <TopArtistsList artists={topArtists} />
        </div>
    );
};

export default Dashboard;
