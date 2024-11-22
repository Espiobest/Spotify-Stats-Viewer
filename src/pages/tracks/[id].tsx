import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import { fetchSpotifyData } from "../../services/spotifyService";
import { formatTime, getKey } from "../../utils/utils";
import { Track, Artist, UserProfile, TrackFeatures } from "../../types/spotify";

import "../../app/globals.css";
import Link from "next/link";

const TrackPage: React.FC = () => {
  const router = useRouter();
  const [trackData, setTrackData] = useState<Track | null>(null);
  const [trackFeatures, setTrackFeatures] = useState<TrackFeatures | null>(
    null,
  );
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const { id } = router.query;

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchTrackData = async () => {
      const data = await fetchSpotifyData(`tracks/${id}`);
      setTrackData(data);
      console.log(data);
    };
    const fetchTrackFeatures = async () => {
      const data = await fetchSpotifyData(`audio-features/${id}`);
      setTrackFeatures(data);
    };

    if (id) {
      fetchTrackData();
      fetchTrackFeatures();
    }
  }, [id]);

  return (
    <div className="p-4" style={{ backgroundColor: "#121212" }}>
      {userData && <Navbar userData={userData}></Navbar>}
      <div>
        {trackData && trackFeatures && (
          <div className="p-4" style={{ backgroundColor: "#121212" }}>
            <div className="flex items-center mb-4 flex-col sm:flex-row">
              <Image
                src={trackData.album.images[0].url}
                alt={trackData.name}
                width={300}
                height={300}
                className="rounded-lg mb-4 sm:mb-0"
              />
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {trackData.name}
                </h1>
                {trackData.artists.map((artist: Artist) => (
                  <Link key={artist.id} href={`/artists/${artist.id}`}>
                    <p className="text-white font-bold hover:underline">
                      {artist.name}
                    </p>
                  </Link>
                ))}
                <Link href={`/albums/${trackData.album.id}`}>
                  <p className="text-gray-400 hover:underline">
                    {trackData.album.name}
                  </p>
                </Link>
                <p className="text-gray-400">
                  {trackData.album.release_date.split("-")[0]}
                </p>
                <p className="text-gray-400">
                  {formatTime(trackData.duration_ms)}
                </p>
                <button className="bg-green-500 text-white p-2 rounded-3xl px-5 mt-4">
                  <a href={trackData.external_urls.spotify} target="_blank">
                    Open in Spotify
                  </a>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                Audio Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white font-bold">Key</p>
                  <p className="text-gray-400">{getKey(trackFeatures.key)}</p>
                </div>
                <div>
                  <p className="text-white font-bold">Mode</p>
                  <p className="text-gray-400">
                    {trackFeatures.mode === 0 ? "Minor" : "Major"}
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold">Tempo</p>
                  <p className="text-gray-400">
                    {Math.round(trackFeatures.tempo)} BPM
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold">Time Signature</p>
                  <p className="text-gray-400">
                    {trackFeatures.time_signature}
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold">Danceability</p>
                  <p className="text-gray-400">{trackFeatures.danceability}</p>
                </div>
                <div>
                  <p className="text-white font-bold">Energy</p>
                  <p className="text-gray-400">{trackFeatures.energy}</p>
                </div>
                <div>
                  <p className="text-white font-bold">Loudness</p>
                  <p className="text-gray-400">{trackFeatures.loudness} dB</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackPage;
