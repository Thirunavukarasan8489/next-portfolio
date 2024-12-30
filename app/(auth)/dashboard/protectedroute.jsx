"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const isAuthenticated = () => {
    if (typeof window === "undefined") return false; // Ensure the code runs only on the client
    const hasValidCookie = !!document.cookie.match(/BLOG_ACTIVE/);
    const hasValidLocalStorage = !!localStorage.getItem("BLOG_LOG");
    return hasValidCookie && hasValidLocalStorage;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  // Render children only if authenticated
  return isAuthenticated() ? children : null;
}
