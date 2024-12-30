"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  useEffect(() => {
    // First Chek the cookie and localStorage for login
    const isAuthenticated =
      !!document.cookie.match(/BLOG_ACTIVE/) &&
      !!localStorage.getItem("BLOG_LOG");
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      router.push("/login");
    }
  }, [router]);
  // Render the child components if authenticated
  return children;
}
