import React, { useEffect, useState } from "react"

import TopTracksList from "../components/TopTracksList"
import TopArtistsList from "../components/TopArtistsList"
import NowPlaying from "../components/NowPlaying"
import UserProfileDetails from "../components/UserProfile"
import Navbar from "../components/Navbar"

import { Track, Artist, UserProfile, NowPlayingTrack } from "../types/spotify"

import {
    fetchSpotifyData,
    refreshAccessToken,
    handleLogout,
} from "../services/spotifyService"

import "../app/globals.css"

const Dashboard: React.FC = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([])
    const [topArtists, setTopArtists] = useState<Artist[]>([])
    const [userData, setUserData] = useState<UserProfile | null>(null)
    const [nowPlaying, setNowPlaying] = useState<NowPlayingTrack | null>(null)
    const [recentTracks, setRecentTracks] = useState([])

    const fetchUserData = async () => {
        let data
        const storedUserData = JSON.parse(
            window.localStorage.getItem("user") as string
        )
        if (storedUserData) {
            data = storedUserData
        } else {
            data = await fetchSpotifyData("me")
            if (!data) {
                return
            }
        }
        window.localStorage.setItem("user", JSON.stringify(data))

        setUserData(data)
    }
    const fetchTopTracks = async () => {
        const data = await fetchSpotifyData(
            "me/top/tracks?time_range=medium_term&limit=10"
        )
        if (!data) {
            return
        }
        setTopTracks(data.items)
    }
    const fetchTopArtists = async () => {
        const data = await fetchSpotifyData(
            "me/top/artists?time_range=medium_term&limit=10"
        )
        if (!data) {
            return
        }
        setTopArtists(data.items)
    }
    const fetchNowPlaying = async () => {
        const data = await fetchSpotifyData("me/player/currently-playing")
        if (!data) {
            return
        }
        setNowPlaying(data)
    }
    const fetchRecentTracks = async () => {
        const data = await fetchSpotifyData("me/player/recently-played?limit=3")
        if (!data) {
            return
        }
        setRecentTracks(data.items)
    }

    const fetchAllData = async () => {
        await fetchUserData()
        await fetchTopTracks()
        await fetchTopArtists()
        await fetchNowPlaying()
        await fetchRecentTracks()
    }

    useEffect(() => {
        const expiry = localStorage.getItem("expiry")
        if (Number(expiry) < Date.now()) {
            console.log("Access token expired, refreshing...")
            refreshAccessToken()
                .then(() => {
                    const accessToken = localStorage.getItem("access_token")
                    if (!accessToken) {
                        console.error("Access token is missing after refresh")
                        handleLogout()
                        return
                    }
                })
                .finally(() => {
                    fetchAllData()
                })
        } else {
            fetchAllData()
        }
    })

    return (
        <div className="text-white">
            {userData && <Navbar userData={userData} />}
            {userData && (
                <UserProfileDetails
                    userData={userData}
                    recentTracks={recentTracks}
                />
            )}
            {nowPlaying && nowPlaying.is_playing && (
                <NowPlaying track={nowPlaying} />
            )}
            <TopTracksList tracks={topTracks} showHeader={true} />
            <TopArtistsList artists={topArtists} showHeader={true} />
        </div>
    )
}

export default Dashboard
