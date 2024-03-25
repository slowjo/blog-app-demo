import Link from "next/link";
import { PrismicDocumentWithUID } from "@prismicio/client";
import { PostDocumentData, Simplify } from "@/prismicio-types";
import CardImage from "@/components/CardImage";


type HorizontalCardProps = {
    post : PrismicDocumentWithUID<Simplify<PostDocumentData>, "post", string>;
    children: React.ReactNode;
    fadeOutClass?: string;
}

export default function HorizontalCard({ post, children, fadeOutClass = '' } : HorizontalCardProps) {
    return (
        <li className={`md:col-span-6 md:col-start-7 p-4 flex gap-5 flex-col items-center bg-white rounded-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative fade-in ${fadeOutClass}`}>
            <Link href={`/${post.uid}`} className="relative h-48 w-full md:h-full overflow-clip rounded-lg md:basis-full">
                <CardImage cardType="horizontal" src={post.data.preview_image.url || ""} alt={post.data.preview_image.alt || ""} width={post.data.preview_image.dimensions?.width || 200} height={post.data.preview_image.dimensions?.height || 200} />
            </Link>
            <div className="flex flex-col justify-between leading-normal h-fit md:basis-full">
                <Link href={`/${post.uid}`}>
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.data.title}</h3>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.data.preview_text}</p>
                <div className="flex gap-5">
                    {children}
                </div>
            </div>
        </li>
    )
}