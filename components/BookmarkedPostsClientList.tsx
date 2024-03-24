'use client'

import { AllDocumentTypes } from "@/prismicio-types";
import HorizontalCard from "./HorizontalCard"


type BookmarkedPostsClientListProps = {
    posts: AllDocumentTypes[];
    likes: { like: boolean; count: number }[];
}

export default function BookmarkedPostsClientList({ posts, likes } : BookmarkedPostsClientListProps) {
    return (
        <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
            {posts && posts.map((post, index) => (
                <HorizontalCard post={post} key={post.id} client={true} like={likes[index]} />
            ))}
        </ul>
    )
}