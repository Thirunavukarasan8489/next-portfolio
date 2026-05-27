"use client";
import dynamic from "next/dynamic";
const Addeditmetatags = dynamic(() => import("./addeditmetatags"), {
  ssr: false, // Disable SSR for this component
});
// import Addeditmetatags from "./addeditmetatags";

export default function page() {
  return (
    <div>
      <Addeditmetatags />
    </div>
  );
}
