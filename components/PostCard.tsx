import { FaStar } from 'react-icons/fa';
import { getPostLikes, getUserPostBookmark, getUserPostLike } from '@/app/actions';
import MarkButton from './MarkButton';


type PostCardProps = {
    post: {
        id: string,
        created_at: string,
        title: string,
    },
}

export default async function PostCard({ post } : PostCardProps) {
    const { count, error : allLikesError } = await getPostLikes(post.id)

    const { data, error, guest } = await getUserPostLike(post.id)

    const { data : bookmarkData, error : bookMarkError, guest : bookMarkGuest } = await getUserPostBookmark(post.id)

    return (
        <li className="shadow-md p-10 rounded-xl">
            <h3 className="mb-5">{post.title}</h3>
            <div className="flex items-center justify-start gap-3 text-gray-500 mb-2">
                <FaStar />
                {count && (
                    <p>{count}</p>
                )}
            </div>
            <hr className="mb-2" />
            <div className="flex gap-5">
                <div>
                    <MarkButton postId={post.id} isMarked={bookmarkData ? true : false} guest={guest} markAs={'bookmark'} />
                    <p className="text-sm text-slate-300">Bookmarked: {bookmarkData ? 'Yes' : 'No'}</p>
                </div>
                <div>
                    <MarkButton postId={post.id} isMarked={data ? true : false} guest={guest} markAs={'like'} />
                    <p className="text-sm text-slate-300">Liked: {data ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </li>
    )
}