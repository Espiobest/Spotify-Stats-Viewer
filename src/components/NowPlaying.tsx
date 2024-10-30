import React from 'react';

interface Track {
    name: string;
    artist: string;
    album: string;
    imageUrl: string;
}

interface NowPlayingProps {
    track: Track | null; 
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
    if (!track) {
        return null; 
    }

    return (
        <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md">
            <img 
                src={track.imageUrl} 
                alt={`${track.name} album cover`} 
                className="w-16 h-16 rounded-lg mr-4" 
            />
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-white">{track.name}</h2>
                <p className="text-sm text-gray-400">{track.artist}</p>
                <p className="text-xs text-gray-500">{track.album}</p>
            </div>
        </div>
    );
};

export default NowPlaying;
