import React from "react";
import Link from "next/link";
import Image from "next/image";
import { handleLogout } from "../services/spotifyService";
import { UserProfile } from "../types/spotify";

const Navbar: React.FC<{ userData: UserProfile }> = ({ userData }) => {
  return (
    <div className="flex flex-row p-2 sm:p-4 items-center">
      <Link href="/dashboard">
        <Image
          src="/spotify-logo.png"
          alt="Spotify Logo"
          width={40}
          height={40}
        />
      </Link>
      <ul className="flex items-center ml-4 space-x-4">
        <Link href="/dashboard">
          <li className="text-sm sm:text-xl font-bold hover:underline">
            Profile
          </li>
        </Link>
        <Link href="/tracks">
          <li className="text-sm sm:text-xl font-bold hover:underline">
            Tracks
          </li>
        </Link>
        <Link href="/artists">
          <li className="text-sm sm:text-xl font-bold hover:underline mr-1">
            Artists
          </li>
        </Link>
      </ul>
      <div className="ml-auto flex items-center space-x-4">
        {userData && userData.display_name && (
          <div className="flex items-center text-black rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-orange-500 text-center justify-center">
            {userData.images[0]?.url ? (
              <Image
                src={userData.images[0].url}
                alt={`${userData.display_name}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              userData.display_name.charAt(0)
            )}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="px-2 py-1 bg-green-500 text-white sm:px-4 sm:py-2 rounded hover:bg-green-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
