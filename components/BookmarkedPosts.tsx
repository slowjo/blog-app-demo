import { getBookmarkedPosts } from "@/app/actions";
import HorizontalCard from "./HorizontalCard";

export default async function BookmarkedPosts() {
    const data = await getBookmarkedPosts()

    console.log('bookmarked posts: ', data)

    return (
        <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
            {data && data.map((post) => (
                <HorizontalCard post={post} key={post.id} />
            ))}
        </ul> 
    );
}