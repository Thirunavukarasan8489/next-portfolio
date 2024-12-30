"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";
import "./editor.css";
const Editor = ({ data, onChange, editorBlock, onSave }) => {
  const [values, setValues] = useState({
    metatitle: "",
    metadescription: "",
    category: "",
  });
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        tools: EDITOR_JS_TOOLS,
        placeholder: "Start typing your story...",
        async onChange(api) {
          try {
            const updatedData = await api.saver.save();
            // console.log("Editor.js updated data:", updatedData); // Debug updated blocks
            onChange(updatedData); // Pass updated data to parent
          } catch (error) {
            console.error("Error saving editor data:", error);
          }
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = async () => {
    if (ref.current) {
      try {
        const outputData = await ref.current.save();
        let metaDatas = {
          metatitle: values.metatitle,
          metadescription: values.metadescription,
          category: values.category,
          blogContent: outputData,
        };
        onSave(metaDatas);
        // console.log("Saved data:", outputData);
      } catch (error) {
        console.error("Saving failed:", error);
      }
    }
  };

  return (
    <div>
      <div className="">
        <input
          name="metatitle"
          value={values.metatitle}
          onChange={(e) => {
            handelChange(e);
          }}
          placeholder="Meta Title"
          className="border"
        />
        <input
          name="metadescription"
          value={values.metadescription}
          onChange={(e) => {
            handelChange(e);
          }}
          placeholder="Meta description"
          className="border"
        />
        <input
          name="category"
          value={values.category}
          onChange={(e) => {
            handelChange(e);
          }}
          placeholder="Category"
          className="border"
        />
      </div>
      <div id={editorBlock}></div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default memo(Editor);
