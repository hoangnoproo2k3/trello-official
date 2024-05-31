import { getDetailBoardWithId, getListMembersInBoard } from '@/apis/boardApi'
import { getColumnsWithBoard } from '@/apis/columnApi'
import ListColumns from '@/components/common/ListColumns'
import Navbar from '@/components/common/Navbar'
import { mapOrder } from '@/utils/sorts'
// import { useSearchParams } from 'next/navigation'

const BoardId = async ({ params, searchParams }: any) => {
    const slug = params.boardId;
    const reponse = await getDetailBoardWithId(searchParams.boardIdObj)
    const reponseColumns = await getColumnsWithBoard({ boardId: searchParams.boardIdObj })
    const getMembersInBoard = await getListMembersInBoard({ boardId: searchParams.boardIdObj })
    // const orderedColumns = mapOrder(mockData?.board?.columns, mockData?.board?.columnOrderIds, '_id')
    const orderedColumnsDB = mapOrder(reponseColumns?.getColumns, reponse?.message?.getBoards?.columnOrderIds, '_id')

    return (
        <div>
            <Navbar boardId={searchParams.boardIdObj} title_board={reponse.message.getBoards?.title} visibility={reponse.message.getBoards?.type} getMembersInBoard={getMembersInBoard} />
            {/* <ListColumns boards={orderedColumns} /> */}
            <ListColumns boards={orderedColumnsDB} boardId={searchParams.boardIdObj} ownerId={reponse.message.getBoards?.ownerId} />
        </div>
    )
}

export default BoardId
