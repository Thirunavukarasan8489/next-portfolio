import React from "react";
import Welocme from "./welocme";
import ProtectedRoute from "./protectedroute";

export default function page() {
  return (
    <div>
      <ProtectedRoute>
        <Welocme />
      </ProtectedRoute>
    </div>
  );
}
