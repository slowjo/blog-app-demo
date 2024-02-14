import HorizontalLoadingCard from "./HorizontalLoadingCard";
import VerticalLoadingCard from "./VerticalLoadingCard";

export default async function HeroGridLoadingState() {
    return (
        <div className="max-w-screen-xl w-full md:mx-auto md:grid grid-cols-12 grid-rows-[auto_auto_auto] gap-x-4 py-5 md:py-28">
            <VerticalLoadingCard />
            <HorizontalLoadingCard />
            <HorizontalLoadingCard />
            <HorizontalLoadingCard />
        </div>
    )
}