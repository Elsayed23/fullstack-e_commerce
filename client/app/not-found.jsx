import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className="py-12 min-h-[calc(100vh-478px)]">
            <div className="container mx-auto">
                <Breadcrumb className='mb-20'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <Slash />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>404 Error</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col items-center gap-9">
                    <h1 className="text-7xl font-medium">404 Not Found</h1>
                    <p className="font-light text-sm text-opacity-70">Your visited page not found. You may go home page.</p>
                    <Link href='/'>
                        <button className='px-8 py-4 rounded-sm bg-red text-white capitalize hover:opacity-95 duration-300'>
                            Back to home page
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound