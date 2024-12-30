"use client";
// import Editor from "./editor";
import dynamic from "next/dynamic";
import ProtectedRoute from "../protectedroute";
// Dynamically import your EditorJS component
const EditorComponent = dynamic(() => import("./editor"), {
  ssr: false, // Disable SSR for this component
});
export default function App() {
  return (
    <div>
      <ProtectedRoute>
        <EditorComponent editorBlock="editorjs-container" />
      </ProtectedRoute>
    </div>
  );
}
