import { mockData } from '@/apis/mork-data'
import ListColumns from '@/components/common/ListColumns'
import Navbar from '@/components/common/Navbar'
import { mapOrder } from '@/utils/sorts'
import React from 'react'

const BoardId = () => {
    const orderedColumns = mapOrder(mockData?.board?.columns, mockData?.board?.columnOrderIds, '_id')
    return (
        <div>
            <Navbar title_board={mockData?.board?.title} visibility={mockData?.board?.type} />
            <ListColumns boards={orderedColumns} />
        </div>
    )
}

export default BoardId
