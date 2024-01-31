'use client'

import { unLike, unBookmark } from "@/app/actions"


type PostListItemProps = {
    postId : string,
    markedAs : string 
}

export default function UnmarkButton ({ postId, markedAs } : PostListItemProps) {
    return (
        <>
            {markedAs === 'like' ? (
                <button onClick={() => unLike(postId)}>unlike</button>
            ) : (
                <button onClick={() => unBookmark(postId)}>unbookmark</button>
            )}
        </>
    )
}