'use server'

import { auth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { createClient as createPrismicClient } from "@/prismicio"
import * as prismic from '@prismicio/client'


export async function createSupabaseClientWithToken() {
    const {userId, getToken} = auth()

    if (!userId) {
        console.log('not authenticated')
        return (
            {
                supabase: null,
                userId: null,
            }
        )
    }

    const token = await getToken({template: "supabase"})

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
        {
        global: { headers: { Authorization: `Bearer ${token}` } },
        })

    return (
       {
        supabase,
        userId           
    } 
    )
}

export async function like(postId : string) {
    const { supabase, userId } = await createSupabaseClientWithToken()

    if (!supabase) {
        return
    }

    // Insert only if like with this postId doesn't exist yet
    const { data, error } = await supabase.from('uniquelikes').upsert({ postId: postId, userId: userId }, { onConflict: 'postId, userId', ignoreDuplicates: true }).select()

    if (error) {
        console.log('error: ', error)
    } 
    console.log(data, 'hey')

    revalidatePath('/')
    revalidatePath('/likedposts')

    return data
  }

export async function unLike(postId : string) {
    const { supabase, userId } = await createSupabaseClientWithToken()

    if (!supabase) {
        return
    }

    const { data, error } = await supabase.from('uniquelikes').delete().eq('postId', postId).eq('userId', userId).select()

    if (error) {
        console.log(error)
    }

    revalidatePath('/')
    revalidatePath('/likedposts')

    return data
  }

export async function bookmark(postId : string) {
    const { supabase, userId } = await createSupabaseClientWithToken()

    if (!supabase) {
        return
    }

    // Insert only if like with this postId doesn't exist yet
    const { data, error } = await supabase.from('bookmarks').upsert({ postId: postId, userId: userId }, { onConflict: 'postId, userId', ignoreDuplicates: true }).select()

    if (error) {
        console.log('error: ', error)
    } 
    console.log(data, 'hey')

    revalidatePath('/')
    // revalidatePath('/likedposts')

    return data
  }

export async function unBookmark(postId : string) {
    const { supabase, userId } = await createSupabaseClientWithToken()

    if (!supabase) {
        return
    }

    const { data, error } = await supabase.from('bookmarks').delete().eq('postId', postId).eq('userId', userId).select()

    if (error) {
        console.log(error)
    }

    revalidatePath('/')
    // revalidatePath('/likedposts')

    return data
  }

// export async function getPosts() {
//     const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

//     const { data, error } = await supabase.from('posts').select()

//     if (error) {
//         console.log(error)
//     }

//     return ({ data, error })
// }  

export async function getPosts() {
    const client = createPrismicClient()

    try {
        const documents = await client.getAllByType('post')
        console.log(documents[0].data.preview_image)
        return documents
    } catch(error) {
        console.log(error);
    }
}

export async function getSinglePost(postUid : string) {
    const client = createPrismicClient()

    try {
        const post = await client.getByUID('post', postUid)
        console.log(post.data.preview_image)
        return post
    } catch(error) {
        console.log(error);
    }
}

export async function getPostsPreview() {
    const client = createPrismicClient()

    try {
        const documents = await client.getAllByType('post', {
            graphQuery: `
              {
                post {
                  uid
                  title
                  preview_text
                  preview_image
                }
              }
            `
          })
        console.log(documents[0].data.preview_image)
        return documents
    } catch(error) {
        console.log(error);
    }
}

export async function getPostLikes(postId : string) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { count, error } = await supabase
        .from('uniquelikes')
        .select('id', { count: 'exact', head: true })
        .eq('postId', postId)

    console.log('count: ', count);

    if (error) {
        console.log(error)
    }

    return ({ count, error })
}

export async function getUserPostLike(postId : string) {
    const { userId } = auth();

    if (!userId) {
        return (
            {
                data: null,
                error: null,
                guest: true,
            }
        )
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // const { data, error } = await supabase
    //     .from('posts')
    //     .select('*, uniquelikes!inner(postId)')
    //     .eq('uniquelikes.postId', postId).eq('uniquelikes.userId', userId).maybeSingle()

    const { data, error } = await supabase
        .from('uniquelikes')
        .select()
        .eq('postId', postId).eq('userId', userId).maybeSingle()

    // console.log('data: ', data);

    if (error) {
        console.log(error);
    }

    return ({ data, error })
}

export async function getUserPostBookmark(postId : string) {
    const { userId } = auth();

    if (!userId) {
        return (
            {
                data: null,
                error: null,
                guest: true,
            }
        )
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // const { data, error } = await supabase
    //     .from('posts')
    //     .select('*, bookmarks!inner(postId)')
    //     .eq('bookmarks.postId', postId).eq('bookmarks.userId', userId).maybeSingle()

    const { data, error } = await supabase
        .from('bookmarks')
        .select('')
        .eq('postId', postId).eq('userId', userId).maybeSingle()

    // console.log('data: ', data);

    if (error) {
        console.log(error);
    }

    return ({ data, error })
}

export async function getLikedPosts() {
    const { userId } = auth()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // const { data, error } = await supabase
    //     .from('posts')
    //     .select('*, uniquelikes!inner(postId)')
    //     .eq('uniquelikes.userId', userId)

    const { data, error } = await supabase
        .from('uniquelikes')
        .select()
        .eq('userId', userId)

    // console.log('data: ', data);

    if (error) {
        console.log(error);
    }

    const idArray = data?.map((item) => item.postId) || []

    const client = createPrismicClient()

    const posts = await client.getAllByType('post', {
        filters: [
            prismic.filter.in( 'document.id', idArray )
          ]
    })

    // return ({ data, error })

    return posts
}

// export async function getBookmarkedPosts() {
//     const { userId } = auth()

//     const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

//     const { data, error } = await supabase
//         .from('posts')
//         .select('*, bookmarks!inner(postId)')
//         .eq('bookmarks.userId', userId)

//     // console.log('data: ', data);

//     if (error) {
//         console.log(error);
//     }

//     return ({ data, error })
// }

export async function getBookmarkedPosts() {
    const { userId } = auth()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // const { data, error } = await supabase
    //     .from('posts')
    //     .select('*, uniquelikes!inner(postId)')
    //     .eq('uniquelikes.userId', userId)

    const { data, error } = await supabase
        .from('bookmarks')
        .select()
        .eq('userId', userId)

    // console.log('data: ', data);

    if (error) {
        console.log(error);
    }

    const idArray = data?.map((item) => item.postId) || []

    const client = createPrismicClient()

    const posts = await client.getAllByType('post', {
        filters: [
            prismic.filter.in( 'document.id', idArray )
          ]
    })

    // return ({ data, error })

    return posts
}

export async function revalidatePathFromClient() {
    revalidatePath('/')
}