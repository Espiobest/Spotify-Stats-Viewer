import React, { useState, useEffect } from "react";

import TopTracksList from "../../components/TopTracksList";
import Navbar from "../../components/Navbar";

import { UserProfile } from "../../types/spotify";
import { fetchSpotifyData } from "../../services/spotifyService";

import "../../app/globals.css";

const TracksPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState("short_term");
  const [topTracks, setTopTracks] = useState([]);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    setIsAuthenticated(isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
    }

    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      setFade(false);
      const data = await fetchSpotifyData(
        `me/top/tracks?time_range=${timeRange}&limit=50`,
      );
      setTopTracks(data.items);
      setTimeout(() => {
        setFade(true);
      }, 100);
    };

    fetchTracks();
  }, [timeRange]);

  return (
    <>
      {isAuthenticated ? (
        <div className="p-4" style={{ backgroundColor: "#121212" }}>
          {userData && <Navbar userData={userData}></Navbar>}
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            Your Top Tracks
          </h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mb-4 p-2 border border-gray-600 rounded text-black sm:float-right"
          >
            <option value="short_term">Last Month</option>
            <option value="medium_term">Last 6 Months</option>
            <option value="long_term">All Time</option>
          </select>
          <div className={`fade-in ${fade ? "visible" : ""}`}>
            <TopTracksList tracks={topTracks} showHeader={false} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TracksPage;
