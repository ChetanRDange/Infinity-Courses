import { Menu, Search, Home, BookOpen, User, LogOut, GraduationCap, BarChart3 } from 'lucide-react';
import { useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate();
    const location = useLocation();

    const logouthandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out successfully")
            navigate("/login")
        }
    }, [isSuccess, data?.message, navigate])

    return (
        <>
            {/* Desktop Header */}
            <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
                <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                            <GraduationCap size={24} className="text-white" />
                        </div>
                        <Link to="/">
                            <h1 className="font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Infinity Courses
                            </h1>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link to="/" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                            <Home size={18} />
                            Home
                        </Link>
                        <Link to="/course/search" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname.includes('/course') ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                            <Search size={18} />
                            Explore
                        </Link>
                        {user && (
                            <Link to="/my-learning" className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${location.pathname === '/my-learning' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                <BookOpen size={18} />
                                My Learning
                            </Link>
                        )}
                    </div>

                    {/* User Icon and Dropdown */}
                    <div className='flex items-center gap-4'>
                        <DarkMode />
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="cursor-pointer">
                                        <Avatar className="ring-2 ring-blue-500 ring-offset-2">
                                            <AvatarImage
                                                src={user?.photoUrl || "https://github.com/shadcn.png"}
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel className="px-2 py-1.5">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link to="/my-learning" className="flex items-center gap-2">
                                                <BookOpen size={16} />
                                                My Learning
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile" className="flex items-center gap-2">
                                                <User size={16} />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    {user?.role === "instructor" && (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <Link to="/admin/dashboard" className="flex items-center gap-2">
                                                    <BarChart3 size={16} />
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                        </>
                                    )}
                                    <DropdownMenuItem onClick={logouthandler} className="flex items-center gap-2 text-red-600">
                                        <LogOut size={16} />
                                        Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Get Started</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Header */}
                <div className='flex md:hidden items-center justify-between px-4 h-full'>
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <Link to="/">
                            <h1 className='font-extrabold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                Infinity Courses
                            </h1>
                        </Link>
                    </div>
                    <MobileNavbar user={user} logouthandler={logouthandler} />
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            {user && (
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
                    <div className={`flex items-center ${user?.role === "instructor" ? 'justify-around' : 'justify-around'} py-2`}>
                        <Link to="/" className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            <Home size={18} />
                            <span className="text-xs font-medium">Home</span>
                        </Link>
                        <Link to="/course/search" className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${location.pathname.includes('/course') && !location.pathname.includes('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            <Search size={18} />
                            <span className="text-xs font-medium">Explore</span>
                        </Link>
                        <Link to="/my-learning" className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${location.pathname === '/my-learning' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            <BookOpen size={18} />
                            <span className="text-xs font-medium">Learning</span>
                        </Link>
                        {user?.role === "instructor" && (
                            <Link to="/admin/dashboard" className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${location.pathname.includes('/admin') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                <BarChart3 size={18} />
                                <span className="text-xs font-medium">Admin</span>
                            </Link>
                        )}
                        <Link to="/profile" className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-colors ${location.pathname === '/profile' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
                            <User size={18} />
                            <span className="text-xs font-medium">Profile</span>
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}; export default Navbar;



const MobileNavbar = ({ user, logouthandler }) => {
    const navigate = useNavigate();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800" variant="outline">
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-80">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <Link to="/">
                            Infinity Courses
                        </Link>
                    </SheetTitle>
                    <DarkMode />
                </SheetHeader>

                {user && (
                    <div className="flex items-center gap-3 py-4 px-2 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
                        <Avatar>
                            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                )}

                <nav className='flex flex-col space-y-2 mt-6'>
                    <SheetClose asChild>
                        <Link to="/" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Home size={20} />
                            <span className="font-medium">Home</span>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link to="/course/search" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <Search size={20} />
                            <span className="font-medium">Explore Courses</span>
                        </Link>
                    </SheetClose>
                    {user && (
                        <>
                            <SheetClose asChild>
                                <Link to="/my-learning" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <BookOpen size={20} />
                                    <span className="font-medium">My Learning</span>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link to="/profile" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <User size={20} />
                                    <span className="font-medium">Profile</span>
                                </Link>
                            </SheetClose>
                            {user?.role === "instructor" && (
                                <SheetClose asChild>
                                    <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <BarChart3 size={20} />
                                        <span className="font-medium">Instructor Dashboard</span>
                                    </Link>
                                </SheetClose>
                            )}
                        </>
                    )}
                </nav>

                {user ? (
                    <SheetFooter className="mt-6 pt-6 border-t">
                        <SheetClose asChild>
                            <Button
                                onClick={logouthandler}
                                variant="outline"
                                className="w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                            >
                                <LogOut size={16} />
                                Log Out
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                ) : (
                    <SheetFooter className="mt-6 pt-6 border-t">
                        <div className="flex flex-col gap-2 w-full">
                            <SheetClose asChild>
                                <Button variant="outline" onClick={() => navigate("/login")} className="w-full">
                                    Login
                                </Button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button onClick={() => navigate("/login")} className="w-full">
                                    Get Started
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}

