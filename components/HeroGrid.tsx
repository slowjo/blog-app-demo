import { getPosts, getPostsPreview } from "@/app/actions";
import HorizontalCard from "./HorizontalCard";
import VerticalCard from "./VerticalCard";

export default async function HeroGrid() {
    // const { data, error } = await getPosts()
    const data = await getPostsPreview()
    console.log('preview data: ', data);

    return (
        <ul className="max-w-screen-xl md:w-full md:mx-auto md:grid grid-cols-12 grid-rows-[auto_auto_auto] gap-x-4 py-5 md:py-28">
            {data && (
                <>
                    <VerticalCard post={data[0]} key={data[0].id} />
                    <HorizontalCard post={data[1]} key={data[1].id} />
                    <HorizontalCard post={data[2]} key={data[2].id} />
                    <HorizontalCard post={data[3]} key={data[3].id} />
                </>
            )}
        </ul>
    )
}