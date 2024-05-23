/* eslint-disable @next/next/no-img-element */
import Group_avatar from '@/app/_components/group_avatar'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Heart, MessageSquareMore, Paperclip } from 'lucide-react'
import { useState } from 'react'
import Modal_update_card from '../modal/Modal-update-card'

const Item_body_card = ({ card, onInteraction }: any) => {
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
    } = useSortable({ id: card?._id, data: { ...card } });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined
    };
    return (
        <>
            <div onClick={openModal} className={`rounded-lg bg-gray-200 mb-[10px] px-[20px] ${card?.FE_PlaceholderCard ? 'hidden' : 'block'} `} ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className='pt-[30px] pb-[16px]'>
                    {card?.image && <img
                        src={card?.image}
                        alt="Preview"
                        className="w-full h-full rounded-lg object-contain"
                    />}
                </div>
                {/* <div className='flex'>
                    {card?.tagsData?.map((tag: any) => (
                        <div key={tag?.id} className={`w-[60px] h-[8px] mr-[8px] mb-[9px] rounded-sm`} style={{ backgroundColor: tag.color }}></div>
                    )
                    )}
                </div> */}
                <p className='whitespace-pre-line dark:text-black' >
                    {card?.title}
                </p>
                <p className='whitespace-pre-line  dark:text-black text-[13px] font-light opacity-[0.4] leading-[19px] pb-[30px]' >
                    <div dangerouslySetInnerHTML={{ __html: card?.description?.length > 50 ? `${card?.description?.slice(0, 50)}...` : card?.description }} />
                </p>
                <div className={'flex justify-between items-center pb-[20px] '}>
                    <Group_avatar size={30} />
                    <div className='flex  dark:text-black'>
                        <div className='flex opacity-[0.2] '>
                            <span className='text-[14px] mr-1'>{card?.comments?.length}</span><MessageSquareMore height={20} width={20} />
                        </div>
                        <div className='flex opacity-[0.2] mx-[12px] '>
                            <span className='text-[14px] mr-1'>{card?.like?.length}</span><Heart height={20} width={20} />
                        </div>
                        <div className='flex opacity-[0.2]'>
                            <span className='text-[14px] mr-1'>{card?.attachments?.length}</span><Paperclip height={20} width={20} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (<Modal_update_card onClose={closeModal} columnId={card?._id} onRefetch={onInteraction} />)}

        </>
    )
}

export default Item_body_card
