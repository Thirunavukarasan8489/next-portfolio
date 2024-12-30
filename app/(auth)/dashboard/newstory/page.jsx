"use client";
import Editor from "./editor";
import ProtectedRoute from "../protectedroute";
export default function App() {
  return (
    <div>
      <ProtectedRoute>
        <Editor editorBlock="editorjs-container" />
      </ProtectedRoute>
    </div>
  );
}
