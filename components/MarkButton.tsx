'use client'

import useReactiveMarkState from "@/hooks/useReactiveMarkState"
import { useRouter } from "next/navigation"
import { Button } from "flowbite-react"
import { Tooltip } from 'flowbite-react';
import UnMarkedIcon from '@/components/UnMarkedIcon'
import MarkedIcon from '@/components/MarkedIcon'


type MarkButtonProps = {
    postId: string,
    isMarked: boolean,
    guest: boolean | undefined,
    markAs: string,
    count?: number | null,
    addFadeOutClass?: (postId: string) => void;
}

export default function MarkButton({ isMarked, postId, guest, markAs, count, addFadeOutClass } : MarkButtonProps) {
    const { markedAtClient, handleMarkClick } = useReactiveMarkState(isMarked, postId, markAs)

    const router = useRouter()

    const handleClick = () => {
        if (guest) {
            router.push('/sign-up')
        } else {
            if (addFadeOutClass) {
                addFadeOutClass(postId);
            }
            handleMarkClick()
        }
    }

    return(
        <Tooltip content={markAs === 'like' ? isMarked ? 'Unlike this post' : 'Like this post' : isMarked ? 'Remove this post from your reading list' : 'Add this post to your reading list'}>
            <Button onClick={handleClick} size='lg' color='orange' className="bg-transparent text-gray-900 scale-95 hover:scale-100 transition-transform duration-100 w-10 h-10 rounded-full">
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
            </Button>        
        </Tooltip>
    )
}
