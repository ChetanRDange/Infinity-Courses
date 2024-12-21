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
  useEffect(()=>{
      if(isSuccess){
        toast.success(data.message || "Course created.")
        console.log(data)
        navigate("/admin/course")
      }
  },[isSuccess,error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl"> Lets Add course ,add some basic details for your new course </h1>
        <p className="text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, amet.</p>

      </div>
      <div>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <input
              type="text"

              value={courseTitle}
              onChange={(e) => setcourseTitle(e.target.value)}
              placeholder="Your course Name" />
          </div>
          <div>
            <Label>Category</Label>
            <Select onValueChange={getSelectedCategory}>
              <SelectTrigger className="w-[180px]">
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
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button disabled={isLoading} onClick={createCourseHandler}>{
              isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  Please wait</>
              ) : "Create"
            }</Button>
          </div>

        </div>
      </div>

    </div>

  )
}
export default AddCourse;


