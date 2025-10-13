import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const CourseTable = () => {
    const { data, isLoading, refetch } = useGetCreatorCourseQuery();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    if (isLoading) return <h1>Loading...</h1>
    // console.log("data", data)

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Button
                    onClick={() => navigate('create')}
                    className="w-full sm:w-auto"
                >
                    Create a New Course
                </Button>
            </div>

            {/* Mobile Cards View */}
            <div className="block sm:hidden space-y-4">
                {data.course.map((course) => (
                    <div key={course._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate flex-1 pr-2">
                                {course.courseTitle}
                            </h3>
                            <Button size='sm' variant="ghost" onClick={() => navigate(`${course._id}`)}>
                                <Edit size={16} />
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Price: <span className="font-medium">₹{course?.coursePrice || "NA"}</span>
                                </span>
                                <Badge className="w-fit">{course?.isPublished ? "Published" : "Draft"}</Badge>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
                <Table>
                    <TableCaption>A list of your recent courses.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.course.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell className="font-medium">₹{course?.coursePrice || "NA"}</TableCell>
                                <TableCell><Badge>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                                <TableCell className="max-w-xs truncate">{course.courseTitle}</TableCell>
                                <TableCell className="text-right">
                                    <Button size='sm' variant="ghost" onClick={() => navigate(`${course._id}`)}>
                                        <Edit />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CourseTable;