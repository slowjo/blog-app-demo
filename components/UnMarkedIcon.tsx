import { HiOutlineBookmark, HiOutlineStar } from "react-icons/hi"

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

export default UnMarkedIcon