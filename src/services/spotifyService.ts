const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';

export const fetchSpotifyData = async (endpoint: string) => {
    let accessToken = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('expiry');
    if (!accessToken) {
        console.error("Access token is missing");
        return;
    }
    
    if (Number(expiry) < Date.now()) {
        console.log("Access token expired, refreshing...");
        await refreshAccessToken();
        accessToken = localStorage.getItem('access_token');
        console.log("Access token refreshed:", accessToken);
        if (!accessToken) {
            console.error("Access token is missing after refresh");
            handleLogout();
            return;
        }
    }

    try {
        const response = await fetch(`${SPOTIFY_API_BASE_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error("Error fetching Spotify data:", response);
            return;
            // handleLogout();
        }

        if (response.status === 204) {
            return {};
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Spotify data:", error);
    }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!refreshToken) {
        console.error("Refresh token is missing");
        return;
    }

    if (!clientId) {
        console.error("Client ID is missing");
        return;
    }

    console.log("Refreshing access token...", refreshToken);
    try {
        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
            })
        });

        if (!response.ok) {
            console.error("Failed to refresh access token:", response);
            throw new Error('Failed to refresh access token');
        }

        const data = await response.json();
        const newAccessToken = data.access_token;
        const expiresIn = data.expires_in;
        const expiryTime = Date.now() + expiresIn * 1000;
        const newRefreshToken = data.refresh_token;
        if (!newAccessToken || !newRefreshToken) {
            console.error("Invalid token response:", data);
            handleLogout();
        }
        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('expiry', expiryTime.toString());
        localStorage.setItem('refresh_token', newRefreshToken);
    } catch (error) {
        console.log("Error refreshing access token:", error);
    }

};

export const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiry');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}
