
'use client'
import Temp_board from '@/components/common/board/temp_board';
import s from '@/styles/page-trello.module.scss';
import { generatePlaceholderCard } from '@/utils/format-text';
import {
    CollisionDetection,
    DndContext,
    DragOverlay,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    // rectIntersection,
    UniqueIdentifier,
    closestCorners,
    defaultDropAnimationSideEffects,
    getFirstCollision,
    pointerWithin,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { cloneDeep, isEmpty } from 'lodash';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Column from './Column';
import Item_body_card from './board/item_card';
const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
const ListColumns = ({ boards }: any) => {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    const sensors = useSensors(
        pointerSensor,
        mouseSensor,
        touchSensor
    );
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const [activeDragItemId, setActiveDragItemId] = useState(null);
    const [activeDragItemType, setActiveDragItemType] = useState<any>();
    const [activeDragItemData, setActiveDragItemData] = useState<any>(null);
    const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState<any>();
    const [orderedColumns, setOrderedColumns] = useState<any[]>([]);

    useEffect(() => {
        setOrderedColumns(boards);
    }, [boards]);

    const findColumnByCardId = (cardId: any) => {
        return orderedColumns.find((column: any) => column?.cards?.map((card: any) => card._id)?.includes(cardId))
    }
    function handleDragStart(event: any) {
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
        if (event?.active?.data?.current?.columnId) {
            setOldColumnDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }
    const handleDragOver = (event: any) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
        const { active, over } = event
        if (!over || !active) return
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
        if (!activeColumn || !overColumn) return
        if (activeColumn._id !== overColumn._id) {
            setOrderedColumns((prevColumns: any) => {
                const overCardIndex = overColumn?.cards?.findIndex((card: { _id: any; }) => card._id === overCardId)
                let newCardIndex: number;
                const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
                const modifier = isBelowOverItem ? 1 : 0;
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
                const nextColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nextColumns.find((column: { _id: any; }) => column._id === activeColumn._id)
                const nextOverColumn = nextColumns.find((column: { _id: any; }) => column._id === overColumn._id)

                if (nextActiveColumn) {
                    nextActiveColumn.cards = nextActiveColumn.cards.filter((card: { _id: any; }) => card._id !== activeDraggingCardId)
                    if (isEmpty(nextActiveColumn.cards)) {
                        nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                    }
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: { _id: any; }) => card._id)
                }
                if (nextOverColumn) {
                    // check ton tai
                    nextOverColumn.cards = nextOverColumn.cards.filter((card: { _id: any; }) => card._id !== activeDraggingCardId)
                    // Them vao theo index moi
                    // const rebuild_activeDragItemData: any = {
                    //     ...activeDragItemData,
                    //     columnId: nextOverColumn._id
                    // }
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDragItemData)
                    // Del card fake
                    nextOverColumn.cards = nextOverColumn.cards.filter((card: any) => !card?.FE_PlaceholderCard)
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: { _id: any; }) => card._id)
                }

                return nextColumns
            })
        }
    }
    function handleDragEnd(event: any) {
        const { active, over } = event
        if (!over || !active) return
        // Card
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
            const { id: overCardId } = over
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)
            if (!activeColumn || !overColumn) return
            if (oldColumnDraggingCard._id !== overColumn._id) {
                setOrderedColumns((prevColumns: any) => {
                    const overCardIndex = overColumn?.cards?.findIndex((card: { _id: any; }) => card._id === overCardId)
                    let newCardIndex: number;
                    const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
                    const modifier = isBelowOverItem ? 1 : 0;
                    newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
                    const nextColumns = cloneDeep(prevColumns)
                    const nextActiveColumn = nextColumns.find((column: { _id: any; }) => column._id === activeColumn._id)
                    const nextOverColumn = nextColumns.find((column: { _id: any; }) => column._id === overColumn._id)

                    if (nextActiveColumn) {
                        nextActiveColumn.cards = nextActiveColumn.cards.filter((card: { _id: any; }) => card._id !== activeDraggingCardId)
                        if (isEmpty(nextActiveColumn.cards)) {
                            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
                        }
                        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card: { _id: any; }) => card._id)
                    }
                    if (nextOverColumn) {
                        // check ton tai
                        nextOverColumn.cards = nextOverColumn.cards.filter((card: { _id: any; }) => card._id !== activeDraggingCardId)
                        // Them vao theo index moi
                        const rebuild_activeDragItemData: any = {
                            ...activeDragItemData,
                            columnId: nextOverColumn._id
                        }
                        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDragItemData)
                        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card: { _id: any; }) => card._id)
                    }
                    return nextColumns
                })
            } else {
                const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex((c: { _id: any; }) => c._id === activeDragItemId)
                const newCardIndex = oldColumnDraggingCard?.cards?.findIndex((c: { _id: any; }) => c._id === overCardId)
                const dndOrderedCards = arrayMove(oldColumnDraggingCard?.cards, oldCardIndex, newCardIndex)
                setOrderedColumns((prevColumns: any) => {
                    const nextColumns = cloneDeep(prevColumns)
                    const targetColummn = nextColumns.find((c: { _id: any; }) => c._id === overColumn._id)
                    targetColummn.cards = dndOrderedCards
                    targetColummn.cardOrderIds = dndOrderedCards.map((c: any) => c._id)
                    return nextColumns
                })
            }
        }
        // Column
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            if (active.id !== over.id) {
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
                const dndOrderedColumn = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
                setOrderedColumns(dndOrderedColumn);
            }
        }
        // sau khi keo - tha dua ve null
        setActiveDragItemId(null);
        setActiveDragItemData(null);
        setActiveDragItemType(null);
        setOldColumnDraggingCard(null);
    }
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return closestCorners({ ...args })
        }
        const pointerIntersections = pointerWithin(args)
        if (!pointerIntersections?.length) return [];
        let overId = getFirstCollision(pointerIntersections, 'id')
        if (overId) {
            const checkColumn = orderedColumns.find(column => column._id === overId)
            if (checkColumn) {
                overId = closestCorners({
                    ...args,
                    droppableContainers: args.droppableContainers.filter((container: any) => {
                        return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
                    })
                })[0]?.id
            }
            lastOverId.current = overId
            return [{ id: overId }]
        }
        return lastOverId.current ? [{ id: lastOverId.current }] : []
    }, [activeDragItemType, orderedColumns])
    // Xử lý giao diện
    const [showNewBoardForm, setShowNewBoardForm] = useState(false);
    const [disableDragDrop, setDisableDragDrop] = useState(false);
    const handleAddNewBoardClick = () => {
        setShowNewBoardForm(true);
        setDisableDragDrop(true);
    };

    const handleCancelButtonClick = () => {
        setShowNewBoardForm(false);
        setDisableDragDrop(false);
    };
    return (
        <div className={s["scroll-container"]}>
            <DndContext
                sensors={sensors}
                collisionDetection={collisionDetectionStrategy}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {Array.isArray(boards) &&
                    <SortableContext items={boards?.map((c: any) => c._id)} strategy={horizontalListSortingStrategy}>
                        {orderedColumns?.map((column: any, index: any) => (
                            <Column key={index} column={column} />
                        ))}
                    </SortableContext>
                }
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
                    {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Item_body_card card={activeDragItemData} />}
                </DragOverlay>
            </DndContext>

            <div className={`${s["content-item"]} flex-grow`}>
                <div className="flex flex-col">
                    <Temp_board>
                        {!showNewBoardForm ? (<div className='flex justify-between items-center h-[50px] flex-shrink-0' onClick={handleAddNewBoardClick} >
                            <p className='text-base font-medium dark:text-black'>+ Add new board</p>
                        </div>) : (
                            <div className="w-72 p-4 flex-shrink-0">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900 dark:text-black"
                                    />
                                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        New column
                                    </label>
                                </div>
                                <div className='flex justify-between mt-2'>
                                    <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Add column</button>
                                    <X onClick={handleCancelButtonClick} className='text-center text-red-500 mt-2 cursor-pointer' />
                                </div>
                            </div>
                        )}
                    </Temp_board>
                </div>
            </div>
        </div>
    );
};

export default ListColumns;
