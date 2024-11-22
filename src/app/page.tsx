"use client";
import React from "react";
import { useEffect, useState } from "react";
import Login from "../pages/login";
import { useRouter } from "next/navigation";
import Head from "next/head";

const MainPage: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [router, isAuthenticated]);
  return (
    <>
      <Head>
        <title>Spotify Stats</title>
        <meta name="description" content="Spotify Stats" />
        <link rel="icon" href="../public/spotfiy-logo.png" />
      </Head>
      <Login />
    </>
  );
};

export default MainPage;
