const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"
const TOKEN_URL = "https://accounts.spotify.com/api/token"

let isRefreshing = false
let refreshPromise: Promise<void> | null = null

export const fetchSpotifyData = async (endpoint: string) => {
    await ensureAccessToken()
    const accessToken = localStorage.getItem("access_token")
    if (!accessToken) {
        console.error("Access token is missing")
        handleLogout()
        return
    }

    try {
        const response = await fetch(`${SPOTIFY_API_BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            console.error("Error fetching Spotify data:", response)
            return
            // handleLogout();
        }

        if (response.status === 204) {
            return {}
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching Spotify data:", error)
    }
}

const ensureAccessToken = async (): Promise<void> => {
    const expiry = localStorage.getItem("expiry")

    if (Number(expiry) > Date.now()) {
        return // Token is still valid
    }

    if (isRefreshing) {
        console.log("Waiting for token refresh...")
        if (refreshPromise) await refreshPromise
        return
    }

    isRefreshing = true
    refreshPromise = refreshAccessToken().finally(() => {
        isRefreshing = false
        refreshPromise = null
    })

    await refreshPromise
}

export const refreshAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token")
    const refreshToken = localStorage.getItem("refresh_token")
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!refreshToken) {
        console.error("Refresh token is missing")
        handleLogout()
        return
    }

    if (!clientId) {
        console.error("Client ID is missing")
        return
    }

    try {
        const response = await fetch(TOKEN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: clientId,
            }),
        })

        if (!response.ok) {
            console.error("Failed to refresh access token:", response)
            throw new Error("Failed to refresh access token")
        }

        const data = await response.json()
        const newAccessToken = data.access_token

        if (accessToken === newAccessToken) {
            return
        }

        const expiresIn = data.expires_in
        const expiryTime = Date.now() + expiresIn * 1000
        let newRefreshToken = data.refresh_token
        if (!newAccessToken) {
            console.error("Invalid token response:", data)
            handleLogout()
            return
        }

        if (!newRefreshToken && refreshToken) {
            newRefreshToken = refreshToken
        }

        localStorage.setItem("access_token", newAccessToken)
        localStorage.setItem("expiry", expiryTime.toString())
        localStorage.setItem("refresh_token", newRefreshToken)
    } catch (error) {
        console.log("Error refreshing access token:", error)
    }
}

export const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("expiry")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user")
    window.location.href = "/login"
}
