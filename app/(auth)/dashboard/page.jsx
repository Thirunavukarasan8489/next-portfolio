"use client";
import { useEffect, useState } from "react";
// import Welocme from "./welocme";
import Dashboard from "./dashboard";
import ProtectedRoute from "./protectedroute";
// export const metadata = {
//   title: "Admin Dashboard",
//   description: "Dashboard for blog writes",
// };
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
