'use client'

import { useState } from 'react';
import { AllDocumentTypes } from "@/prismicio-types"
import HorizontalCard from "./HorizontalCard"
import MarkButton from "@/components/MarkButton";


type BookmarkedPostsClientListProps = {
    posts: AllDocumentTypes[];
    likes: { like: boolean; count: number }[];
}

export default function BookmarkedPostsClientList({ posts, likes } : BookmarkedPostsClientListProps) {
    const [fadeOutPosts, setFadeOutPosts] = useState<string[]>([]);

    const addFadeOutClass = (postId : string) => {
        setFadeOutPosts((prev) => (
            [
                ...prev,
                postId,
            ]
        ))
    }

    return (
        <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
            {posts && posts.map((post, index) => (
                <HorizontalCard post={post} key={post.id} fadeOutClass={fadeOutPosts.includes(post.id) ? 'fade-out' : ''} >
                    <MarkButton postId={post.id} markAs="bookmark" guest={false} isMarked={true} addFadeOutClass={addFadeOutClass} />
                    <MarkButton postId={post.id} markAs="like" guest={false} isMarked={likes[index]?.like || false} count={likes[index]?.count || 0} />
                </HorizontalCard>
            ))}
        </ul>
    )
}