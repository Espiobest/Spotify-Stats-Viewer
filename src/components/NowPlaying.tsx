import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchSpotifyData } from "../services/spotifyService";
import { NowPlayingTrack } from "../types/spotify";
import Link from "next/link";

import { truncate } from "../utils/utils";

interface NowPlayingProps {
  track: NowPlayingTrack | null;
}

const NowPlaying: React.FC<NowPlayingProps> = ({ track }) => {
  const [nowPlayingTrack, setNowPlayingTrack] =
    useState<NowPlayingTrack | null>(track);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!track || !track?.item) return;

    if (nowPlayingTrack) {
      setProgress(nowPlayingTrack.progress_ms);
    } else {
      setProgress(track.progress_ms);
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        let newProgress = prevProgress + 1000;

        if (newProgress >= track.item.duration_ms) {
          clearInterval(interval);
          setProgress(0);
          fetchSpotifyData("me/player/currently-playing").then((data) => {
            if (data) {
              setNowPlayingTrack(data);
              setProgress(0);
              newProgress = 0;
            }
          });
        }

        return newProgress < track.item.duration_ms
          ? newProgress
          : prevProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [nowPlayingTrack, track]);
  if (!nowPlayingTrack?.item) {
    return null;
  }

  const trackDetails = nowPlayingTrack.item;
  const progressPercentage = (progress / trackDetails.duration_ms) * 100;

  return (
    <div className="bg-gray-800 shadow-md">
      <h1 className="text-2xl text-center p-2">Listening To</h1>

      <div className="flex items-center p-4">
        <Image
          src={trackDetails.album.images[0].url}
          alt={trackDetails.name}
          width={64}
          height={64}
          className="rounded-lg m-1"
        />
        <Link href={`/tracks/${trackDetails.id}`}>
          <div className="flex flex-col">
            <h2 className="text-xs sm:text-sm md:text-lg pl-2 font-bold text-white">
              {truncate(trackDetails.name, 20)}
            </h2>
            <p className="text-gray-400 pl-2 text-xs sm:text-sm">
              {trackDetails.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </Link>
        <div className="flex justify-between text-sm text-gray-400 ml-4 lg:ml-10">
          <span>{formatTime(progress)}</span>
        </div>

        <div className="relative right w-10/12 mr-6 left-5 h-2 bg-gray-600 rounded">
          <div
            className="absolute top-0 h-full bg-green-500 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(trackDetails.duration_ms)}</span>
        </div>
      </div>
    </div>
  );
};

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default NowPlaying;
