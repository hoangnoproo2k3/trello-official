"use client"
import { getDetailBoardWithId } from '@/apis/boardApi'
import { mockData } from '@/apis/mork-data'
import ListColumns from '@/components/common/ListColumns'
import Navbar from '@/components/common/Navbar'
import { mapOrder } from '@/utils/sorts'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const BoardId = () => {
    const searchParams = useSearchParams();
    let boardIdObj = searchParams.get("boardIdObj");
    useEffect(() => {
        const fetchDataBoard = async () => {
            if (typeof (boardIdObj) === 'string') {
                const reponse = await getDetailBoardWithId(boardIdObj)
                console.log(reponse);
            }
        }
        fetchDataBoard()
    }, [boardIdObj])
    const orderedColumns = mapOrder(mockData?.board?.columns, mockData?.board?.columnOrderIds, '_id')
    return (
        <div>
            <Navbar title_board={mockData?.board?.title} visibility={mockData?.board?.type} />
            <ListColumns boards={orderedColumns} />
        </div>
    )
}

export default BoardId
