'use client'

import { HiStar, HiOutlineStar, HiBookmark, HiOutlineBookmark } from "react-icons/hi"
import useReactiveMarkState from "@/hooks/useReactiveMarkState"
import { useRouter } from "next/navigation"
import { Button } from "flowbite-react"
import { Tooltip } from 'flowbite-react';


type MarkButtonProps = {
    postId: string,
    isMarked: boolean,
    guest: boolean | undefined,
    markAs: string,
    count?: number | null,
}

const UnMarkedIcon = ({ markAs } : { markAs : string }) => {
    return (
        <>
            {markAs === 'like' ? (
                <>
                    <HiOutlineStar className="text-lg" />
                    {/* <p>Like</p> */}
                </>
            ) : (
                <>
                    <HiOutlineBookmark className="text-lg" />
                    {/* <p>Bookmark</p> */}
                </>
            )}
        </>
    )
}

const MarkedIcon = ({ markAs } : { markAs : string }) => {
    return (
        <>
            {markAs === 'like' ? (
                <>
                    <HiStar className="text-lg" />
                    {/* <p>Liked</p> */}
                </>
            ) : (
                <>
                    <HiBookmark className="text-lg" />
                    {/* <p>Bookmarked</p> */}
                </>
            )}
        </>
    )
}

export default function MarkButton({ isMarked, postId, guest, markAs, count } : MarkButtonProps) {
    const { markedAtClient, handleMarkClick } = useReactiveMarkState(isMarked, postId, markAs)

    const router = useRouter()

    const handleClick = () => {
        if (guest) {
            // alert('Please log in to like or bookmark posts')
            router.push('/sign-up')
        } else {
            handleMarkClick()
        }
    }

    return(
        <Tooltip content={markAs === 'like' ? isMarked ? 'Unlike this post' : 'Like this post' : isMarked ? 'Remove this post from your reading list' : 'Add this post to your reading list'}>
            <Button onClick={handleClick} size='lg' color='orange' className="bg-transparent text-gray-900 scale-95 hover:scale-100 transition-transform duration-100 w-10 h-10 rounded-full">
                {/* <div className="flex items-center justify-start gap-2"> */}
                    {markedAtClient ? (
                        <>
                            <MarkedIcon markAs={markAs} />
                            {count ? <div className="ml-1">{count}</div> : null}
                        </>
                    ) : (
                        <>
                            <UnMarkedIcon markAs={markAs} />
                            {count ? <div className="ml-1">{count}</div> : null}
                        </>
                    )}
                {/* </div> */}
            </Button>        
        </Tooltip>
    )
}
