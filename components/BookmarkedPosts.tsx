import { getBookmarkedPosts, getPostLikes, getUserPostLike } from "@/app/actions";
import HorizontalCard from "./HorizontalCard";
import BookmarkedPostsClientList from "./BookmarkedPostsClientList";


export default async function BookmarkedPosts() {
    const data = await getBookmarkedPosts()

    const likes : { like: boolean; count: number }[] = []

    for (let item of data) {
        const bookmarked = await getUserPostLike(item.id)
        const { count, error : allLikesError } = await getPostLikes(item.id)
        if (bookmarked && bookmarked.data) {
            likes.push({
                like: true,
                count: count || 0,
            })
        } else {
            likes.push({
                like: false,
                count: count || 0,
            })
        }
    }

    // console.log('likes: ', likes);

    console.log('bookmarked posts: ', data)

    return (
        <BookmarkedPostsClientList posts={data} likes={likes} />
        // <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
        //     {data && data.map((post) => (
        //         <HorizontalCard post={post} key={post.id} client={true} />
        //     ))}
        // </ul>
    );
}