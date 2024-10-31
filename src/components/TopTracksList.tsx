import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Track } from '../types/spotify';

interface TopTracksListProps {
    tracks: Track[];
}

const TopTracksList: React.FC<TopTracksListProps> = ({ tracks }) => {
    return (
        <div className="p-4 rounded-lg shadow-md" style={{'backgroundColor': '#121212'}}>
            <h3 className="text-white text-3xl font-bold mb-4 text-center">Your Top Tracks</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
                {tracks.map((track) => (
                    <Link key={track.id} href={track.external_urls.spotify} target="_blank">
                        <div>
                        {/* <div onMouseOver={(e) => e.target.style.background = "#1f1f1f"} onMouseLeave={(e) => e.target.style.background = "#121212"}> */}
                            <Image
                                priority={true} 
                                src={track.album.images[0]?.url} 
                                alt={track.name} 
                                width={200} 
                                height={200} 
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