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

export default async function HorizontalCard({ post } : CardProps) {
    const { count, error : allLikesError } = await getPostLikes(post.id)

    const { data, error, guest } = await getUserPostLike(post.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(post.id)

    return (
        <div className="md:col-span-6 md:col-start-7 p-4 flex gap-5 flex-col items-center bg-white rounded-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative">
            <Link href="#" className="relative w-full h-full overflow-clip rounded-lg basis-full">
                <Image width={300} height={300} src="/cars.jpg" alt="image 1" className="rounded-lg object-cover absolute inset-0 min-w-full min-h-full w-auto h-auto hover:scale-110 transition-transform duration-1000" />
                <span className="bg-white text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 absolute top-5 right-5">
                    <HiStar />
                    {count && (
                        <p>{count}</p>
                    )}
                </span>
            </Link>
            <div className="flex flex-col justify-between leading-normal h-fit basis-full">
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