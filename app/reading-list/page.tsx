import BookmarkedPosts from "@/components/BookmarkedPosts"
import { Suspense } from "react"
import ReadingListLoadingState from "@/components/ReadingListLoadingState"


export default async function BookmarkedPostsPage () {
    return (
        <main className="flex flex-col items-center justify-between p-5 md:p-24">
            <Suspense fallback={<ReadingListLoadingState />}>
                <BookmarkedPosts />
            </Suspense>
            {/* <ReadingListLoadingState /> */}
        </main>
    )
}