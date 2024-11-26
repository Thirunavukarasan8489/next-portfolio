import React from "react";
import Editor from "./editor";
import ProtectedRoute from "../protectedroute";

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <Editor />
      </ProtectedRoute>
    </div>
  );
}
