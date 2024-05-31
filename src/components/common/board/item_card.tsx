/* eslint-disable @next/next/no-img-element */
import { updateCardWithLike, updateCardWithUnLike } from '@/apis/cardApi'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Edit, Heart, MessageSquareMore } from 'lucide-react'

const Item_body_card = ({ card, onRefetch, openModal }: any) => {
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
    const hanldeLike = async () => {
        if (card.like.includes(localStorage.getItem('userId'))) {
            await updateCardWithUnLike({ cardId: card._id, userId: localStorage.getItem('userId') })
            await onRefetch()
        } else {
            await updateCardWithLike({ cardId: card._id, userId: localStorage.getItem('userId') })
            await onRefetch()
        }
    }
    return (
        <>
            <div
                className={`relative rounded-lg bg-gray-200 mb-[10px] px-[20px] ${card?.FE_PlaceholderCard ? 'hidden' : 'block'}`}
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        openModal(card._id)
                    }}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                    <Edit className="w-5 h-5 text-gray-500" />
                </button>
                <div className='pt-[30px] pb-[16px]'>
                    {card?.image && <img
                        src={card?.image}
                        alt="Preview"
                        className="w-full h-full rounded-lg object-contain"
                    />}
                </div>
                <p className='whitespace-pre-line dark:text-black'>
                    {card?.title}
                </p>
                <div className='whitespace-pre-line dark:text-black text-[13px] font-light opacity-[0.4] leading-[19px] pb-[20px]'>
                    <div dangerouslySetInnerHTML={{ __html: card?.description?.length > 50 ? `${card?.description?.slice(0, 50)}...` : card?.description }} />
                </div>
                <div className={'flex justify-between items-center pb-[20px] '}>
                    <div className='flex dark:text-black'>
                        <div className='flex opacity-[0.2]'>
                            <span className='text-[14px] mr-1'>{card?.comments?.length}</span><MessageSquareMore height={20} width={20} />
                        </div>
                        <div className='flex opacity-[0.2] mx-[12px]' onClick={hanldeLike}>
                            <span className='text-[14px] mr-1'>{card?.like?.length}</span><Heart height={20} width={20} fill={`${card?.like?.includes(localStorage.getItem('userId')) ? 'red' : ''}`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item_body_card
