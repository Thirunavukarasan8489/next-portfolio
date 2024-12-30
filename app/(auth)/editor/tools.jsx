import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import RawTool from "@editorjs/raw";
import Warning from "@editorjs/warning";
import ImageTool from "@editorjs/image";
import CheckList from "@editorjs/checklist";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
    },
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  image: {
    class: ImageTool,
    inlineToolbar: true,
    config: {
      uploader: {
        async uploadByFile(file) {
          try {
            // Upload the file to the backend
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(
              `${process.env.NEXT_PUBLIC_HOST}/uploadFile`,
              {
                method: "POST",
                body: formData,
              }
            );

            const result = await response.json();

            if (result.success) {
              console.log("Image uploaded:", result.file.url);
              return {
                success: 1,
                file: {
                  url: result.file.url, // Return file URL here
                },
              };
            } else {
              throw new Error("Image upload failed");
            }
          } catch (error) {
            console.error("Image upload error:", error);
            return {
              success: 0,
              message: error.message || "Something went wrong",
            };
          }
        },
      },
    },
  },
  checkList: CheckList,
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: Code,
  quote: Quote,
  delimiter: Delimiter,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
  raw: RawTool,
  warning: Warning,
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
};
