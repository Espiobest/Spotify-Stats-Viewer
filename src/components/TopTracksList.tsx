import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Track } from '../types/spotify';

interface TopTracksListProps {
    tracks: Track[];
    showHeader: boolean;
}

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks , showHeader=true}) => {
    return (
        <div className="p-4 rounded-lg shadow-md">
            {showHeader && 
                <>
                <div>
                    <h3 className="text-white text-3xl font-bold ml-15 mb-4 text-center">
                        Your Top Tracks
                        <button className="text-sm text-white p-2 rounded-3xl px-5 mr-15 ml-auto float-right border border-gray-600 hover:bg-white hover:text-black">
                            <Link href="/tracks">View All</Link>
                        </button>
                    </h3>
                    
                </div>    
                <br/>
                </>
            }
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center p-1">
                {tracks.map((track) => (
                    <Link key={track.id} href={`/tracks/${track.id}`}>
                        <div className="p-4 hover:bg-gray-800">
                            <Image
                                priority={true} 
                                src={track.album.images[0]?.url} 
                                alt={track.name} 
                                width={170} 
                                height={170} 
                                className="rounded-md mb-2 items-center mx-auto" 
                            />
                            <p className="mx-auto text-white font-semibold">{track.name}</p>
                            <p className="text-gray-400 text-sm">{track.artists.map(artist => artist.name).join(', ')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
 
 export default TopTracksList;