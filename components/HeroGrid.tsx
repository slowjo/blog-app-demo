import { getPosts } from "@/app/actions";
import HorizontalCard from "./HorizontalCard";
import VerticalCard from "./VerticalCard";

export default async function HeroGrid() {
    // const { data, error } = await getPosts()
    const data = await getPosts()

    return (
        <div className="max-w-screen-xl md:w-full md:mx-auto md:grid grid-cols-12 grid-rows-[auto_auto_auto] gap-x-4 py-5 md:py-28">
            {data && (
                <>
                    <VerticalCard post={data[0]} />
                    <HorizontalCard post={data[1]} />
                    <HorizontalCard post={data[2]} />
                    <HorizontalCard post={data[3]} />
                </>
            )}
        </div>
    )
}