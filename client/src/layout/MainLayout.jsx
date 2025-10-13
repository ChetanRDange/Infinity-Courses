import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <main className="flex-1 pt-16 pb-20 md:pb-4 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    )
}
export default MainLayout;