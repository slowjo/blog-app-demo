import { JSXMapSerializer, PrismicRichText, SliceZone } from "@prismicio/react";
import type { RTNode, RTImageNode } from '@prismicio/client'

import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkButtonLoadingState from "./MarkButtonLoadingState";
import MarkButtonDataWrapper from "./MarkButtonDataWrapper";


export default async function Article({ articleUid } : { articleUid : string }) {
    const client = createClient();
    const page = await client
    .getByUID("post", articleUid)
    .catch(() => notFound());

    const components: JSXMapSerializer = {
        image: ({ node }) => (
            <Image src={node.url} width={node.dimensions.width} height={node.dimensions.height} alt={node.alt || ''} className="fade-in" />  
        )
      }

    return (
        <article className="prose prose-img:rounded-xl mx-auto">
            <div className="not-prose flex justify-end gap-5">
                <Suspense fallback={<MarkButtonLoadingState />}>
                        <MarkButtonDataWrapper postId={page.id} markAs="bookmark" />
                        <MarkButtonDataWrapper postId={page.id} markAs="like" />
                </Suspense>
                {/* <MarkButton postId={page.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} /> */}
                {/* <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p> */}
                {/* <MarkButton postId={page.id} isMarked={data ? true : false} guest={guest} markAs={'like'} count={count} /> */}
                {/* <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p> */}
            </div>
            <h1>{page.data.title}</h1>
            <PrismicRichText field={page.data.textandimages} components={components} />
        </article>
    )
}