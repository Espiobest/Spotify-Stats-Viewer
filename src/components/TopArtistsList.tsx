import React from 'react';
import Image from 'next/image';

interface Artist {
    id: string;
    name: string;
    genres: string[];
    images: { url: string }[];
}

interface TopArtistsListProps {
    artists: Artist[];
}

const TopArtistsList: React.FC<TopArtistsListProps> = ({ artists }) => {
    return (
        <div className="mb-8" style={{'backgroundColor': '#121212'}}>
            <h2 className="text-2xl font-semibold mb-4">Top Artists</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artists.map((artist: Artist) => (
                    <li key={artist.id} className="flex items-center">
                        <Image src={artist.images[0]?.url} alt={artist.name} width={64} height={64} className="rounded-full mr-4" />
                        <div>
                            <p className="text-lg font-medium">{artist.name}</p>
                            <p className="text-sm text-gray-400">
                                {artist.genres.slice(0, 2).map(s=>s.charAt(0).toUpperCase() + s.slice(1)).join(', ')}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopArtistsList;
