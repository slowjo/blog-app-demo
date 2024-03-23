import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions"
import MarkButton from "@/components/MarkButton"

export default async function MarkButtonDataWrapper({ postId, markAs } : { postId : string, markAs : string }) {
    const { count, error : allLikesError } = await getPostLikes(postId)

    const { data, error, guest } = await getUserPostLike(postId)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(postId)

    return (
        <>
            {markAs === "like" ? (
                <MarkButton postId={postId} isMarked={data ? true : false} guest={guest} markAs={markAs} count={count} />
            ) : (
                <MarkButton postId={postId} isMarked={bookmarkData ? true : false} guest={guest} markAs={markAs} />
            )}
        </>
        
    )
}