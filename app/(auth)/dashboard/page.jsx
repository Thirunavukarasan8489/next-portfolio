"use client";
import { useEffect, useState } from "react";
// import Dashboard from "./dashboard";
import dynamic from "next/dynamic";
import ProtectedRoute from "./protectedroute";
const Dashboard = dynamic(() => import("./dashboard"), {
  ssr: false, // Disable SSR for this component
});
export default function Authpage() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAuth(true);
    }, 1500);
  }, []);

  return (
    <div>
      <ProtectedRoute>{auth ? <Dashboard /> : <></>}</ProtectedRoute>
    </div>
  );
}
