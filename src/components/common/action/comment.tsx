/* eslint-disable @next/next/no-img-element */
import { createCommentInCard, deleteCommentInCard, getDetailCardWithId } from "@/apis/cardApi";
import BlogEditor from "@/components/BlogEditor"
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Comment = ({ cardId }: any) => {
    const [html, setHtml] = useState("");
    const { data: session } = useSession();
    const [formDataCard, setFormDataCard] = useState<any>();
    const handleComment = async () => {
        await createCommentInCard(cardId, {
            name: session?.user?.name,
            content: html
        })
        setHtml('')
        fetchDataCardWithId(cardId)
    }
    const handleDelete = async (commentID: any) => {
        await deleteCommentInCard(cardId, { commentID: commentID })
        fetchDataCardWithId(cardId)
    }
    // Get data card
    useEffect(() => {
        fetchDataCardWithId(cardId)
    }, [cardId])
    const fetchDataCardWithId = async (cardId: any) => {
        try {
            const response = await getDetailCardWithId(cardId)
            setFormDataCard(response.getCards)
        } catch (error) {
            console.error('Error calling another API:', error);
        }
    }

    return (
        <section className="bg-white  py-8 lg:py-16 antialiased" draggable="false">
            <div className="mx-auto px-4 text-black">
                <div className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-400 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <BlogEditor value={html} onChange={(e) => setHtml(e.html)} />
                    </div>
                    <button
                        onClick={handleComment}
                        type="button"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Post comment
                    </button>
                </div>
                {formDataCard?.comments === undefined ? (
                    <div>Loading comments...</div>
                ) : formDataCard.comments.length > 0 ? (
                    formDataCard.comments
                        .slice()
                        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((item: any) => (
                            <article className="p-6 text-base bg-white rounded-lg" key={item._id}>
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                alt="Michael Gough"
                                            />
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time dateTime={new Date(item.date).toISOString()} title={new Date(item.date).toLocaleString()}>
                                                {new Date(item.date).toLocaleString()}
                                            </time>
                                        </p>
                                    </div>
                                    <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-red-500" onClick={() => handleDelete(item?._id)}>
                                        <Trash size={18} />
                                    </button>
                                    {/* {showConfirmation && (
                                        <div className="fixed z-10 inset-0 overflow-y-auto">
                                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                                    <div className="absolute inset-0 bg-gray-500 opacity-40"></div>
                                                </div>
                                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                        <div className="sm:flex sm:items-start">
                                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                                <Trash className="h-6 w-6 text-red-600" />
                                                            </div>
                                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                <h3 className="text-lg leading-6 font-medium text-gray-900" >Xác nhận xóa</h3>
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500">Bạn có chắc muốn xóa bình luận này?</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                        <button onClick={() => handleDistroy(item._id)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                                            Xóa
                                                        </button>
                                                        <button onClick={() => setShowConfirmation(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                                            Hủy
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )} */}
                                </footer>
                                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                            </article>
                        ))
                ) : (
                    <p>No comments available</p>
                )}

            </div>
        </section>
    )
}

export default Comment
