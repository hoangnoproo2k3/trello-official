// Import thư viện và stylesheet của react-quill
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { htmlToMarkdown } from "@/lib/parser";
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export interface EditorContentChanged {
    html: string;
    markdown: string;
}
export interface EditorPropss {
    value?: string;
    onChange?: (changes: EditorContentChanged) => void;
}
const BlogEditor = (props: EditorPropss) => {
    const [value, setValue] = useState<any>();
    const reactQuillRef = useRef<ReactQuill>(null);
    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    // Hàm xử lý khi nội dung trình soạn thảo thay đổi
    const onChange = (content: string) => {
        setValue(content);

        if (props.onChange) {
            props.onChange({
                html: content,
                markdown: htmlToMarkdown(content),
            });
        }
    };
    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                // const url = await uploadToCloudinary(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    // range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);
    return (
        <div className={' text-black'} >
            <style>
                {`
                .quill .ql-tooltip.ql-editing{
                        left: 0px !important;
                         top: 0px !important;
                }
                .quill input{
                    background: none !important;
                }
                `}
            </style>
            {/* Trình soạn thảo văn bản */}
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={{
                    toolbar: {
                        container: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link', 'image', 'video'],
                            ['blockquote', 'code-block'],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                            ],
                            [{ 'align': [] }],
                            ['clean'],
                        ],
                        handlers: {
                            image: imageHandler,
                        },
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                theme="snow"
            />
            {/* Hiển thị nội dung trình soạn thảo */}

        </div>
    );
};

export default BlogEditor;
