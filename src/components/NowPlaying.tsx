import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchSpotifyData } from '../services/spotifyService';

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        images: { url: string }[];
    };
    imageUrl: string;
    duration_ms: number;
}

interface NowPlayingProps {
    track: {
        item: Track | null
        progress_ms: number
    }; 
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
    if (!track || !track.item) {
        return null; 
    }

    let trackDetails = track.item;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (track) {
            setProgress(track.progress_ms);

            const interval = setInterval(() => {
                setProgress(prev => (prev < trackDetails.duration_ms ? prev + 1000 : trackDetails.duration_ms));
            }, 1000);
            if (progress === trackDetails.duration_ms) {
                console.log('Track ended');
                setProgress(0);
                fetchSpotifyData('me/player/currently-playing')
                .then(data => {
                    if (data) {
                        track = data;
                        trackDetails = data.item;
                    }
                });

            }

            return () => clearInterval(interval);
            
        }
    }, [track]);

    const progressPercentage = trackDetails ? (progress / trackDetails.duration_ms) * 100 : 0;

    return (
        <div className="flex items-center p-4 bg-gray-800 shadow-md">
            <Image
                src={trackDetails.album.images[0].url}
                alt={trackDetails.name}
                width={64}
                height={64}
                className="rounded-lg m-4"
            ></Image>
           
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-white">{trackDetails.name}</h2>
                <p className="text-gray-400 text-sm">{trackDetails.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-400 ml-2">
                <span>{formatTime(progress)}</span>
            </div>

            <div className="relative w-full mr-6 left-5 h-2 bg-gray-600 rounded">
            
            <div
                className="absolute top-0 h-full bg-green-500 rounded"
                style={{ width: `${progressPercentage}%` }}
            ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(trackDetails.duration_ms)}</span>
            </div>
        </div>
    );
};

function formatTime(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default NowPlaying;
