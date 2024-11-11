import React from 'react';
import Image from 'next/image';

import RecentTracks from './RecentTracks';
import { UserProfile, Track } from '../types/spotify';

interface UserProfileProp {
    userData: UserProfile | null;
    recentTracks: {
        track: Track
    }[];
}

const UserProfileDetails: React.FC<UserProfileProp> = ({ userData, recentTracks }) => {
    if (!userData) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center p-4 bg-gray-800 shadow-md">
                {userData.images[0]?.url && (
                    <Image
                        src={userData.images[0].url}
                        alt={`${userData.display_name}'s profile picture`}
                        width={256}
                        height={256}
                        className="rounded-full mr-4"
                    />
                ) || (
                    <Image
                        src="../public/profile.svg"
                        alt={`${userData.display_name}'s profile picture`}
                        width={256}
                        height={256}
                        className="rounded-full mr-4"
                    />
                )}

                <div className="flex flex-col flex-grow items-center sm:flex-row sm:justify-between sm:w-full">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-white">{userData.display_name}</h2>
                        <p className="text-gray-400 text-lg">Followers: {userData.followers.total}</p>
                        <button className="bg-green-500 text-white p-2 rounded-full sm:rounded-3xl px-5 mt-4">
                            <a href={userData.external_urls.spotify} target="_blank">View in Spotify</a>
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:justify-end">
                        <RecentTracks recentTracks={recentTracks} />
                    </div>
                </div>
            </div>
            <div className="sm:hidden">
                <RecentTracks recentTracks={recentTracks} />
            </div>
        </div>
    );
};

export default UserProfileDetails;
