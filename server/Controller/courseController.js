import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture_model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Course created",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses" });
  }
};

export const searchCourse = async (req,res) => {
  try {
      const {query = "", categories = [], sortByPrice =""} = req.query;
      console.log("this is categories",categories);
      
      // create search query
      const searchCriteria = {
          isPublished:true,
          $or:[
              {courseTitle: {$regex:query, $options:"i"}},
              {subTitle: {$regex:query, $options:"i"}},
              {category: {$regex:query, $options:"i"}},
          ]
      }

      // if categories selected
      if(categories.length > 0) {
          searchCriteria.category = {$in: categories};
      }

      // define sorting order
      const sortOptions = {};
      if(sortByPrice === "low"){
          sortOptions.coursePrice = 1;//sort by price in ascending
      }else if(sortByPrice === "high"){
          sortOptions.coursePrice = -1; // descending
      }

      let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);

      return res.status(200).json({
          success:true,
          courses: courses || []
      });

  } catch (error) {
      console.log(error);
      
  }
}

export const removecourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Find and delete the course
    const RCourse = await Course.findByIdAndDelete(courseId);
    if (!RCourse) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    console.log("Course to remove", RCourse);

    // Delete course thumbnail if it exists
    if (RCourse.courseThumbnail) {
      try {
        const publicId = RCourse.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
        console.log("media deleted successfully")
      } catch (error) {
        console.error("Error deleting course thumbnail:", error);
      }
    }

    // Delete lectures and their associated media
    if (RCourse.lectures && RCourse.lectures.length > 0) {
      for (const lectureId of RCourse.lectures) {
        try {
          const lecture = await Lecture.findByIdAndDelete(lectureId);
          if (lecture && lecture.videoUrl) {
            const publicId = lecture.videoUrl.split("/").pop().split(".")[0];
            await deleteMediaFromCloudinary(publicId);
            console.log("Media video deleted successfully");
          }
        } catch (error) {
          console.error(`Error deleting lecture ${lecture?.videoUrl}:`, error); 
        }
      }
    }
    

    return res.status(200).json({
      message: "Course removed successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove Course",
    });
  }
};


export const getPublishedCourse = async (_,res) => {
  try {
      const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"});
      if(!courses){
          return res.status(404).json({
              message:"Course not found"
          })
      }
      return res.status(200).json({
          courses,
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to get published courses"
      })
  }
}

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    //  console.log(userId)
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        course: [],
        message: "No courses found",
      });
    }
    //  console.log(courses)
    return res.status(200).json({
      course: courses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); //delete old image
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    //upload thumbnail on cloudinary

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    // console.log(course)
    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log(courseId);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    // create lecture
    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }

    // update lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture id if it was not aleardy added;
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit lectures",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    // delete the lecture from couldinary as well
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Remove the lecture reference from the associated course
    await Course.updateOne(
      { lectures: lectureId }, // find the course that contains the lecture
      { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found!",
      });
    }
    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by id",
    });
  }
};



// publich unpublish course logic

export const togglePublishCourse = async (req,res) => {
  try {
      const {courseId} = req.params;
      const {publish} = req.query; // true, false
      const course = await Course.findById(courseId);
      if(!course){
          return res.status(404).json({
              message:"Course not found!"
          });
      }
      // publish status based on the query paramter
      course.isPublished = publish === "true";
      await course.save();

      const statusMessage = course.isPublished ? "Published" : "Unpublished";
      return res.status(200).json({
          message:`Course is ${statusMessage}`
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to update status"
      })
  }
}