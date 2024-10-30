import React from 'react';
import Image from 'next/image';


interface Track {
    id: string;
    name: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
}

interface TopTracksListProps {
    tracks: Track[];
}

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Top Tracks</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((track) => (
                    <li key={track.id} className="flex items-center">
                        <Image src={track.album.images[0].url} alt={track.name} width={64} height={64} className="w-16 h-16 rounded-md mr-4" />
                        <div>
                            <p className="text-lg font-medium">{track.name}</p>
                            <p className="text-sm text-gray-400">
                                {track.artists.map(artist => artist.name).join(', ')}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
    );
 };
 
 export default TopTracksList;