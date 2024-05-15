/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createNewBoard, getPaginatedDocuments } from '@/apis/boardApi'
import Pagination from '@/app/_components/pagination'
import Nav from '@/components/common/nav'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color'

const Boards = () => {
    const currentPath = usePathname()
    const [isOpen, setIsOpen] = useState(false);
    const [listBoards, setListBoards] = useState<any[]>([]);
    const [boardName, setBoardName] = useState('');
    const [boardBackground, setBoardBackground] = useState('#ABB8C3');
    const userId = localStorage.getItem('userId');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const itemsPerPage = 2;
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const handleChangeComplete = (color: any) => {
        setBoardBackground(color.hex);
    };
    const handleBoardNameChange = (event: any) => {
        setBoardName(event.target.value);
    };
    const fetchListBoards = async (currentPage: any, pageSize: any) => {
        if (userId) {
            try {
                const dataBoards = await getPaginatedDocuments(currentPage, pageSize, { ownerId: userId });
                setListBoards(dataBoards.message.getBoards);
                setTotalPage(dataBoards.message.getBoardsCount)
            } catch (error) {
                console.error('Error calling another API:', error);
            }
        } else {
            console.log('User ID not found in localStorage');
        }
    }
    const handleCreateBoard = async () => {
        if (!boardName.trim()) {
            alert('Vui lòng nhập tên bảng.');
            return;
        }
        try {
            await createNewBoard({
                title: boardName,
                bgColor: boardBackground,
                ownerId: userId
            })
            closeModal()
            setBoardName('');
            setBoardBackground('#ABB8C3');
            fetchListBoards(currentPage, itemsPerPage)
        } catch (error) {
            console.error('Error calling another API:', error);
        }
    };
    const { data: session } = useSession();
    useEffect(() => {
        fetchListBoards(currentPage, itemsPerPage)
    }, [])

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchListBoards(page, itemsPerPage)
    };

    return (
        <div className="bg-slate-50 dark:bg-background h-screen flex">
            <Nav />
            {!session?.user ? <div className='right w-full flex gap-2 flex-col items-center p-10 font-bold uppercase text-[16px]'> Hãy đăng nhập để xem các không gian làm việc của bạn </div> : <div className="right w-full flex gap-2 flex-col ">
                <p className='p-10 font-bold'>CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</p>
                <div className="grid grid-cols-12 gap-8 mx-8 h-[160px]">
                    {listBoards.map((item: any) => {
                        return (
                            <Link key={item?._id} href={`${currentPath}/${item?.slug}?boardId=${item?._id}`} className={`flex pl-6 col-span-3 pt-6 font-bold bg-gray-500`} style={{ backgroundColor: item?.bgColor, height: '140px' }}>{item?.title}</Link>
                        )
                    })}
                    <div className="flex justify-center items-center col-span-3 bg-slate-500 cursor-pointer" onClick={openModal}>
                        Tạo bảng mới
                    </div>

                </div>
                <div className="fixed bottom-0 right-[120px] mb-8 mr-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalPage / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
                <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 text-gray-900 font-bold" id="modal-headline">
                                            Tạo bảng mới
                                        </h3>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="first_name"
                                                className="block mt-2 mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Chọn background
                                            </label>
                                            <TwitterPicker color={boardBackground} onChangeComplete={handleChangeComplete} />
                                            <label
                                                htmlFor="first_name"
                                                className="block mt-2 mb-2 text-sm font-medium text-gray-900 "
                                            >
                                                Tên bảng
                                            </label>
                                            <input
                                                type="text"
                                                value={boardName}
                                                onChange={handleBoardNameChange}
                                                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Tên bảng"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleCreateBoard} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Tạo mới
                                </button>
                                <button onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:w-auto sm:text-sm">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    )
}

export default Boards
