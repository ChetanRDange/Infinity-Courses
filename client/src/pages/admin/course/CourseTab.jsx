import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "../../../components/RichTextEditor"
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, useRemovecourseMutation, usePublishCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";
import { useLocation } from "react-router-dom"; // Import useLocation

const CourseTab = () => {

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: 0,
        courseThumbnail: ""
    });
    const params = useParams();
    const courseId = params.courseId;
    const location = useLocation();

    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
        useGetCourseByIdQuery(courseId);


    const [publishCourse] = usePublishCourseMutation();

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",

            });
        }
    }, [courseByIdData, location]);





    const [previewThumbnail, setpreviewThumbnail] = useState("");

    const navigate = useNavigate();


    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();


    const [removeCourse, { isLoading: removeLoading, isSuccess: removeSuccess, error: removeError }] = useRemovecourseMutation();



    const changeEventHandler = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value })
    }

    const selectCategory = (value) => {
        setInput({ ...input, category: value })
        console.log(value)
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
        console.log("courseLevel", value)
    }
    //get file
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // console.log("Selected file:", file);
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setpreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        } else {
            console.log("No thumbnail selected");
        }
    };



    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        await editCourse({ formData, courseId });
    }

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({ courseId, query: action });
            if (response.data) {
                refetch();
                toast.success(response.data.message)
            }
        } catch (error) {
            toast.error("Failed to publish or unpublish course")
        }
    }


    const handleremove = async () => {
        if (removeLoading) return; // Prevent multiple clicks

        try {
            const response = await removeCourse(courseId);
            if (response.data) {
                toast.success(response.data.message || "Course removed successfully.");
                navigate("/admin/course");
            }
        } catch (error) {
            toast.error(removeError?.data?.message || "Failed to remove course");
        }
    };



    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course update.");
            navigate("/admin/course")
        }
        if (error) {
            toast.error(error?.data?.message || "Failed to update course");
        }
    }, [isSuccess, error])


    if (courseByIdLoading) return <h1>Loading...</h1>

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="space-y-4">
                <div>
                    <CardTitle className="text-lg sm:text-xl">Basic Course Information</CardTitle>
                    <CardDescription className="text-sm">
                        Make changes to your course here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                        disabled={courseByIdData?.course.lectures?.length === 0}
                        variant="outline"
                        onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
                        className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                        {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                        onClick={handleremove}
                        variant="destructive"
                        className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                        {removeLoading ? "Removing..." : "Remove Course"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Course Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Fullstack Developer"
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">SubTitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a FullStack Developer from zero to hero in 2 months."
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Category</Label>
                            <Select onValueChange={selectCategory}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next Js</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                        <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                                        <SelectItem value="Backend Development">Backend Development</SelectItem>
                                        <SelectItem value="MERN Stack Development">Mern stack Development</SelectItem>
                                        <SelectItem value="Javascript">JavaScript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Price in INR</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Course Thumbnail</Label>
                        <Input
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-full sm:w-auto"
                        />
                        {previewThumbnail && (
                            <div className="mt-3">
                                <img
                                    src={previewThumbnail}
                                    className="w-full max-w-xs h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                                    alt="Course Thumbnail Preview"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button
                            onClick={() => navigate("/admin/course")}
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={updateCourseHandler}
                            className="w-full sm:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default CourseTab;