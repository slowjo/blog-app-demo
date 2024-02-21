import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBookmark, HiOutlineStar, HiStar } from 'react-icons/hi';
import MarkButton from "@/components/MarkButton";
import { PrismicDocumentWithUID } from "@prismicio/client";
import { PostDocumentData, Simplify } from "@/prismicio-types";
import getImage from "@/utils/getImage";


type CardProps = {
    post: {
        id: string,
        created_at: string,
        title: string,
    },
}

export default async function VerticalCard({ post } : { post : PrismicDocumentWithUID<Simplify<PostDocumentData>, "post", string> }) {
    const { count, error : allLikesError } = await getPostLikes(post.id)

    const { data, error, guest } = await getUserPostLike(post.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(post.id)

    const { base64 : blurredImage } = await getImage(post.data.preview_image.url || '')

    return (
        <div className="p-4 mb-4 md:mb-0 flex flex-col md:col-span-6 md:row-span-3 bg-orange-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 fade-in">
            <Link href={`/${post.uid}`} className="relative h-56 w-full md:h-full overflow-clip rounded-lg">
                <Image priority fill={true} placeholder="blur" blurDataURL={blurredImage} className="rounded-lg md:absolute inset-0 md:min-h-full min-w-full hover:scale-105 transition-transform duration-1000 object-cover max-h-56 md:max-h-none w-full h-56 md:w-auto md:h-auto" src={post.data.preview_image.url || ''} alt={post.data.preview_image.alt || ''} />
                {/* <span className="bg-white text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 absolute top-5 right-5">
                    <HiStar />
                    {count && (
                        <p>{count}</p>
                    )}
                </span> */}
            </Link>
            <div className="p-5">
                <Link href="{`/${post.uid}`}">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.data.title}</h3>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.data.preview_text}</p>
                <div className="flex justify-between md:justify-start items-center md:gap-5">
                    <MarkButton postId={post.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                    {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                    <MarkButton postId={post.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} />   
                    {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
                </div>
            </div>
        </div>
    )
}