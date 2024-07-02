import { getPostsPreview } from "@/app/actions";
import HorizontalCard from "./HorizontalCard";
import VerticalCard from "./VerticalCard";
import { Suspense } from "react";
import MarkButtonLoadingState from "./MarkButtonLoadingState";
import MarkButtonDataWrapper from "./MarkButtonDataWrapper";

export default async function HeroGrid() {
    const data = await getPostsPreview()

    return (
        <ul className="max-w-screen-xl md:w-full md:mx-auto md:grid grid-cols-12 grid-rows-[auto_auto_auto] gap-x-4 py-5 md:py-28">
            {data && (
                <>
                    <VerticalCard post={data[0]} key={data[0].id} />
                    <HorizontalCard post={data[1]} key={data[1].id} >
                        <Suspense fallback={<MarkButtonLoadingState />}>
                            <MarkButtonDataWrapper postId={data[1].id} markAs="bookmark" />
                            <MarkButtonDataWrapper postId={data[1].id} markAs="like" />
                        </Suspense>
                    </HorizontalCard>
                    <HorizontalCard post={data[2]} key={data[2].id} >
                        <Suspense fallback={<MarkButtonLoadingState />}>
                            <MarkButtonDataWrapper postId={data[2].id} markAs="bookmark" />
                            <MarkButtonDataWrapper postId={data[2].id} markAs="like" />
                        </Suspense>
                    </HorizontalCard>
                    <HorizontalCard post={data[3]} key={data[3].id} >
                        <Suspense fallback={<MarkButtonLoadingState />}>
                            <MarkButtonDataWrapper postId={data[3].id} markAs="bookmark" />
                            <MarkButtonDataWrapper postId={data[3].id} markAs="like" />
                        </Suspense>
                    </HorizontalCard>
                </>
            )}
        </ul>
    )
}