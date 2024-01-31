import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBookmark, HiOutlineStar, HiStar } from 'react-icons/hi';
import MarkButton from "@/components/MarkButton";


type CardProps = {
    post: {
        id: string,
        created_at: string,
        title: string,
    },
}

export default async function VerticalCard({ post } : CardProps) {
    const { count, error : allLikesError } = await getPostLikes(post.id)

    const { data, error, guest } = await getUserPostLike(post.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(post.id)

    return (
        <div className="p-4 flex flex-col md:col-span-6 md:row-span-3 bg-orange-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <Link href="#" className="relative w-full h-full overflow-clip rounded-lg">
                <Image priority height={900} width={900} className="rounded-lg absolute inset-0 min-h-full min-w-full hover:scale-105 transition-transform duration-1000 object-cover w-auto h-auto" src="/pexels-atahan-demir-18178896.jpg" alt="" />
                <span className="bg-white text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 absolute top-5 right-5">
                    <HiStar />
                    {count && (
                        <p>{count}</p>
                    )}
                </span>
            </Link>
            <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <div className="flex gap-5">
                    <MarkButton postId={post.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                    {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                    <MarkButton postId={post.id} isMarked={data ? true : false} guest={guest} markAs={'like'} />
                    {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
                </div>
            </div>
        </div>
    )
}