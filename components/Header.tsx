import { getBookmarkedPosts, getLikedPosts } from "@/app/actions";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { FaBookmark, FaStar } from "react-icons/fa";


export default async function Header() {
    const { data, error } = await getLikedPosts()

    const { data : bookmarkData, error : bookMarkError } = await getBookmarkedPosts()

    const { userId } = auth();

    return (
        <header className="flex items-center justify-between mx-auto max-w-5xl p-4">
            <div>
                <p>LikeApp</p>
            </div>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Link href="/">Home</Link> 
                    </li>
                    <li>
                        <Link href="/likedposts" className="relative mr-7 flex items-center gap-2"><FaStar /> Liked Posts <span className="absolute top-[-7px] right-[-25px] text-xs px-2 py-0.5 bg-orange-500 text-white rounded-xl">{data?.length}</span></Link>
                    </li>
                    <li>
                        <Link href="/bookmarkedposts" className="relative flex items-center gap-2"><FaBookmark /> Bookmarked Posts <span className="absolute top-[-7px] right-[-25px] text-xs px-2 py-0.5 bg-orange-500 text-white rounded-xl">{bookmarkData?.length}</span></Link>
                    </li>
                </ul>
            </nav>
            <div className="flex gap-4">
                {!userId && (
                    <>
                        <SignInButton />
                        <SignUpButton />
                    </>
                )}
                <UserButton afterSignOutUrl="/" />
            </div>
        </header>
    )
}