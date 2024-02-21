import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineBookmark, HiOutlineStar, HiStar } from 'react-icons/hi';
import MarkButton from "@/components/MarkButton";
import { PrismicDocumentWithUID } from "@prismicio/client";
import { PostDocumentData, Simplify } from "@/prismicio-types";
import getImage from "@/utils/getImage";


export default async function HorizontalCard({ post } : { post : PrismicDocumentWithUID<Simplify<PostDocumentData>, "post", string> }) {
    const { count, error : allLikesError } = await getPostLikes(post.id)

    const { data, error, guest } = await getUserPostLike(post.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(post.id)
    
    const { base64 : blurredImage } = await getImage(post.data.preview_image.url || '')

    console.log('blurred image: ', blurredImage)

    return (
        <div className="md:col-span-6 md:col-start-7 p-4 flex gap-5 flex-col items-center bg-white rounded-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative fade-in">
            <Link href={`/${post.uid}`} className="relative h-48 w-full md:h-full overflow-clip rounded-lg md:basis-full">
                <Image fill={true} placeholder="blur" blurDataURL={blurredImage} src={post.data.preview_image.url || ''} alt={post.data.preview_image.alt || ''} className="rounded-lg object-cover md:absolute inset-0 max-h-56 md:max-h-none min-w-full min-h-full w-full h-48 md:w-auto md:h-auto hover:scale-110 transition-transform duration-1000" />
                {/* <span className="bg-white text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400 absolute top-5 right-5">
                    <HiStar />
                    {count && (
                        <p>{count}</p>
                    )}
                </span> */}
            </Link>
            <div className="flex flex-col justify-between leading-normal h-fit md:basis-full">
                <Link href={`/${post.uid}`}>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.data.title}</h3>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.data.preview_text}</p>
                <div className="flex gap-5">
                    <MarkButton postId={post.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                    {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                    <MarkButton postId={post.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} />
                    {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
                </div>
            </div>
        </div>
    )
}