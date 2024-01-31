import { getBookmarkedPosts } from "@/app/actions"
import UnmarkButton from "@/components/UnmarkButton"

export default async function BookmarkedPostsPage () {
    const { data, error } = await getBookmarkedPosts()

    console.log('bookmarked posts: ', data)

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <ul>
                {data && data.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <UnmarkButton postId={post.id} markedAs={'bookmark'} />
                    </li>
                ))}
            </ul>
        </main>
    )
}