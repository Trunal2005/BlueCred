import Link from "next/link"
import { Users, LayoutDashboard, Leaf, LineChart, FileText, Settings, LogOut } from "lucide-react"

export function Sidebar() {
    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-zinc-800/40 w-64 h-full">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="/">
                        <Leaf className="h-6 w-6" />
                        <span>BlueCred</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard/projects"
                        >
                            <FileText className="h-4 w-4" />
                            Projects
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard/marketplace"
                        >
                            <LineChart className="h-4 w-4" />
                            Marketplace
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard/explorer"
                        >
                            <Settings className="h-4 w-4" />
                            Blockchain Explorer
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard/admin"
                        >
                            <Users className="h-4 w-4" />
                            Admin
                        </Link>
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        href="/"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}
