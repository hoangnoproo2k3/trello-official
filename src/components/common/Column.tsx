// Column.js
import Item_body_card from '@/components/common/board/item_card';
import s from '@/styles/page-trello.module.scss';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import Modal_card from './modal/Modal-card';
const Column = ({ column }: any) => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
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

    // if (!column || !column.cards) {
    //     return null;
    // }
    if (!column) {
        return null;
    }
    return (
        <>
            <div className={`${s["content-item"]} flex-grow`} key={column?._id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className="flex flex-col">
                    <div className={'rounded-lg bg-gray-200 mb-[10px] px-[20px] '}>
                        <div className='flex justify-between items-center h-[50px] flex-shrink-0 '>
                            <p className='text-base font-medium dark:text-black'>{column?.title}</p>
                            <GripVertical className='dark:text-black cursor-pointer' />
                        </div>
                    </div>
                    {Array.isArray(column?.cards) && <SortableContext items={column.cards?.map((c: any) => c._id)} strategy={verticalListSortingStrategy}>
                        {column?.cards?.map((card: any, index: any) => (
                            <Item_body_card
                                key={index} card={card} />
                        ))}
                    </SortableContext>}

                    <div onClick={openModal} className="cursor-pointer flex items-center justify-center rounded-lg border-dashed border border-black border-opacity-20 h-[80px] flex-shrink-0 bg-white dark:bg-[#e5e7eb] dark:text-black">
                        <p className=''>+ Add new card</p>
                    </div>
                </div>
            </div>
            {showModal && (<Modal_card onClose={closeModal} />)}
        </>

    );
};

export default Column;
