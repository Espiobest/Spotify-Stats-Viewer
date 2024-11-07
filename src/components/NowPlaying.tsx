import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchSpotifyData } from '../services/spotifyService';
import { NowPlayingTrack } from '../types/spotify';
import Link from 'next/link';

interface NowPlayingProps {
    track: NowPlayingTrack | null;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
    let trackDetails = track?.item;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!track || !trackDetails) return;
        setProgress(track.progress_ms);

        const interval = setInterval(() => {
            if (!track || !trackDetails) {
                return;
            }
            if (track.progress_ms < trackDetails.duration_ms) {
                setProgress(progress => progress + 1000);
                console.log(progress, track.progress_ms, trackDetails.duration_ms);
            }
            else {
                setProgress(0);
                fetchSpotifyData('me/player/currently-playing')
                .then(data => {
                    if (data) {
                        track = data;
                        trackDetails = data.item;
                    }
                });
            }
            
        }, 1000);

        return () => clearInterval(interval);
            
    }, [track]);

    if (!trackDetails) {
        return null
    }

    const progressPercentage = trackDetails ? (progress / trackDetails.duration_ms) * 100 : 0;

    return (
        <div className="flex items-center p-4 bg-gray-800 shadow-md">
                <Image
                    src={trackDetails.album.images[0].url}
                    alt={trackDetails.name}
                    width={64}
                    height={64}
                    className="rounded-lg m-1"
                ></Image>
            <Link href={`/tracks/${trackDetails.id}`}>
                <div className="flex flex-col">
                    <h2 className="text-lg pl-2 font-bold text-white">{trackDetails.name}</h2>
                    <p className="text-gray-400 pl-2 text-sm">{trackDetails.artists.map(artist => artist.name).join(', ')}</p>
                </div>
            </Link>
            <div className="flex justify-between text-sm text-gray-400 ml-10">
                <span>{formatTime(progress)}</span>
            </div>

            <div className="relative right w-10/12 mr-6 left-5 h-2 bg-gray-600 rounded">
            
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
