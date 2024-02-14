import { Suspense } from "react";
import HeroGrid from "./HeroGrid";
import HeroText from "./HeroText";
import HeroGridLoadingState from '@/components/HeroGridLoadingState'

export default function Hero() {
    return (
        <>
            <HeroText />
            <Suspense fallback={<HeroGridLoadingState />}>
                <HeroGrid />
            </Suspense>
        </>
    )
}