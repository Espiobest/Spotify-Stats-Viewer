import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Artist } from '../types/spotify';
import { capitalize } from '../utils/utils';

interface TopArtistsListProps {
    artists: Artist[];
    showHeader: boolean;
}

const TopArtistsList: React.FC<TopArtistsListProps> = ({ artists, showHeader=true }) => {
    return (
        <div className="mb-8 p-4">
            {showHeader && 
                <>
                <div>
                    <h3 className="text-white text-3xl font-bold mb-4 text-center">
                        Your Top Artists
                        <button className="text-sm text-white p-2 rounded-3xl px-5 mr-15 ml-auto float-right border-gray-600 border hover:bg-white hover:text-black">
                            <Link href="/artists">View All</Link>
                        </button>
                    </h3>
                </div>
                <br/>
                </>
    }

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artists.map((artist: Artist) => (
                    <Link key={artist.id} href={`/artists/${artist.id}`}>
                        <li key={artist.id} className="flex items-center hover:bg-gray-800">
                            <Image src={artist.images[0]?.url} alt={artist.name} width={64} height={64} className="rounded-full mr-4" />
                            <div>
                                <p className="text-lg font-medium">{artist.name}</p>
                                <p className="text-sm text-gray-400">
                                    {capitalize(artist.genres).join(', ')}
                                </p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default TopArtistsList;
