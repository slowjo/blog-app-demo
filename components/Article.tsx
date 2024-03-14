import { JSXMapSerializer, PrismicRichText, SliceZone } from "@prismicio/react";
import type { RTNode, RTImageNode } from '@prismicio/client'

import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions";
import MarkButton from "@/components/MarkButton";
import Image from "next/image";
import { notFound } from "next/navigation";
import getImage from "@/utils/getImage";


function isImage(item: RTNode): item is RTImageNode {
    return "url" in item;
}

function getFirstImage(images : RTNode[]) : RTNode {
    return images[0];
}

export default async function Article({ articleUid } : { articleUid : string }) {
    const client = createClient();
    const page = await client
    .getByUID("post", articleUid)
    .catch(() => notFound());

    const images = page.data.textandimages.filter(isImage);

    const firstImage : any = getFirstImage(images);

    const { base64 : blurredImage } = await getImage(firstImage.url || '');
    
    const { data, error, guest } = await getUserPostLike(page.id)

    const { count, error : allLikesError } = await getPostLikes(page.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(page.id)


    const components: JSXMapSerializer = {
        image: ({ node }) => (
          <Image src={node.url} placeholder="blur" blurDataURL={blurredImage} width={node.dimensions.width} height={node.dimensions.height} alt={node.alt || ''} className="fade-in" />
        )
      }

    return (
        <article className="prose prose-img:rounded-xl mx-auto">
            <div className="not-prose flex justify-end gap-5">
                <MarkButton postId={page.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                <MarkButton postId={page.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} />
                {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
            </div>
            <h1>{page.data.title}</h1>
            <PrismicRichText field={page.data.textandimages} components={components} />
        </article>
    )
}