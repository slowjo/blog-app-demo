import { Button } from "flowbite-react";
import { HiOutlineBookmark, HiOutlineStar } from "react-icons/hi";

export default function MarkButtonLoadingState() {
    return (
        <div className="flex gap-5 text-gray-500 animate-pulse">
            <Button disabled size="lg" className="bg-transparent text-gray-500 scale-95 w-10 h-10 rounded-full">
                <HiOutlineBookmark className="text-lg" />
            </Button>
            <Button disabled size="lg" className="bg-transparent text-gray-500 scale-95 w-10 h-10 rounded-full">
                <HiOutlineStar className="text-lg" />
                <div className="ml-1">-</div>
            </Button>
        </div>
    )
}