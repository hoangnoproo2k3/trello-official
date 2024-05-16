import { getDetailBoardWithId } from '@/apis/boardApi'
import { getColumnsWithBoard } from '@/apis/columnApi'
import ListColumns from '@/components/common/ListColumns'
import Navbar from '@/components/common/Navbar'
import { mapOrder } from '@/utils/sorts'
// import { useSearchParams } from 'next/navigation'

const BoardId = async ({ params, searchParams }: any) => {
    const slug = params.boardId;
    // console.log(searchParams.boardIdObj);
    const reponse = await getDetailBoardWithId(searchParams.boardIdObj)
    const reponseColumns = await getColumnsWithBoard({ boardId: searchParams.boardIdObj })
    // const orderedColumns = mapOrder(mockData?.board?.columns, mockData?.board?.columnOrderIds, '_id')
    const orderedColumnsDB = mapOrder(reponseColumns?.getColumns, reponse?.message?.getBoards?.columnOrderIds, '_id')

    return (
        <div>
            <Navbar title_board={reponse.message.getBoards?.title} visibility={reponse.message.getBoards?.type} />
            {/* <ListColumns boards={orderedColumns} /> */}
            <ListColumns boards={orderedColumnsDB} boardId={searchParams.boardIdObj} />
        </div>
    )
}

export default BoardId
