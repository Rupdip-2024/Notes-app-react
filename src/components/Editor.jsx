import React, { useRef } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

export default function Editor({ currentNote, updateNote }) {
    const editorRef = useRef(null);

    const handleEditorChange = (content) => {
        updateNote(content);
    };

    return (
        <section className="pane editor">
            <TinyMCEEditor
                apiKey="wuyv2wtqt5yy4eesjf3zi8fgk3onhwv0tlm4w1j6oovr38vd"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={currentNote?.body}
                onEditorChange={handleEditorChange}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        "a11ychecker", "advlist", "advcode", "advtable", "autolink", "checklist", "export",
                        "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks",
                        "powerpaste", "fullscreen", "formatpainter", "insertdatetime", "media", "table", "help", "wordcount"
                    ],
                    toolbar: "undo redo | casechange blocks | bold italic backcolor | " +
                        "alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                    content_style: "body { background-color: #f0f0f0; color: black; font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
            />
        </section>
    );
}
