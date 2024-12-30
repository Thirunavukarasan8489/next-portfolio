import React from "react";
import Authpage from "./page";
export const metadata = {
  title: "Admin Dashboard",
  description: "Dashboard for blog writes",
};
export default function layout({ children }) {
  return <div>{children}</div>;
}
