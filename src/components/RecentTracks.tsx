import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { Track } from "../types/spotify";

import "../app/globals.css";

interface RecentTracksProps {
  recentTracks: {
    track: Track;
  }[];
}

const RecentTracks: React.FC<RecentTracksProps> = ({ recentTracks }) => {
  const router = useRouter();
  let tracks = recentTracks.map((track) => track.track);
  tracks = tracks.filter(
    (track, index, self) => self.findIndex((t) => t.id === track.id) === index,
  );
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      console.log("Not authenticated");
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-4 bg-gray-800">
      <div>
        <h1 className="text-2xl font-bold text-center text-white">
          Recently Played Tracks
        </h1>
        <div className="grid grid-rows-1 sm:grid-rows-2 md:grid-rows-3 lg:grid-rows-3 gap-2">
          {tracks.map((track, index) => (
            <Link key={track.id} href={`/tracks/${track.id}`}>
              <div
                key={index}
                className="flex items-center space-x-4 p-2 bg-gray-900 rounded hover:bg-gray-1000"
              >
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-white font-medium text-sm">{track.name}</p>
                  <p className="text-gray-400 text-xs">
                    {track.artists[0].name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentTracks;
