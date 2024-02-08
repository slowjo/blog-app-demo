import { getLikedPosts } from "@/app/actions"
import UnmarkButton from "@/components/UnmarkButton"

export default async function LikedPostsPage () {
    // const { data, error } = await getLikedPosts()
    const data = await getLikedPosts()

    console.log('likedposts: ', data)

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <ul>
                {data && data.map((post) => (
                    <li key={post.id}>
                        <h3>{post.data.title}</h3>
                        <UnmarkButton postId={post.id} markedAs={'like'} />
                    </li>
                ))}
            </ul>
        </main>
    )
}