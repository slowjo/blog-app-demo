'use client'

import { AllDocumentTypes } from "@/prismicio-types"
import HorizontalCard from "./HorizontalCard"
import MarkButton from "@/components/MarkButton";


type BookmarkedPostsClientListProps = {
    posts: AllDocumentTypes[];
    likes: { like: boolean; count: number }[];
}

export default function BookmarkedPostsClientList({ posts, likes } : BookmarkedPostsClientListProps) {
    return (
        <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
            {posts && posts.map((post, index) => (
                <HorizontalCard post={post} key={post.id} >
                        <MarkButton postId={post.id} markAs="bookmark" guest={false} isMarked={true} />
                        <MarkButton postId={post.id} markAs="like" guest={false} isMarked={likes[index]?.like || false} count={likes[index]?.count || 0} />
                </HorizontalCard>
            ))}
        </ul>
    )
}