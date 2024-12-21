import { Menu, Infinity  } from 'lucide-react';
import React, { useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DropdownMenuLabel, Separator } from '@radix-ui/react-dropdown-menu';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import DarkMode from "../Darkmode"
import {
    Sheet,
    SheetClose,
    SheetContent,

    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authapi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';



const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate();

    const logouthandler = async () => {
        await logoutUser();
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User Log Out")
            navigate("/login")
        }
    }, [isSuccess])

    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/* Desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                {/* Logo and Title */}
                <div className="flex items-center gap-4">
                    <Infinity  size={30} />
                    <Link to="/">
                        <h1 className="hidden md:block font-extrabold text-2xl">
                            Infinity Courses 
                        </h1>
                    </Link>
                </div>

                {/* User Icon and Dropdown */}
                <div className='flex items-center gap-8 '>
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage
                                        src={user?.photoUrl || "https://github.com/shadcn.png"}
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem> <Link to="my-learning">My learning </Link></DropdownMenuItem>
                                    <DropdownMenuItem> <Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={logouthandler}>Log Out</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                {/* {console.log(user)} */}
                                {
                                    user?.role == "instructor" && (
                                        <>
                                            <DropdownMenuItem>
                                                <span><Link to="/admin/dashboard">Dashboard</Link></span>
                                            </DropdownMenuItem>
                                        </>
                                    )

                                }

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => navigate("/login")} >Login</Button>
                            <Button onClick={() => navigate("/login")} >Signup</Button>
                        </div>
                    )}
                    <DarkMode />
                </div>

            </div>
            {/* {mobile devices} */}
            <div className='flex md:hidden items-center justify-between px-4 h-full '>
                <h1 className='font-extrabold text-2xl'>E-learning</h1>
                <MobileNavbar user={user} />
            </div>
        </div>
    );
};

export default Navbar;



const MobileNavbar = (user) => {
    const navigate = useNavigate();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full  hover:bg-gray-200 " variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="flex flex-row items-center justify-between mt-2 ">
                    <SheetTitle>
                      <Link to="/">
                       E-learning
                      </Link> 
                        </SheetTitle>
                    <DarkMode />

                </SheetHeader>
                <Separator className='mr-2' />
                <nav className='flex flex-col space-y-4'>
                    <Link to={'/my-learning'}>
                    <span>My Learning</span>
                    </Link>
                    <Link to={'/profile'}>
                    <span>Edit Profile</span>
                    </Link>
                    <p>Log Out</p>
                </nav>
                {
                    user?.role === "instructor" && (
                        < SheetFooter className="mt-2">
                            <SheetClose asChild>
                                <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashborad</Button>
                            </SheetClose>
                        </SheetFooter>

                    )
                }

            </SheetContent>

        </Sheet >
    )
}

