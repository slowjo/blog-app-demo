'use client'

import { useEffect, useState } from "react";
import { bookmark, unBookmark, like, unLike } from '@/app/actions'


export default function useReactiveMarkState(isMarked : boolean, postId : string, markAs : string, removeCardOnClient? : (postId: string) => void) {
    const [markedAtClient, setMarkedAtClient] = useState(isMarked)
        // const [likedAtClient, setLikedAtClient] = useState(false)
    
    
        const handleMarkClick = async () => {
            if (!markedAtClient) {
                setMarkedAtClient(true)
                if (markAs === 'like') {
                    const data = await like(postId);
                    // const data = await like('f3488f02-7acf-4a8a-9aab-bd3c27f2ce2f');
                    if (!data) setMarkedAtClient(false)
                } else if (markAs === 'bookmark') {
                    const data = await bookmark(postId)
                    // const data = await like('f3488f02-7acf-4a8a-9aab-bd3c27f2ce2f');
                    if (!data) setMarkedAtClient(false)
                }
            } else {
                setMarkedAtClient(false)
                if (markAs === 'like') {
                    unLike(postId);
                } else if (markAs === 'bookmark') {
                    if (removeCardOnClient) {
                        removeCardOnClient(postId);
                    }
                    unBookmark(postId)
                }
            }
        }
    
        useEffect(() => {
            console.log('useEffect ran')
            setMarkedAtClient(isMarked);
        }, [isMarked])

    return ({
        markedAtClient,
        handleMarkClick,
    })
}