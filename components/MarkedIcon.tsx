import { HiBookmark, HiStar } from "react-icons/hi"

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

export default MarkedIcon