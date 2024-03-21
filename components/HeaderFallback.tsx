import { Button, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import Link from "next/link";
import { HiOutlineUser, HiHome, HiLogin } from 'react-icons/hi';


export default function HeaderFallback() {
    return (
        <>
            <div className="flex md:order-2">
            <div className="flex items-center mr-3">
                <Link href="/sign-up">
                    <Button pill color='orange' className="bg-orange-200 hover:bg-orange-300 text-gray-900" >
                        <HiOutlineUser className="text-lg" />
                        Sign up
                    </Button>
                </Link>
            </div>
            <NavbarToggle className="bg-white hover:bg-white -mr-2" />
            </div>
            <NavbarCollapse className="md:mr-9">
                <NavbarLink href="/" className="flex items-center rounded-lg hover:text-orange-400 active:text-orange-400">
                    <HiHome className="text-lg" />
                    Home
                </NavbarLink>
                <NavbarLink href="/sign-in" className="flex items-center hover:text-orange-400 active:text-orange-400">
                    <HiLogin className="text-lg" />
                    Sign in
                </NavbarLink>
            </NavbarCollapse>
       </> 
    )
}