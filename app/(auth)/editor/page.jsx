"use client";
import { useState } from "react";
import Editor from "./editor";
const INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};
export default function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const handleSave = async (data) => {
    console.log(data);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/blogcontent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Content saved successfully!");
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };
  return (
    <div>
      <Editor
        data={data}
        onChange={(updatedData) => {
          // console.log("Updated data:", updatedData);
          setData(updatedData); // Update state with new blocks
        }}
        onSave={handleSave}
        editorBlock="editorjs-container"
      />
    </div>
  );
}
