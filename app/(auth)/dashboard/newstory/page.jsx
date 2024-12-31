"use client";
// import Editor from "./editor";
import dynamic from "next/dynamic";
// export const dynamic = "force-dynamic";
import ProtectedRoute from "../protectedroute";
// Dynamically import your EditorJS component
const Editor = dynamic(() => import("./editor"), {
  ssr: false, // Disable SSR for this component
});
export default function App() {
  return (
    <div>
      <ProtectedRoute>
        <Editor editorBlock="editorjs-container" />
      </ProtectedRoute>
    </div>
  );
}
