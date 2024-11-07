import React from 'react';
import Image from 'next/image';
import { UserProfile } from '../types/spotify';

interface UserProfileProp {
    userData: UserProfile | null;
}

const UserProfileDetails: React.FC<UserProfileProp> = ({ userData }) => {
    if (!userData) {
        return null;
    }

    return (
        <div className="flex items-center p-4 bg-gray-800 shadow-md">
            {userData.images[0]?.url && (
                <Image
                    src={userData.images[0].url}
                    alt={`${userData.display_name}'s profile picture`}
                    width={256}
                    height={256}
                    className="rounded-full mr-4"
                />
            )}

            <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white">{userData.display_name}</h2>
                <p className="text-gray-400 text-lg">Followers: {userData.followers.total}</p>
                <button className="bg-green-500 text-white p-2 rounded-3xl px-5 mt-4">
                    <a href={userData.external_urls.spotify} target="_blank">View in Spotify</a>
                </button>
            </div>
        </div>
    );
};

export default UserProfileDetails;
