import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import { fetchSpotifyData } from "../../services/spotifyService";
import { capitalize, formatTime } from "../../utils/utils";

import '../../app/globals.css';

const ArtistPage: React.FC = () => {
    const router = useRouter();
    const [artistData, setArtistData] = useState<any>(null);
    const [artistTopTracks, setArtistTopTracks] = useState<any>(null);
    const [artistAlbums, setArtistAlbums] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { id } = router.query;

    useEffect(() => {
        
        const isAuthenticated = !!localStorage.getItem('access_token');
        setIsAuthenticated(isAuthenticated);
        
        if (!isAuthenticated) {
            window.location.href = '/login';
        }

        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    useEffect(() => {
        const fetchArtistData = async () => {
            const data = await fetchSpotifyData(`artists/${id}`);
            setArtistData(data);
        };
        const fetchArtistTopTracks = async () => {
            const data = await fetchSpotifyData(`artists/${id}/top-tracks?market=US`);
            setArtistTopTracks(data.tracks);
        };
        const fetchArtistAlbums = async () => {
            const data = await fetchSpotifyData(`artists/${id}/albums`);
            setArtistAlbums(data.items);
        };

        if (id) {
            fetchArtistData();
            fetchArtistTopTracks();
            fetchArtistAlbums();
        }
    }, [id]);

    return (
        <div className="p-4" style={{ backgroundColor: '#121212' }}>
            {userData && <Navbar userData={userData}></Navbar>}
            <div>
                {artistData && (
                    <div className="p-4" style={{ backgroundColor: '#121212' }}>
                        <Link href={artistData.external_urls.spotify} target="_blank">
                            <img
                                src={artistData.images[0].url}
                                alt={artistData.name}
                                className="rounded-full h-64 w-64 mx-auto mb-4"
                            />
                        </Link>
                        <h1 className="text-3xl font-bold text-white mb-4 text-center">{artistData.name}</h1>
              
                        <div className="max-w-lg mx-auto flex justify-between items-center mb-4">
                                
                            <div>
                                <p className="flex-1 text-xl font-bold text-white text-center" style={{color: '#1ed760'}}>{artistData.followers.total.toLocaleString()}</p>
                                <h2 className="text-sm flex-1 sm:text-l font-bold mb-4 text-center">FOLLOWERS</h2>
                            </div>

                            <div>
                                {
                                    capitalize(artistData.genres).map((genre: string) => (
                                        <p key={genre} className="text-white font-bold text-xl text-center" style={{color: '#1ed760'}}>{genre}<br></br></p>
                                    ))
                                }
                                <h2 className="flex-1 text-l font-bold mb-4 text-center">GENRES</h2>
                            </div>
                        
                            <div>
                                <p className="flex-1 text-xl font-bold text-white text-center" style={{color: '#1ed760'}}>{artistData.popularity}%</p>
                                <h2 className="flex-1 text-l font-bold mb-4 text-center">POPULARITY</h2>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-4 text-center">Top Tracks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {artistTopTracks && artistTopTracks.map((track: any) => (
                                <Link key={track.id} href={`/tracks/${track.id}`}>
                                    <div className="p-4 hover:bg-gray-800" style={{ height: '300px' }}>
                                        <Image
                                            priority={true} 
                                            src={track.album.images[0]?.url} 
                                            alt={track.name} 
                                            width={200} 
                                            height={200} 
                                            className="rounded-md mb-2 items-center mx-auto" 
                                        />
                                        <p className="mx-auto text-white font-semibold text-center">{track.name}</p>
                                        <p className="pl-4 text-left">{formatTime(track.duration_ms)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-4 text-center p-4">Albums</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {artistAlbums && artistAlbums.map((album: any) => (
                                <Link key={album.id} href={`${album.external_urls.spotify}`} target="_blank">
                                    <div key={album.id} className="p-4 hover:bg-gray-800" style={{ height: '300px'  }}>
                                        <img
                                            src={album.images[0].url}
                                            alt={album.name}
                                            className="rounded-lg h-48 w-48 mx-auto mb-4"
                                        />
                                        <h3 className="text-xl font-bold text-white text-center">{album.name}</h3>
                                        <p className="text-sm text-gray-400">{album.release_date} <span className="float-right">{album.total_tracks} tracks</span></p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            </div>);
                
}

export default ArtistPage;