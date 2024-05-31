/* eslint-disable @next/next/no-img-element */
'use client'
import { getLatestDocuments, joinBoardWithMember } from "@/apis/boardApi";
import Nav from "@/components/common/nav";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DateDifferenceComponent from "../_components/DateDifferenceComponent";
import { toast } from "react-toastify";
const Index = () => {
  const currentPath = usePathname()
  const { data: session } = useSession();
  const [listBoards, setListBoards] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()
  const fetchLatestDocuments = async (currentPage: any) => {
    try {
      if (session?.user) {
        const latestDocuments = await getLatestDocuments(currentPage, { ownerId: localStorage.getItem('userId') });
        setListBoards(latestDocuments?.message?.getBoards);
      } else {
        const latestDocuments = await getLatestDocuments(currentPage, { ownerId: null });
        setListBoards(latestDocuments?.message?.getBoards);
      }
    } catch (error) {
      console.error('Error fetching latest documents:', error);
    }
  };

  useEffect(() => {
    fetchLatestDocuments(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, session?.user]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleJoinBoard = async (boardId: any) => {
    if (localStorage.getItem('userId') != undefined) {
      await joinBoardWithMember({
        boardId: boardId,
        ownerId: localStorage.getItem('userId')
      })
      router.push(`${currentPath}/boards`)
    } else {
      toast.error('Vui lòng đăng nhập');
    }
  }
  return (
    <div className="bg-slate-50 dark:bg-background h-screen flex">
      <Nav />
      <div className="right w-full flex gap-2 flex-col ">
        <div className="right w-full flex gap-2 flex-col items-center ">
          <div className="pt-8 ">
            <div
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="https://flowbite.com/docs/images/blog/image-4.jpg"
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Theo dõi và cập nhật
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Mời mọi người vào bảng và thẻ, để lại nhận xét, thêm ngày hết hạn và chúng tôi sẽ hiển thị hoạt động quan trọng nhất ở đây.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className='p-10 font-bold'>THEO DÕI HOẠT ĐỘNG CỘNG ĐỒNG</p>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mx-8">
          {listBoards.length > 0 && listBoards?.map((item: any) => {
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
                    <button
                      onClick={() => handleJoinBoard(item._id)}
                      // href={`${currentPath}/${item?.slug}?boardIdObj=${item?._id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Join now
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
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {listBoards.length > 0 && <div className="fixed bottom-[40px] right-[120px] mb-8 mr-8">
          <button
            onClick={handlePrevPage} disabled={currentPage === 1}
            className={`mr-4 py-2 px-4 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Trước
          </button>
          <button
            onClick={handleNextPage}
            disabled={listBoards.length < 8}
            className={`py-2 px-4 rounded-md ${listBoards.length < 8 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Sau
          </button>
        </div>}
      </div>
    </div>
  )
}

export default Index
