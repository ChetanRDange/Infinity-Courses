import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setcourseTitle] = useState("");
  const [category, setCategory] = useState("");


  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();



  const navigate = useNavigate();


  const getSelectedCategory = (value) => {
    setCategory(value)
  }
  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category })
  }

  //for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course created.")
      console.log(data)
      navigate("/admin/course")
    }
  }, [isSuccess, error])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-bold text-xl sm:text-2xl mb-2">
          Let's Add Course
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add some basic details for your new course
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Title
            </Label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setcourseTitle(e.target.value)}
              placeholder="Your course name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[280px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next Js">Next Js</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                  <SelectItem value="Mern stack Development">Mern stack Development</SelectItem>
                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              disabled={isLoading}
              onClick={createCourseHandler}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddCourse;


