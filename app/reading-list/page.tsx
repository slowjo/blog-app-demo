import { getBookmarkedPosts } from "@/app/actions"
import HorizontalCard from "@/components/HorizontalCard"
import UnmarkButton from "@/components/UnmarkButton"

export default async function BookmarkedPostsPage () {
    // const { data, error } = await getBookmarkedPosts()
    const data = await getBookmarkedPosts()

    console.log('bookmarked posts: ', data)

    return (
        <main className="flex flex-col items-center justify-between p-5 md:p-24">
            <ul>
                {data && data.map((post) => (
                    <li key={post.id}>
                        <HorizontalCard post={post} />
                        {/* <h3>{post.data.title}</h3>
                        <UnmarkButton postId={post.id} markedAs={'bookmark'} /> */}
                    </li>
                ))}
            </ul>
        </main>
    )
}