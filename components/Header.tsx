import { Navbar, NavbarBrand } from 'flowbite-react';
import { Suspense } from "react";
import { HiDocumentText } from 'react-icons/hi';
import NavAndUser from "@/components/NavAndUser";
import HeaderFallback from "@/components/HeaderFallback";

export default async function NewHeader() {
    return (
        <Navbar fluid rounded className="max-w-screen-2xl px-5 md:px-12 mx-auto md:min-h-14">
        <NavbarBrand href="/" className="flex-1">
            <HiDocumentText className="text-2xl mr-2" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BlogApp</span>
        </NavbarBrand>
        <Suspense fallback={<div>loading...</div>}>
            <NavAndUser />
        </Suspense>
        </Navbar>
    )
}