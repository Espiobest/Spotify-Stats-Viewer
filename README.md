# Spotify Stats Viewer

A web application [(link)](https://spotify-stats-viewer.vercel.app/) that allows users to view their Spotify profile, top tracks, top artists, and currently playing track. Built with Next.js and Tailwind CSS, the app fetches user data from the Spotify API and displays it in a responsive, modern interface. I built this to practice React and TypeScript.

## Features

- Displays **user profile** information, including name, profile picture, and followers.
- Shows **top tracks** and **top artists** in the user's account.
- Displays the **currently playing track** with a progress bar.
- Displays **recent tracks** the user has listened to.
- Responsive design that adapts to various screen sizes.

## Tech Stack

- **Frontend**:
  - Next.js (React)
  - Tailwind CSS for styling
- **API**: Spotify Web API (for fetching user data, tracks, and artists)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Espiobest/spotify-stats-viewer.git
   cd spotify-stats-viewer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up **Spotify API credentials**:

   - You need to create a Spotify Developer App and obtain a client ID and client secret from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Add the client ID and client secret to your environment variables (`.env.local`).

   Example `.env.local` file:

   ```bash
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Contributing

Feel free to fork the repo, open issues, and submit pull requests! Contributions are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
