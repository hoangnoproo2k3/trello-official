/* eslint-disable @next/next/no-img-element */

import { getDetailCardWithId, updateCard } from '@/apis/cardApi';
import BlogEditor from '@/components/BlogEditor';
import { Edit, ImageUp, Save } from 'lucide-react';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import Modal from './Modal';
import Comment from '../action/comment';
import { toast } from 'react-toastify';
interface ModalCardProps {
    onClose: () => void;
    onRefetch: () => void;
    cardId: any,
    ownerId: any
}
const mdParser = new MarkdownIt();
const Modal_update_card: React.FC<ModalCardProps> = ({ onClose, cardId, onRefetch, ownerId }) => {
    const [formDataCard, setFormDataCard] = useState<any>();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const checkOwnerId = () => {
        return ownerId === localStorage.getItem('userId');
    };
    // Get data card
    useEffect(() => {
        fetchDataCardWithId(cardId)
    }, [cardId])
    const fetchDataCardWithId = async (cardId: any) => {
        try {
            const response = await getDetailCardWithId(cardId)
            setFormDataCard(response.getCards)
        } catch (error) {
            console.error('Error calling another API:', error);
        }
    }
    const handleImageChange = async (e: any) => {
        if (checkOwnerId()) {
            const file = e.target.files[0];
            if (file) {
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                const fileType = file.type;

                if (!validImageTypes.includes(fileType)) {
                    alert('Please select a valid image file (JPEG, PNG, GIF).');
                    return;
                }
                const formDataCard = new FormData();
                formDataCard?.append('file', file);
                try {
                    const response = await fetch(`${process.env.API_ROOT}/upload`, {
                        method: 'POST',
                        body: formDataCard,
                    });

                    if (response.ok) {
                        const result = await response.json();
                        setFormDataCard({
                            ...formDataCard,
                            image: result?.signedUrl
                        });
                        await updateCard(cardId, {
                            ...formDataCard,
                            image: result?.signedUrl
                        })
                        fetchDataCardWithId(cardId)
                    } else {
                        console.error('File upload failed', response.statusText);
                    }
                } catch (error) {
                    console.error('Error uploading file', error);
                }
            }
        } else {
            toast.error('Tài khoản của bạn không thể cập nhật!')
        }
    };
    const handleDoubleClick = () => {
        if (checkOwnerId()) {
            setIsEditing(true);
        }
    };
    const handleBlur = async () => {
        if (checkOwnerId()) {
            setIsEditing(false);
            await updateCard(cardId, formDataCard)
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataCard({
            ...formDataCard,
            title: e.target.value,
        });
    };
    const handleChangeDesc = async (e: any) => {
        setFormDataCard({ ...formDataCard, description: e.html })
        await updateCard(cardId, {
            ...formDataCard,
            description: e.html
        })
    };
    const handleClose = async () => {
        onClose()
        await onRefetch()
    }
    return (
        <Modal onClose={handleClose}>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex items-center justify-center w-full relative mb-4">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative"
                            >
                                {formDataCard?.image && (
                                    <img
                                        src={formDataCard?.image}
                                        alt="Preview"
                                        className="w-full h-full rounded-lg object-contain"
                                    />
                                )}
                                {!formDataCard?.image && (
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
                                <input id="dropzone-file" type="file" disabled={!checkOwnerId()} className="hidden" onChange={handleImageChange} accept="image/*" />
                                {formDataCard?.image && (
                                    <p
                                        className="flex gap-2 absolute bottom-0 right-0 mb-4 mr-4 px-4 py-2 bg-none text-white rounded bg-[#9f9f9f] hover:bg-[#a2918f] "
                                    >
                                        <ImageUp /> <span className='font-light'>Ảnh bìa</span>
                                    </p>
                                )}
                            </label>
                            {formDataCard?.image && (
                                <label htmlFor="dropzone-file" className="absolute top-0 right-0 mt-4 mr-4">
                                    <button
                                        onClick={async () => {
                                            document.getElementById('dropzone-file')?.setAttribute('value', '');
                                            setFormDataCard({
                                                ...formDataCard,
                                                image: null
                                            })
                                            await updateCard(cardId, {
                                                ...formDataCard,
                                                image: null
                                            })
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
                                disabled={!checkOwnerId()}
                                value={formDataCard?.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoFocus
                                className='bg-transparent text-[#333] p-2 mb-2 w-full '
                            />
                        ) : (
                            <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900" onClick={handleDoubleClick}>
                                {formDataCard?.title}
                            </h2>
                        )}
                        <div className='text-gray-900 text-[14px] m-2'>trong danh sách To do</div>
                        <div className="flex items-center">
                            <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900">Mô tả</h2>
                            {isEditingDescription && checkOwnerId() ? (
                                <Save
                                    className="w-4 h-4 ml-2 text-gray-500 cursor-pointer"
                                    onClick={() => setIsEditingDescription(false)}
                                />
                            ) : (
                                <Edit
                                    className="w-4 h-4 ml-2 text-gray-500 cursor-pointer"
                                    onClick={() => setIsEditingDescription(true)}
                                />
                            )}
                        </div>
                        {isEditingDescription && checkOwnerId() ? (
                            <BlogEditor
                                value={formDataCard?.description}
                                onChange={handleChangeDesc}
                            />
                        ) : (
                            <div className='text-gray-900 text-[14px] m-2'>
                                <p>Preview</p>
                                <div dangerouslySetInnerHTML={{ __html: formDataCard?.description }} />
                            </div>
                        )}
                        <h2 className="p-2 pl-0 pb-0 text-base font-semibold leading-7 text-gray-900">
                            Hoạt động
                        </h2>
                        <Comment />
                    </div>
                </div>
            </form>

        </Modal>
    )
}

export default Modal_update_card
