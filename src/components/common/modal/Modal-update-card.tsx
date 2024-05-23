/* eslint-disable @next/next/no-img-element */

import { createNewCard } from '@/apis/cardApi';
import BlogEditor from '@/components/BlogEditor';
import axios from 'axios';
import { ImageUp } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import React, { useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import Comment from '../action/comment';
import Modal from './Modal';
interface ModalCardProps {
    onClose: () => void;
    onRefetch: () => void;
    columnId: any
}
const mdParser = new MarkdownIt();
const Modal_update_card: React.FC<ModalCardProps> = ({ onClose, columnId, onRefetch }) => {
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            const fileType = file.type;

            if (!validImageTypes.includes(fileType)) {
                alert('Please select a valid image file (JPEG, PNG, GIF).');
                return;
            }
            if (file) {
                setImage(file);
                setPreviewImage(URL.createObjectURL(file));
            }
        }
    };
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useState("Profile");
    const [error, setError] = useState<any>();

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(e.target.value);
    };
    const [html, setHtml] = useState("");
    const handleCreateCard = async () => {
        try {
            // await createNewCard({ title: profileName, columnId: columnId, boardId: boardId });
            await onRefetch()
            onClose()
        } catch (error: unknown) {
            // Kiểm tra kiểu của error trước khi truy cập các thuộc tính
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }
    return (
        <Modal onClose={onClose}>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex items-center justify-center w-full relative mb-4">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                            >
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-full rounded-lg object-contain"
                                    />
                                )}
                                {!previewImage && (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                {previewImage && (
                                    <p
                                        className="flex gap-2 absolute bottom-0 right-0 mb-4 mr-4 px-4 py-2 bg-none text-white rounded hover:bg-[#a2918f] "
                                    >
                                        <ImageUp /> <span className='font-light'>Ảnh bìa</span>
                                    </p>
                                )}
                            </label>
                            {previewImage && (
                                <label htmlFor="dropzone-file" className="absolute top-0 right-0 mt-4 mr-4">
                                    <button
                                        onClick={() => {
                                            document.getElementById('dropzone-file')?.setAttribute('value', '');
                                            setPreviewImage(null);
                                            setImage(null);
                                        }}
                                        className="px-4 py-2 bg-slate-400 text-red-800 rounded hover:bg-slate-500"
                                    >
                                        X
                                    </button>
                                </label>
                            )}

                        </div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={profileName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className='bg-transparent text-[#333] p-2 mb-2 w-full '
                            />
                        ) : (
                            <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900" onClick={handleDoubleClick}>
                                {profileName}
                            </h2>
                        )}
                        <div className='text-gray-900 text-[14px] m-2'>trong danh sách To do</div>
                        <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900">
                            Mô tả
                        </h2>
                        <BlogEditor onChange={(e) => setHtml(e.html)} />
                        <div className={''}>
                            <h2>Preview</h2>
                            <div dangerouslySetInnerHTML={{ __html: html }} />
                        </div>
                        <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900">
                            Hoạt động
                        </h2>
                        <Comment />
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateCard}
                        type='button'
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Update card
                    </button>
                </div>
            </form>

        </Modal>
    )
}

export default Modal_update_card
