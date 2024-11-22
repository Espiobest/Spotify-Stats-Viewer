import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { CiClock2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

import Navbar from "../../components/Navbar";
import { fetchSpotifyData } from "../../services/spotifyService";
import { capitalize, formatTime } from "../../utils/utils";
import { Track, Artist, Album, UserProfile } from "../../types/spotify";

import "../../app/globals.css";

const ArtistPage: React.FC = () => {
  const router = useRouter();
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [artistTopTracks, setArtistTopTracks] = useState<Track[]>([]);
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([]);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const { id } = router.query;

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      console.log("Not authenticated");
      router.push("/login");
    }

    const storedUserData = localStorage.getItem("user");
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
    <div className="p-4" style={{ backgroundColor: "#121212" }}>
      {userData && <Navbar userData={userData}></Navbar>}
      <div>
        {artistData && (
          <div className="sm:p-4" style={{ backgroundColor: "#121212" }}>
            {artistData.images[0] ? (
              <Link href={artistData.external_urls.spotify} target="_blank">
                <Image
                  src={artistData.images[0].url}
                  alt={artistData.name}
                  width={320}
                  height={320}
                  className="rounded-full h-64 w-64 mx-auto mb-4"
                />
              </Link>
            ) : (
              <CgProfile
                className="text-white mx-auto"
                style={{ width: 256, height: 256 }}
              />
            )}
            <h1 className="text-3xl font-bold text-white mb-4 text-center">
              {artistData.name}
            </h1>

            <div className="max-w-lg mx-auto flex justify-between items-center mb-4">
              <div>
                <p
                  className="flex-1 text-md sm:text-xl font-bold text-white text-center"
                  style={{ color: "#1ed760" }}
                >
                  {artistData.followers.total.toLocaleString()}
                </p>
                <h2 className="text-sm flex-1 sm:text-l font-bold mb-4 text-center">
                  FOLLOWERS
                </h2>
              </div>

              <div>
                {artistData.genres.length > 0 ? (
                  capitalize(artistData.genres).map((genre: string) => (
                    <p
                      key={genre}
                      className="text-white font-bold text-md sm:text-xl text-center"
                      style={{ color: "#1ed760" }}
                    >
                      {genre}
                      <br></br>
                    </p>
                  ))
                ) : (
                  <p
                    className="text-white font-bold text-md sm:text-xl text-center"
                    style={{ color: "#1ed760" }}
                  >
                    N/A
                  </p>
                )}
                <h2 className="flex-1 text-l font-bold mb-4 text-center">
                  GENRES
                </h2>
              </div>

              <div>
                <p
                  className="flex-1 text-md sm: text-xl font-bold text-white text-center"
                  style={{ color: "#1ed760" }}
                >
                  {artistData.popularity}%
                </p>
                <h2 className="flex-1 text-sm font-bold mb-4 text-center">
                  POPULARITY
                </h2>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Top Tracks
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {artistTopTracks &&
                artistTopTracks.map((track: Track) => (
                  <Link key={track.id} href={`/tracks/${track.id}`}>
                    <div className="p-4 hover:bg-gray-800">
                      <Image
                        priority={true}
                        src={track.album.images[0]?.url}
                        alt={track.name}
                        width={200}
                        height={200}
                        className="rounded-md mb-2 items-center mx-auto"
                      />
                      <p className="mx-auto text-white text-sm sm:text-md font-semibold text-center">
                        {track.name}
                      </p>
                      <p className="pl-4 text-left">
                        <CiClock2 className="text-md text-gray-400" />
                        {formatTime(track.duration_ms)}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-center p-4">
              Albums
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {artistAlbums &&
                artistAlbums.map((album: Album) => (
                  <Link key={album.id} href={`/albums/${album.id}`}>
                    <div key={album.id} className="p-4 hover:bg-gray-800">
                      <Image
                        src={album.images[0].url}
                        alt={album.name}
                        className="rounded-lg sm:h-48 w-48 mx-auto mb-4"
                        width={200}
                        height={200}
                      />
                      <h3 className="font-bold text-sm sm:text-md text-white text-center">
                        {album.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {album.release_date}{" "}
                        <span className="float-right">
                          {album.total_tracks} tracks
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
