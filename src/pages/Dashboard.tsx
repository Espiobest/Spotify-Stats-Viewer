import React from 'react';
import { useEffect, useState } from 'react';
import TopTracksList from '../components/TopTracksList';
import TopArtistsList from '../components/TopArtistsList';
import NowPlaying from '../components/NowPlaying';
import { fetchSpotifyData } from '../services/spotifyService';
import '../app/globals.css'

const Dashboard: React.FC = () => {

    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [userData, setUserData] = useState({});
    const [nowPlaying, setNowPlaying] = useState({});

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
            setNowPlaying(data);
        };

        fetchTopTracks();
        fetchTopArtists();
        fetchUserData();
        fetchNowPlaying();
    }, []);


    return (
        <div>
            <div className="flex flex-col p-4">
                <h1 className="text-4xl">Dashboard</h1>
                <NowPlaying track={nowPlaying} />
            </div>
            <p>{userData.display_name}</p>
            <p>Here you can see your Spotify stats.</p>
            nowPlaying 
            <TopTracksList tracks={topTracks} />
            <TopArtistsList artists={topArtists} />
        </div>
    );
};

export default Dashboard;