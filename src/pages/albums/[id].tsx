import React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import Navbar from "../../components/Navbar"
import { fetchSpotifyData } from "../../services/spotifyService"
import { CiClock2 } from "react-icons/ci"

import { formatTime } from "../../utils/utils"
import { Track, Album, UserProfile } from "../../types/spotify"

import "../../app/globals.css"
import Link from "next/link"

const AlbumPage: React.FC = () => {
    const router = useRouter()
    const [albumData, setAlbumData] = useState<Album | null>(null)
    const [albumTracks, setAlbumTracks] = useState<Track[]>([])
    const [userData, setUserData] = useState<UserProfile | null>(null)
    const { id } = router.query

    useEffect(() => {
        const isAuthenticated = !!localStorage.getItem("access_token")

        if (!isAuthenticated) {
            console.log("Not authenticated")
            router.push("/login")
        }

        const storedUserData = localStorage.getItem("user")
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData))
        }
    }, [router])

    useEffect(() => {
        const fetchAlbumData = async () => {
            const data = await fetchSpotifyData(`albums/${id}`)
            setAlbumData(data)
            setAlbumTracks(data.tracks.items)
        }

        if (id) {
            fetchAlbumData()
        }
    }, [id])

    return (
        <div className="p-4" style={{ backgroundColor: "#121212" }}>
            {userData && <Navbar userData={userData}></Navbar>}
            <div>
                {albumData && (
                    <div className="p-4" style={{ backgroundColor: "#121212" }}>
                        <div className="flex items-center mb-4 flex-col sm:flex-row">
                            <Image
                                src={albumData.images[0].url}
                                alt={albumData.name}
                                className="rounded-lg shadow-lg"
                                width={300}
                                height={300}
                            />
                            <div className="ml-4">
                                <p className="text-lg py-1 text-gray-400">
                                    Album
                                </p>
                                <h1 className="text-3xl py-1 font-bold text-white">
                                    {albumData.name}
                                </h1>
                                <p className="text-lg py-1 text-gray-400">
                                    {albumData.artists
                                        .map((artist) => artist.name)
                                        .join(", ")}
                                </p>
                                <p className="text-lg py-1 text-gray-400">
                                    {albumData.release_date}
                                </p>
                                <p className="text-lg py-1 text-gray-400">
                                    {albumTracks.length} tracks
                                </p>
                                <button className="bg-green-500 text-white p-2 rounded-3xl px-5 mt-4">
                                    <a
                                        href={albumData.external_urls.spotify}
                                        target="_blank"
                                    >
                                        Open in Spotify
                                    </a>
                                </button>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Tracks
                        </h1>
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: "#1f1f1f" }}
                        >
                            <div className="flex items-center justify-between p-2">
                                <div className="flex items-center">
                                    <p className="text-lg text-gray-400 text-right w-5">
                                        #
                                    </p>
                                    <p className="text-lg text-gray-300 ml-4">
                                        Title
                                    </p>
                                </div>
                                <CiClock2 className="text-lg text-gray-400" />
                            </div>
                            <hr className="border-gray-600" />
                            {albumTracks.map((track, index) => (
                                <Link
                                    key={track.id}
                                    href={`/tracks/${track.id}`}
                                >
                                    <div
                                        key={track.id}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-700"
                                    >
                                        <div className="flex items-center">
                                            <p className="text-lg text-gray-400 text-right w-5">
                                                {index + 1}
                                            </p>
                                            <p className="text-lg text-white ml-4">
                                                {track.name}
                                            </p>
                                        </div>
                                        <p className="text-lg text-gray-400">
                                            {formatTime(track.duration_ms)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AlbumPage
