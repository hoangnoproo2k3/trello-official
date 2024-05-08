/* eslint-disable @next/next/no-img-element */
'use client'
import Nav from "@/components/common/nav"
const Index = () => {
  return (
    <div className="bg-slate-50 dark:bg-background h-screen flex">
      <Nav />
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
    </div>
  )
}

export default Index
