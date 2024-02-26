import HorizontalLoadingCard from "./HorizontalLoadingCard";

export default function ReadingListLoadingState() {
    return (
        <ul className="md:grid grid-cols-[0px_0px_0px_0px_0px_0px_1fr_1fr_1fr_1fr_1fr_1fr] max-w-2xl w-full">
            <HorizontalLoadingCard />
            <HorizontalLoadingCard />
            <HorizontalLoadingCard />
        </ul>
    );
}