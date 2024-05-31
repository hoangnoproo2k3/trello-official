/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { createNewBoard, getPaginatedDocuments } from '@/apis/boardApi'
import DateDifferenceComponent from '@/app/_components/DateDifferenceComponent'
import Pagination from '@/app/_components/pagination'
import Nav from '@/components/common/nav'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color'

const Boards = () => {
    const currentPath = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [listBoards, setListBoards] = useState<any[]>([]);
    const [boardName, setBoardName] = useState('');
    const [desBoard, setDesBoard] = useState('');
    const [boardBackground, setBoardBackground] = useState('#ABB8C3');
    const [visibility, setVisibility] = useState('public');
    const { data: session } = useSession();
    let userId: any;
    if (session && session.user && "id" in session.user) {
        userId = session.user.id;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const itemsPerPage = 6;

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChangeComplete = (color: any) => {
        setBoardBackground(color.hex);
    };

    const handleBoardNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBoardName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesBoard(event.target.value);
    };
    useEffect(() => {
        if (userId != undefined) {
            fetchListBoards(currentPage, itemsPerPage)
        }
    }, [userId])
    const fetchListBoards = async (currentPage: number, pageSize: number) => {
        if (userId) {
            try {
                const dataBoards = await getPaginatedDocuments(currentPage, pageSize, { ownerId: userId });
                if (Array.isArray(dataBoards.message.getBoards)) {
                    setListBoards(dataBoards.message.getBoards);
                }
                setTotalPage(dataBoards.message.getBoardsCount);
            } catch (error) {
                console.error('Error calling another API:', error);
            }
        } else {
            console.log('User ID not found in localStorage');
        }
    };

    const handleCreateBoard = async () => {
        const trimmedBoardName = boardName.trim().replace(/\s+/g, ' ');
        const trimmedDescription = desBoard.trim().replace(/\s+/g, ' ');

        if (!trimmedBoardName) {
            alert('Vui lòng nhập tên bảng.');
            return;
        }

        try {
            await createNewBoard({
                title: trimmedBoardName,
                bgColor: boardBackground,
                ownerId: userId,
                description: trimmedDescription,
                type: visibility,
            });
            closeModal();
            setBoardName('');
            setDesBoard('');
            setVisibility('public');
            setBoardBackground('#ABB8C3');
            setError('');
            fetchListBoards(currentPage, itemsPerPage);
        } catch (error: unknown) {
            // Kiểm tra kiểu của error trước khi truy cập các thuộc tính
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || error.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };


    useEffect(() => {
        fetchListBoards(currentPage, itemsPerPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchListBoards(page, itemsPerPage);
    };


    return (
        <div className="bg-slate-50 dark:bg-background h-screen flex">
            <Nav />
            {!session?.user ?
                <div className='right w-full flex gap-2 flex-col items-center p-10 font-bold uppercase text-[16px]'>Hãy đăng nhập để xem các không gian làm việc của bạn </div>
                : <div className="right w-full flex gap-2 flex-col ">
                    <div className="flex items-center justify-between p-10 ">
                        <p className="font-bold">CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</p>
                        <div className="flex justify-center items-center bg-slate-200 dark:bg-slate-400  cursor-pointer px-4 py-2 rounded-md" onClick={openModal}>
                            Tạo bảng mới
                        </div>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mx-8">
                        {listBoards?.map((item: any) => {
                            return (
                                <div key={item?._id} className={`flex col-span-1 font-bold  `} >
                                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ backgroundColor: item?.bgColor, minWidth: '360px' }}>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {item?.title}
                                                </h5>
                                            </a>
                                            <p className="mb-3 font-normal text-red-600 dark:text-red-800">
                                                {item?.description}
                                            </p>
                                            <div className="flex justify-end items-center mr-4">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                {item.createdAt && <DateDifferenceComponent apiDate={item.createdAt} />}
                                            </div>
                                            <a
                                                href={`${currentPath}/${item?.slug}?boardIdObj=${item?._id}`}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                See more
                                                <svg
                                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 10"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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
                                                <label
                                                    htmlFor="first_name"
                                                    className="block mt-2 mb-2 text-sm font-medium text-gray-900 "
                                                >
                                                    Mô tả bảng
                                                </label>
                                                <textarea
                                                    value={desBoard}
                                                    onChange={(e) => { setDesBoard(e.target.value) }}
                                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Mô tả bảng"
                                                />
                                                <div>
                                                    <label
                                                        htmlFor="visibility"
                                                        className="block mt-2 mb-2 text-sm font-medium text-gray-900"
                                                    >
                                                        Quyền riêng tư
                                                    </label>
                                                    <select
                                                        id="visibility"
                                                        value={visibility}
                                                        onChange={(e) => { setVisibility(e.target.value) }}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    >
                                                        <option value="private">Private</option>
                                                        <option value="public">Public</option>
                                                    </select>
                                                </div>
                                                {error && <p className="text-red-500">{error}</p>}
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
