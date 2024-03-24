import { getPostLikes, getUserPostBookmark, getUserPostLike } from "@/app/actions"
import MarkButton from "@/components/MarkButton"


type MarkButtonDataWrapperProps = {
    postId : string;
    markAs : string;
}

export default async function MarkButtonDataWrapper({ postId, markAs } : MarkButtonDataWrapperProps) {
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