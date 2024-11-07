import React from "react";
import Link from "next/link";
import Image from "next/image";
import { handleLogout } from "../services/spotifyService";
import { UserProfile } from "../types/spotify";


const Navbar: React.FC<{ userData: UserProfile }> = ({ userData }) => {

    return (
        <div className="flex flex-row p-4 items-center">
                <Image src="/spotify-logo.png" alt="Spotify Logo" width={40} height={40} />
                <ul className="flex items-center ml-4 space-x-4">
                    <Link href="/dashboard">
                        <li className="text-md sm:text-xl font-bold hover:underline">Profile</li>
                    </Link>
                    <Link href="/tracks">
                        <li className="text-md sm:text-xl font-bold hover:underline">Tracks</li>
                    </Link>
                    <Link href="/artists">
                        <li className="text-md sm:text-xl font-bold hover:underline">Artists</li>
                    </Link>
                </ul>
                <div className="ml-auto flex items-center space-x-4">
                    {userData && userData.display_name && (
                        <div className="flex items-center text-black rounded-full h-10 w-10 bg-orange-500 text-center justify-center">
                            {userData.display_name.charAt(0)}
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        
    );
}

export default Navbar;
