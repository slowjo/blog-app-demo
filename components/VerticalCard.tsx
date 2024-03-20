import Link from "next/link";
import { HiOutlineBookmark, HiOutlineStar, HiStar } from 'react-icons/hi';
import { PrismicDocumentWithUID } from "@prismicio/client";
import { PostDocumentData, Simplify } from "@/prismicio-types";
import getImage from "@/utils/getImage";
import CardImage from '@/components/CardImage';
import MarkButtonDataWrapper from "./MarkButtonDataWrapper";


export default async function VerticalCard({ post } : { post : PrismicDocumentWithUID<Simplify<PostDocumentData>, "post", string> }) {
    const { base64 } = await getImage(post.data.preview_image.url || '')

    return (
        <li className="p-4 mb-4 md:mb-0 flex flex-col md:col-span-6 md:row-span-3 bg-orange-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 fade-in">
            <Link href={`/${post.uid}`} className="relative h-56 w-full md:h-full overflow-clip rounded-lg">
                <CardImage base64={base64} cardType="vertical" src={post.data.preview_image.url || ""} alt={post.data.preview_image.alt || ""} width={post.data.preview_image.dimensions?.width || 200} height={post.data.preview_image.dimensions?.height || 200} />
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
                <div className="flex items-center gap-5">
                    <MarkButtonDataWrapper postId={post.id} markAs="bookmark" />
                    <MarkButtonDataWrapper postId={post.id} markAs="like" />
                    {/* <MarkButton postId={post.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} /> */}
                    {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                    {/* <MarkButton postId={post.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} />    */}
                    {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
                </div>
            </div>
        </li>
    )
}