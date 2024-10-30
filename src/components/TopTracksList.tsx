import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="p-4 rounded-lg shadow-md" style={{'backgroundColor': '#121212'}}>
            <h3 className="text-white text-3xl font-bold mb-4 text-center">Top Tracks</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {tracks.map((track) => (
                    <Link href={track.external_urls.spotify} target="_blank">
                        <div key={track.id}>
                            <Image 
                                src={track.album.images[0]?.url} 
                                alt={track.name} 
                                width={200} 
                                height={200} 
                                className="rounded" 
                            />
                            <div className="ml-3">
                                <p className="text-white font-semibold">{track.name}</p>
                                <p className="text-gray-400 text-sm">{track.artists.map(artist => artist.name).join(', ')}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
 
 export default TopTracksList;