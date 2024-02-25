import { getBookmarkedPosts } from "@/app/actions"
import HorizontalCard from "@/components/HorizontalCard"


export default async function BookmarkedPostsPage () {
    // const { data, error } = await getBookmarkedPosts()
    const data = await getBookmarkedPosts()

    console.log('bookmarked posts: ', data)

    return (
        <main className="flex flex-col items-center justify-between p-5 md:p-24">
            <ul className="md:grid max-w-2xl w-full">
                {data && data.map((post) => (
                    <HorizontalCard post={post} key={post.id} />
                ))}
            </ul>
        </main>
    )
}