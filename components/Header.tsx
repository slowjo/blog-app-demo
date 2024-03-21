import { getBookmarkedPosts } from "@/app/actions";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { HiOutlineUser, HiBookmark, HiHome, HiLogin, HiDocumentText } from 'react-icons/hi';
import NavAndUser from "@/components/NavAndUser";
import HeaderFallback from "@/components/HeaderFallback";

export default async function NewHeader() {
    // const { data, error } = await getBookmarkedPosts()
    const data = await getBookmarkedPosts()

    console.log('hey', data)

    const { userId } = auth();

    return (
        <Navbar fluid rounded className="max-w-screen-2xl px-5 md:px-12 mx-auto md:min-h-14">
        <NavbarBrand href="/" className="flex-1">
            <HiDocumentText className="text-2xl mr-2" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BlogApp</span>
        </NavbarBrand>
        <Suspense fallback={<div>loading...</div>}>
            <NavAndUser />
        </Suspense>
        {/* <div className="flex md:order-2">
            <div className="flex items-center mr-3">
            {userId ? (
                    <UserButton afterSignOutUrl="/" />
                ) : <>
                        <Link href="/sign-up">
                            <Button pill color='orange' className="bg-orange-200 hover:bg-orange-300 text-gray-900" >
                                <HiOutlineUser className="text-lg" />
                                Sign up
                            </Button>
                        </Link>
                    </>
            }
            </div>
            <NavbarToggle className="bg-white hover:bg-white -mr-2" />
        </div>
        <NavbarCollapse className="md:mr-9">
            <NavbarLink href="/" className="flex items-center rounded-lg hover:text-orange-400 active:text-orange-400">
                <HiHome className="text-lg" />
                Home
            </NavbarLink>
            {userId ? (
                <NavbarLink href="/reading-list" className="flex items-center relative rounded-lg hover:text-orange-400 active:text-orange-400">
                    <HiBookmark className="text-lg" />
                    Reading list
                    {data && data.length > 0 ? (
                        <div className="md:absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full md:-top-3 md:-end-5 dark:border-gray-900">{data?.length}</div>
                    ) : null}
                </NavbarLink>
            ) : (
                <NavbarLink href="/sign-in" className="flex items-center hover:text-orange-400 active:text-orange-400">
                    <HiLogin className="text-lg" />
                    Sign in
                </NavbarLink>
            )}
        </NavbarCollapse> */}
        </Navbar>
    )
}