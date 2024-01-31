import { getBookmarkedPosts } from "@/app/actions";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import Image from "next/image";
import { HiOutlineUser, HiBookmark } from 'react-icons/hi';

export default async function NewHeader() {
    const { data, error } = await getBookmarkedPosts()

    const { userId } = auth();

    return (
        <Navbar fluid rounded className="max-w-screen-2xl px-5 md:px-12 mx-auto">
        <NavbarBrand href="/" className="flex-1">
            <Image src="/favicon.ico" width={37} height={24} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BlogApp</span>
        </NavbarBrand>
        <div className="flex md:order-2">
            {/* <Button pill color='orange' className="bg-orange-200 hover:bg-orange-300 text-gray-900" >
                <HiOutlineUser className="text-lg" />
                Sign up
            </Button> */}
            <div>
            {userId ? (
                    <UserButton afterSignOutUrl="/" />
                ) : <>
                        <SignInButton />
                        <SignUpButton />
                    </>
            }
            </div>
            <NavbarToggle />
        </div>
        <NavbarCollapse className="md:mr-9">
            <NavbarLink href="#" active>
            Home
            </NavbarLink>
            <NavbarLink href="/bookmarkedposts" className="flex items-center relative">
                <HiBookmark className="text-lg" />
                Reading list
                {data && data.length > 0 ? (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full -top-3 -end-5 dark:border-gray-900">{data?.length}</div>
                ) : null}
            </NavbarLink>
            {/* <NavbarLink href="#">Services</NavbarLink>
            <NavbarLink href="#">Pricing</NavbarLink>
            <NavbarLink href="#">Contact</NavbarLink> */}
        </NavbarCollapse>
        </Navbar>
    )
}