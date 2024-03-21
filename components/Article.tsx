import { createClient } from "@/prismicio";
// import { components } from "@/slices";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkButtonLoadingState from "./MarkButtonLoadingState";
import MarkButtonDataWrapper from "./MarkButtonDataWrapper";
import TextWithImages from "@/components/TextWithImages";


export default async function Article({ articleUid } : { articleUid : string }) {
    const client = createClient();
    const page = await client
    .getByUID("post", articleUid)
    .catch(() => notFound());

    return (
        <article className="prose prose-img:rounded-xl mx-auto">
            <div className="not-prose flex justify-end gap-5">
                <Suspense fallback={<MarkButtonLoadingState />}>
                        <MarkButtonDataWrapper postId={page.id} markAs="bookmark" />
                        <MarkButtonDataWrapper postId={page.id} markAs="like" />
                </Suspense>
            </div>
            <h1>{page.data.title}</h1>
            <TextWithImages textandimages={page.data.textandimages} />
        </article>
    )
}