import React, { useEffect, useState } from 'react';

import TopTracksList from '../components/TopTracksList';
import TopArtistsList from '../components/TopArtistsList';
import NowPlaying from '../components/NowPlaying';
import UserProfileDetails from '../components/UserProfile';
import RecentTracks from '../components/RecentTracks';
import Navbar from '../components/Navbar';

import { Track, Artist, UserProfile, NowPlayingTrack} from '../types/spotify';

import { fetchSpotifyData } from '../services/spotifyService';

import '../app/globals.css';

const Dashboard: React.FC = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(null);
    const [recentTracks, setRecentTracks] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            let data;
            if (window.localStorage.getItem('user')) {
                const storedUserData = window.localStorage.getItem('user');
                data = JSON.parse(storedUserData as string);
            }
            else {
                data = await fetchSpotifyData('me');
                window.localStorage.setItem('user', JSON.stringify(data));
            }
            
            setUserData(data);
        };
        const fetchTopTracks = async () => {
            const data = await fetchSpotifyData('me/top/tracks?time_range=medium_term&limit=10');
            setTopTracks(data.items);
        };
        const fetchTopArtists = async () => {
            const data = await fetchSpotifyData('me/top/artists?time_range=medium_term&limit=10');
            setTopArtists(data.items);
        };
        const fetchNowPlaying = async () => {
            const data = await fetchSpotifyData('me/player/currently-playing');
            if (data) {
                setNowPlaying(data);
            }
        };
        const fetchRecentTracks = async () => {
            const data = await fetchSpotifyData('me/player/recently-played?limit=3');
            setRecentTracks(data.items);
        };
        
        fetchUserData();
        fetchTopTracks();
        fetchTopArtists();
        fetchNowPlaying();
        fetchRecentTracks();
    }, []);

    return (
        <div className="text-white">
            {userData && <Navbar userData={userData}/>}
            {userData && <UserProfileDetails userData={userData} recentTracks={recentTracks} />}
            {nowPlaying && nowPlaying.isplaying && <NowPlaying track={nowPlaying} />}
            <TopTracksList tracks={topTracks} showHeader={true} />
            <TopArtistsList artists={topArtists} showHeader={true} />
        </div>
    );
};

export default Dashboard;
