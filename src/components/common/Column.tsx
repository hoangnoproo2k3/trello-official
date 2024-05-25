import { destroyColumn } from '@/apis/columnApi';
import Item_body_card from '@/components/common/board/item_card';
import s from '@/styles/page-trello.module.scss';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash } from 'lucide-react'; // Add Trash icon
import { useEffect, useRef, useState } from 'react';
import Modal_card from './modal/Modal-card';
import { getCardssWithColumn } from '@/apis/cardApi';

const Column = ({ column, onInteraction }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDelete = async () => {
        // Handle the delete action here
        await destroyColumn({
            columnId: column?._id,
            boardId: column?.boardId,
            destroy: true
        })
        onInteraction()
        setShowDropdown(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column?._id, data: { ...column } });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined
    };

    if (!column) {
        return null;
    }

    return (
        <>
            <div className={`${s["content-item"]} flex-grow`} key={column?._id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className="flex flex-col">
                    <div className='rounded-lg bg-gray-200 mb-[10px] px-[20px] relative'>
                        <div className='flex justify-between items-center h-[50px] flex-shrink-0'>
                            <p className='text-base font-medium dark:text-black'>{column?.title}</p>
                            <div className="relative" ref={dropdownRef}>
                                <GripVertical className='dark:text-black cursor-pointer' onClick={toggleDropdown} />
                                {showDropdown && (
                                    <div className="absolute right-[-16px] mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        <button
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                            onClick={handleDelete}
                                        >
                                            <Trash className="mr-2" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {column?.cards?.length > 0 && (
                        <SortableContext items={column?.cards?.map((c: any) => c._id)} strategy={verticalListSortingStrategy}>
                            {column?.cards?.map((card: any, index: any) => (
                                <Item_body_card key={index} card={card} onRefetch={onInteraction} />
                            ))}
                        </SortableContext>
                    )}
                    <div onClick={openModal} className="cursor-pointer flex items-center justify-center rounded-lg border-dashed border border-black border-opacity-20 h-[80px] flex-shrink-0 bg-white dark:bg-[#e5e7eb] dark:text-black">
                        <p className=''>+ Add new card</p>
                    </div>
                </div>
            </div>
            {showModal && (<Modal_card onClose={closeModal} columnId={column?._id} boardId={column?.boardId} onRefetch={onInteraction} />)}
        </>
    );
};

export default Column;
