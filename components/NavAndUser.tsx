import { getBookmarkedPosts } from "@/app/actions";
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import { Button, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import Link from "next/link";
import { HiOutlineUser, HiBookmark, HiHome, HiLogin } from 'react-icons/hi';

export default async function NavAndUser() {
    const data = await getBookmarkedPosts()

    console.log('hey', data)

    const { userId } = auth();

    return (
       <>
            <div className="flex md:order-2">
            {/* <Button pill color='orange' className="bg-orange-200 hover:bg-orange-300 text-gray-900" >
                <HiOutlineUser className="text-lg" />
                Sign up
            </Button> */}
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
                {/* <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink> */}
            </NavbarCollapse>
       </> 
    )
}