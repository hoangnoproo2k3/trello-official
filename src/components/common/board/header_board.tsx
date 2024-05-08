import { Ellipsis, GripVertical } from 'lucide-react'
import Temp_board from './temp_board'

const HeaderBoard = ({ name_board }: any) => {
    return (
        <Temp_board>
            <div className='flex justify-between items-center h-[50px] flex-shrink-0 '>
                <p className='text-base font-medium dark:text-black'>{name_board}</p>
                <GripVertical className='dark:text-black cursor-pointer' />
            </div>
        </Temp_board>
    )
}

export default HeaderBoard
